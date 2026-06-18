import { useSSO } from "@clerk/expo";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type OAuthProvider = "oauth_google" | "oauth_facebook" | "oauth_apple";

type SocialButtonProps = {
  icon: React.ReactNode;
  label: string;
  onPress: () => void;
  loading: boolean;
};

function SocialButton({ icon, label, onPress, loading }: SocialButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, loading && styles.buttonDisabled]}
      activeOpacity={0.7}
      onPress={onPress}
      disabled={loading}
    >
      <View style={styles.iconWrap}>
        {loading ? (
          <ActivityIndicator size="small" color="#6366F1" />
        ) : (
          icon
        )}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function SocialAuthButtons() {
  const { startSSOFlow } = useSSO();
  const [loadingProvider, setLoadingProvider] = useState<OAuthProvider | null>(null);

  const handleOAuth = async (strategy: OAuthProvider) => {
    if (loadingProvider) return;
    setLoadingProvider(strategy);

    try {
      const { createdSessionId, setActive } = await startSSOFlow({ strategy });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
        router.replace("/");
      }
    } catch (err: any) {
      console.error(`OAuth error (${strategy}):`, err?.message ?? err);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <View>
      <SocialButton
        icon={<AntDesign name="google" size={20} color="#4285F4" />}
        label="Continue with Google"
        onPress={() => handleOAuth("oauth_google")}
        loading={loadingProvider === "oauth_google"}
      />
      <SocialButton
        icon={<Ionicons name="logo-facebook" size={22} color="#1877F2" />}
        label="Continue with Facebook"
        onPress={() => handleOAuth("oauth_facebook")}
        loading={loadingProvider === "oauth_facebook"}
      />
      <SocialButton
        icon={<Ionicons name="logo-apple" size={22} color="#000000" />}
        label="Continue with Apple"
        onPress={() => handleOAuth("oauth_apple")}
        loading={loadingProvider === "oauth_apple"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#FFFFFF",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#F4F6FA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  label: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    color: "#0D132B",
  },
});
