import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  visible: boolean;
  email: string;
  onClose: () => void;
  /** Called with the 6-digit code when the user finishes entering it. */
  onVerify: (code: string) => Promise<void>;
  /** Called when the user taps "Resend code". */
  onResend?: () => Promise<void>;
  /** Error message to display (e.g. wrong code). Cleared when user starts retyping. */
  error?: string | null;
  /** Shows a loading indicator while the code is being verified. */
  isVerifying?: boolean;
};

export default function VerificationModal({
  visible,
  email,
  onClose,
  onVerify,
  onResend,
  error,
  isVerifying = false,
}: Props) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  // Reset code and auto-focus when modal opens.
  useEffect(() => {
    if (!visible) return;

    const resetTimer = setTimeout(() => setCode(""), 0);
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 350);

    return () => {
      clearTimeout(resetTimer);
      clearTimeout(focusTimer);
    };
  }, [visible]);

  // Clear code when a verification error arrives so the user can retry cleanly.
  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setCode(""), 0);
      return () => clearTimeout(t);
    }
  }, [error]);

  const handleCodeChange = (text: string) => {
    const digits = text.replace(/[^0-9]/g, "").slice(0, 6);
    setCode(digits);

    if (digits.length === 6) {
      // Brief pause so the user sees the last digit, then verify
      setTimeout(() => {
        onVerify(digits);
      }, 300);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      {/* KeyboardAvoidingView pushes the card above the keyboard */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {/* Backdrop — tapping it closes the modal */}
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => {
            Keyboard.dismiss();
            onClose();
          }}
          activeOpacity={1}
        />

        {/* Card */}
        <View style={styles.card}>
          {/* Drag handle */}
          <View style={styles.handle} />

          {/* Icon */}
          <Text style={styles.emoji}>📧</Text>

          {/* Title */}
          <Text style={styles.title}>Check your email!</Text>

          {/* Subtitle */}
          <Text style={styles.subtitle}>
            We sent a 6-digit verification code to{"\n"}
            <Text style={styles.emailText}>{email || "your email"}</Text>
          </Text>

          {/* OTP digit boxes — tap to focus the hidden input */}
          <TouchableOpacity
            style={styles.codeRow}
            activeOpacity={1}
            onPress={() => inputRef.current?.focus()}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <View
                key={i}
                style={[
                  styles.codeBox,
                  i < code.length && styles.codeBoxFilled,
                  i === code.length && styles.codeBoxActive,
                ]}
              >
                <Text style={styles.codeDigit}>{code[i] ?? ""}</Text>
              </View>
            ))}
          </TouchableOpacity>

          {/* Hidden TextInput — captures number-pad input */}
          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleCodeChange}
            keyboardType="number-pad"
            maxLength={6}
            caretHidden
            editable={!isVerifying}
            style={styles.hiddenInput}
          />

          {/* Inline error message */}
          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          {/* Loading / status text */}
          {isVerifying ? (
            <Text style={styles.loadingText}>Verifying…</Text>
          ) : null}

          {/* Resend link */}
          <View style={styles.resendRow}>
            <Text style={styles.resendText}>{"Didn't receive it? "}</Text>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={onResend}
              disabled={isVerifying || !onResend}
            >
              <Text style={[styles.resendLink, isVerifying && styles.resendDisabled]}>
                Resend code
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  // Full-screen flex-end so the card sits at the bottom
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  // Absolute overlay behind the card — tapping closes modal
  backdrop: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  // White card with rounded top corners
  card: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 40,
    alignItems: "center",
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E5E7EB",
    marginBottom: 24,
  },
  emoji: {
    fontSize: 46,
    marginBottom: 12,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: "#0D132B",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 28,
  },
  emailText: {
    fontFamily: "Poppins-SemiBold",
    color: "#6C4EF5",
  },
  codeRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  codeBox: {
    flex: 1,
    height: 58,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F9FAFB",
  },
  codeBoxFilled: {
    borderColor: "#6C4EF5",
    backgroundColor: "#EDE9FF",
  },
  codeBoxActive: {
    borderColor: "#6C4EF5",
    backgroundColor: "#FFFFFF",
    shadowColor: "#6C4EF5",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 2,
  },
  codeDigit: {
    fontFamily: "Poppins-Bold",
    fontSize: 22,
    color: "#0D132B",
  },
  // Invisible but focusable — positioned off-screen
  hiddenInput: {
    position: "absolute",
    width: 1,
    height: 1,
    opacity: 0,
    top: 0,
    left: 0,
  },
  errorText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#EF4444",
    textAlign: "center",
    marginBottom: 8,
  },
  loadingText: {
    fontFamily: "Poppins-Regular",
    fontSize: 13,
    color: "#9CA3AF",
    textAlign: "center",
    marginBottom: 8,
  },
  resendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  resendText: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#6B7280",
  },
  resendLink: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    color: "#6C4EF5",
  },
  resendDisabled: {
    opacity: 0.4,
  },
});
