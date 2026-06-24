import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-h2">👤 Profile</Text>
        <Text className="text-body-md text-text-secondary mt-2">
          Profile screen coming soon
        </Text>
      </View>
    </SafeAreaView>
  );
}
