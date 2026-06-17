import { images } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <View className="flex-1 px-6">
        {/* ── Brand Header ── */}
        <View className="flex-row items-center justify-center mt-4 gap-2">
          <Image
            source={images.mascotLogo}
            className="w-11 h-11"
            resizeMode="contain"
          />
          <Text className="font-poppins-semibold text-[26px] text-text-primary tracking-tight">
            lingua
          </Text>
        </View>

        {/* ── Headline ── */}
        <Text className="mt-10 text-h1">
          {"Your AI language\n"}
          <Text className="text-primary">teacher</Text>
          {"."}
        </Text>

        {/* ── Subtitle ── */}
        <Text className="mt-3 text-body-md text-text-secondary">
          Real conversations, personalized lessons, anytime, anywhere.
        </Text>

        {/* ── Mascot Illustration with Floating Speech Bubbles ── */}
        <View className="flex-1 relative">
          <Image
            source={images.mascotWelcome}
            className="absolute inset-0 w-full h-full"
            resizeMode="contain"
          />

          {/* Hello! — left side, chest height */}
          <View
            className="absolute left-0 top-[40%] rounded-2xl px-4 py-2.5 bg-white border border-border"
            style={styles.shadow}
          >
            <Text className="font-poppins-semibold text-[15px] text-text-primary">
              Hello!
            </Text>
          </View>

          {/* ¡Hola! — upper right, near raised paw */}
          <View
            className="absolute right-0 top-[10%] rounded-2xl px-4 py-2.5 bg-[#EDE9FF]"
            style={styles.shadow}
          >
            <Text className="font-poppins-semibold text-[15px] text-primary">
              ¡Hola!
            </Text>
          </View>

          {/* 你好! — right side, lower belly */}
          <View
            className="absolute right-0 top-[55%] rounded-2xl px-4 py-2.5 bg-[#FFF0F2]"
            style={styles.shadow}
          >
            <Text className="font-poppins-semibold text-[15px] text-error">
              你好!
            </Text>
          </View>
        </View>

        {/* ── Get Started Button ── */}
        <TouchableOpacity
          className="bg-primary flex-row items-center justify-center gap-2.5 rounded-full h-[58px]"
          onPress={() => router.push("/")}
          activeOpacity={0.85}
        >
          <Text className="font-poppins-semibold text-[17px] text-white">
            Get Started
          </Text>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <View className="h-8" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // SafeAreaView — className not supported
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  // Shadow — platform-specific iOS/Android props
  shadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
  },
});
