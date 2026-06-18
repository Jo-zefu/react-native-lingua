import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

export default function Index() {
  const { isSignedIn, isLoaded } = useAuth();

  // Still loading Clerk auth state — show spinner
  if (!isLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6C4EF5" />
      </View>
    );
  }

  // Not signed in → show onboarding
  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  // Signed in → home (placeholder until home screen is built out)
  // TODO: replace with <Redirect href="/(tabs)" /> once the tabs are created
  return <Redirect href="/home" />;
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
});
