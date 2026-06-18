import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  // Wait for Clerk to load before deciding
  if (!isLoaded) {
    return null;
  }

  // Already signed in → send them home
  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
