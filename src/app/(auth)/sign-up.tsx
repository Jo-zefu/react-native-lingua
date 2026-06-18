import SocialAuthButtons from "@/components/SocialAuthButtons";
import VerificationModal from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { useSignUp } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const isValidEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

export default function SignUpScreen() {
  const { signUp, fetchStatus } = useSignUp();

  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [submitError, setSubmitError]   = useState<string | null>(null);
  const [verifyError, setVerifyError]   = useState<string | null>(null);
  const [isVerifying, setIsVerifying]   = useState(false);

  // ── Step 1: create account + send email code ──────────────────────────────
  const handleSignUp = async () => {
    setSubmitError(null);

    if (!signUp) {
      setSubmitError("Auth is not ready yet. Please try again.");
      return;
    }
    if (!email && !password) {
      setSubmitError("Please enter your email and password.");
      return;
    }
    if (!email) {
      setSubmitError("Please enter your email address.");
      return;
    }
    if (!isValidEmail(email)) {
      setSubmitError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setSubmitError("Please enter a password.");
      return;
    }
    if (password.length < 8) {
      setSubmitError("Password must be at least 8 characters.");
      return;
    }

    // a) Create the sign-up with email + password
    const { error: createError } = await signUp.password({
      emailAddress: email,
      password,
    });
    if (createError) {
      setSubmitError(createError.longMessage ?? createError.message);
      return;
    }

    // b) Send the email verification code
    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      setSubmitError(sendError.longMessage ?? sendError.message);
      return;
    }

    // c) Open the verification modal
    setModalVisible(true);
  };

  // ── Step 2: verify the email code ─────────────────────────────────────────
  const handleVerify = async (code: string) => {
    if (!signUp) return;
    setIsVerifying(true);
    setVerifyError(null);

    const { error } = await signUp.verifications.verifyEmailCode({ code });

    if (error) {
      setVerifyError(error.longMessage ?? error.message);
      setIsVerifying(false);
      return;
    }

    // finalize creates the active session; navigate callback fires just before it's set
    const { error: finalizeError } = await signUp.finalize({
      navigate: () => {
        router.replace("/");
      },
    });

    if (finalizeError) {
      setVerifyError(finalizeError.longMessage ?? finalizeError.message);
    }

    setIsVerifying(false);
  };

  // ── Resend code ────────────────────────────────────────────────────────────
  const handleResend = async () => {
    if (!signUp) return;
    const { error } = await signUp.verifications.sendEmailCode();
    if (error) {
      setVerifyError(error.longMessage ?? error.message);
    }
  };

  const isSubmitting = fetchStatus === "fetching";
  const isReady = !!signUp;

  return (
    // SafeAreaView — className not supported (exception)
    <SafeAreaView style={styles.safe}>
      {/* ScrollView contentContainerStyle — must use style prop (exception) */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Back button ── */}
        <TouchableOpacity
          className="w-9 h-9 justify-center mb-5"
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Ionicons name="chevron-back" size={24} color="#0D132B" />
        </TouchableOpacity>

        {/* ── Title section ── */}
        <Text className="text-h1 mb-1.5">Create your account</Text>
        <Text className="text-body-md text-text-secondary">
          Start your language journey today ✨
        </Text>

        {/* ── Mascot ── */}
        <View className="items-center mt-6 mb-8">
          {/* Image fixed dimensions — style prop required */}
          <Image
            source={images.mascotAuth}
            style={styles.mascot}
            resizeMode="contain"
          />
        </View>

        {/* ── Email input ── */}
        <View className="auth-input-box">
          <Text className="auth-input-label">Email</Text>
          {/* TextInput — style prop required (padding: 0 removes native inset) */}
          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="alex@gmail.com"
            placeholderTextColor="#D1D5DB"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.inputText}
          />
        </View>

        {/* ── Password input ── */}
        <View className="auth-input-box mt-3">
          <Text className="auth-input-label">Password</Text>
          <View className="flex-row items-center">
            {/* TextInput — style prop required */}
            <TextInput
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholder="Enter your password"
              placeholderTextColor="#D1D5DB"
              style={[styles.inputText, { flex: 1 }]}
            />
            {/* TouchableOpacity eye icon — style prop required (exception) */}
            <TouchableOpacity
              onPress={() => setShowPassword((v) => !v)}
              style={styles.eyeBtn}
              activeOpacity={0.7}
            >
              <Ionicons
                name={showPassword ? "eye-off-outline" : "eye-outline"}
                size={20}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Submit error ── */}
        {submitError ? (
          <Text className="auth-error-text">{submitError}</Text>
        ) : null}

        {/* ── Sign Up button ── */}
        <TouchableOpacity
          className={`bg-primary rounded-2xl h-14 justify-center items-center mt-6${isSubmitting || !isReady ? " opacity-60" : ""}`}
          onPress={handleSignUp}
          activeOpacity={0.85}
          disabled={isSubmitting || !isReady}
        >
          <Text className="font-poppins-semibold text-base text-white">
            {isSubmitting ? "Creating account…" : "Sign Up"}
          </Text>
        </TouchableOpacity>

        {/* ── Divider ── */}
        <View className="flex-row items-center my-6">
          <View className="flex-1 h-px bg-border" />
          <Text className="mx-4 text-body-sm text-text-secondary">
            or continue with
          </Text>
          <View className="flex-1 h-px bg-border" />
        </View>

        {/* ── Social auth buttons ── */}
        <SocialAuthButtons />

        {/* ── Bottom link ── */}
        <View className="flex-row justify-center items-center mt-6 mb-2">
          <Text className="text-body-sm text-text-secondary">
            Already have an account?{" "}
          </Text>
          <TouchableOpacity
            onPress={() => router.push("/sign-in")}
            activeOpacity={0.7}
          >
            <Text className="text-body-sm text-primary font-poppins-semibold">
              Log in
            </Text>
          </TouchableOpacity>
        </View>

        {/* Required by Clerk for bot protection */}
        <View nativeID="clerk-captcha" />
      </ScrollView>

      <VerificationModal
        visible={modalVisible}
        email={email}
        onClose={() => setModalVisible(false)}
        onVerify={handleVerify}
        onResend={handleResend}
        error={verifyError}
        isVerifying={isVerifying}
      />
    </SafeAreaView>
  );
}

// Only genuine StyleSheet exceptions remain here.
const styles = StyleSheet.create({
  // SafeAreaView — className not supported
  safe: { flex: 1, backgroundColor: "#FFFFFF" },
  // ScrollView contentContainerStyle — must be a style object
  scrollContent: { paddingHorizontal: 24, paddingTop: 8, paddingBottom: 32 },
  // Image — fixed width/height
  mascot: { width: 180, height: 160 },
  // TextInput — padding: 0 removes Android's built-in vertical inset
  inputText: { fontFamily: "Poppins-Regular", fontSize: 16, color: "#0D132B", padding: 0 },
  // TouchableOpacity — exception: pressed-state style prop
  eyeBtn: { padding: 4, marginLeft: 8 },
});
