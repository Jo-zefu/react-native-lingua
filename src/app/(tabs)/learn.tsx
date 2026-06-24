import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LearnScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <View className="flex-1 items-center justify-center">
        <Text className="text-h2">📚 Learn</Text>
        <Text className="text-body-md text-text-secondary mt-2">
          Lessons coming soon
        </Text>
      </View>
    </SafeAreaView>
  );
}
