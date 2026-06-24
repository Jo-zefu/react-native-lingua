import { images } from "@/constants/images";
import { getLanguageByCode, getPopularLanguages } from "@/data/languages";
import { useLanguageStore } from "@/store/languageStore";
import type { Language } from "@/types/learning";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useMemo, useState } from "react";
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

export default function LanguageSelectionScreen() {
  const popularLanguages = useMemo(() => getPopularLanguages(), []);
  const { setSelectedLanguage } = useLanguageStore();

  // Default selection mirrors the design — Spanish is highlighted.
  const [selectedCode, setSelectedCode] = useState<string>("es");
  const [searchQuery, setSearchQuery]   = useState<string>("");

  const filteredLanguages = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return popularLanguages;
    return popularLanguages.filter(
      (lang) =>
        lang.name.toLowerCase().includes(query) ||
        lang.nativeName.toLowerCase().includes(query),
    );
  }, [popularLanguages, searchQuery]);

  const handleConfirm = () => {
    const language = getLanguageByCode(selectedCode);
    if (language) {
      setSelectedLanguage(language);
    }
    router.replace("/(tabs)");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Header ── */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity
            className="w-9 h-9 justify-center"
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="chevron-back" size={26} color="#0D132B" />
          </TouchableOpacity>
          <Text className="flex-1 text-h3 text-center pr-9">
            Choose a language
          </Text>
        </View>

        {/* ── Search bar ── */}
        <View
          className="flex-row items-center bg-surface rounded-full px-4 mb-7"
          style={styles.searchBar}
        >
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search languages"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
            autoCorrect={false}
            autoCapitalize="none"
          />
        </View>

        {/* ── Section title ── */}
        <Text className="text-h4 font-poppins-semibold mb-3">Popular</Text>

        {/* ── Language list ── */}
        <View style={{ gap: 12 }}>
          {filteredLanguages.map((lang) => (
            <LanguageCard
              key={lang.code}
              language={lang}
              isSelected={selectedCode === lang.code}
              onPress={() => setSelectedCode(lang.code)}
            />
          ))}
        </View>

        {/* ── Confirm button (replaces "See all languages") ── */}
        <TouchableOpacity
          className="bg-primary rounded-2xl justify-center items-center mt-7"
          style={styles.confirmButton}
          onPress={handleConfirm}
          activeOpacity={0.85}
        >
          <Text className="font-poppins-semibold text-base text-white">
            Confirm
          </Text>
        </TouchableOpacity>

        {/* ── Earth illustration ── */}
        <View className="items-center mt-6 -mx-6">
          <Image
            source={images.earth}
            style={styles.earth}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Language Card ───────────────────────────────────────────────────────────
// Inline component because it's only used here and keeps the screen readable.

interface LanguageCardProps {
  language: Language;
  isSelected: boolean;
  onPress: () => void;
}

function LanguageCard({ language, isSelected, onPress }: LanguageCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.languageCard,
        isSelected ? styles.languageCardSelected : styles.languageCardDefault,
      ]}
    >
      {/* Circular flag */}
      <View style={styles.flagWrapper}>
        <Image
          source={{ uri: language.flag }}
          style={styles.flagImage}
          resizeMode="cover"
        />
      </View>

      {/* Name + learners */}
      <View className="flex-1 ml-4">
        <Text className="text-h4 font-poppins-semibold">{language.name}</Text>
        <Text className="text-body-sm text-text-secondary mt-0.5">
          {language.learners} learners
        </Text>
      </View>

      {/* Right-side indicator: check when selected, chevron otherwise */}
      {isSelected ? (
        <View
          className="bg-primary items-center justify-center"
          style={styles.checkCircle}
        >
          <Ionicons name="checkmark" size={18} color="#FFFFFF" />
        </View>
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
      )}
    </TouchableOpacity>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
// StyleSheet used where NativeWind can't reach (fixed sizes, dynamic borders,
// platform-specific shadows, ScrollView contentContainerStyle).

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#FFFFFF" },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },

  // Search ────────────────────────────────────────────────────────────────────
  searchBar: {
    height: 52,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: "Poppins-Regular",
    fontSize: 15,
    color: "#0D132B",
    padding: 0,
  },

  // Language card ─────────────────────────────────────────────────────────────
  languageCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1.5,
  },
  languageCardDefault: {
    borderColor: "#E5E7EB",
  },
  languageCardSelected: {
    borderColor: "#6C4EF5",
    backgroundColor: "#F4F1FF",
  },

  // Flag ──────────────────────────────────────────────────────────────────────
  flagWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: "hidden",
    backgroundColor: "#F6F7FB",
  },
  flagImage: {
    width: "100%",
    height: "100%",
  },

  // Selected indicator ───────────────────────────────────────────────────────
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },

  // Confirm button ───────────────────────────────────────────────────────────
  confirmButton: {
    height: 56,
  },

  // Earth illustration ───────────────────────────────────────────────────────
  earth: {
    width: "100%",
    height: 220,
  },
});
