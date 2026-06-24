import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { useLanguageStore } from "@/store/languageStore";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();
  const { selectedLanguage, _hasHydrated } = useLanguageStore();

  // Wait for both Clerk and the persisted store to finish loading
  if (!isLoaded || !_hasHydrated) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6C4EF5" />
      </View>
    );
  }

  // Not signed in → onboarding
  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  // Signed in but no language chosen → force language selection first
  if (!selectedLanguage) {
    return <Redirect href="/language-selection" />;
  }

  // Signed in + language selected → main tabs
  return <Redirect href="/(tabs)" />;
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
