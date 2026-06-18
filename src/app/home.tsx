import { useAuth, useClerk } from "@clerk/expo";
import { Redirect, router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signOut } = useClerk();

  // Guard: redirect unauthenticated users back to /
  if (isLoaded && !isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>🌍 Lingua</Text>
        <Text style={styles.subtitle}>{"You're signed in!"}</Text>
        <Text style={styles.hint}>
          Home screen coming soon. Lessons, XP, and more will live here.
        </Text>

        <TouchableOpacity
          style={styles.languageBtn}
          onPress={() => router.push("/language-selection")}
          activeOpacity={0.85}
        >
          <Text style={styles.languageBtnText}>Choose a language</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signOutBtn}
          onPress={() => signOut()}
          activeOpacity={0.85}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    gap: 12,
  },
  title: {
    fontFamily: "Poppins-Bold",
    fontSize: 32,
    color: "#0D132B",
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    color: "#6C4EF5",
  },
  hint: {
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 24,
  },
  signOutBtn: {
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  signOutText: {
    fontFamily: "Poppins-Medium",
    fontSize: 15,
    color: "#6B7280",
  },
  languageBtn: {
    backgroundColor: "#6C4EF5",
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 14,
    marginBottom: 12,
  },
  languageBtnText: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#FFFFFF",
  },
});
