import { useUser } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "@/constants/images";
import { getLessonsByLanguage } from "@/data/lessons";
import { getUnitById } from "@/data/units";
import { useLanguageStore } from "@/store/languageStore";
import { useProgressStore } from "@/store/progressStore";
import type { LanguageCode, LessonType } from "@/types/learning";

// ── Language greeting map ─────────────────────────────────────────────────────

const GREETINGS: Record<LanguageCode, string> = {
  es: "Hola",
  fr: "Bonjour",
  ja: "こんにちは",
  de: "Hallo",
  ko: "안녕하세요",
  zh: "你好",
};

// ── Today's plan display config ───────────────────────────────────────────────

type PlanDisplay = {
  label: string;
  iconName: React.ComponentProps<typeof Ionicons>["name"];
  iconBg: string;
};

const PLAN_DISPLAY: Record<LessonType, PlanDisplay> = {
  conversation: {
    label: "Lesson",
    iconName: "book",
    iconBg: "#7C5CF6",
  },
  ai_teacher: {
    label: "AI Conversation",
    iconName: "headset",
    iconBg: "#4A3BD8",
  },
  vocabulary: {
    label: "New words",
    iconName: "chatbubble",
    iconBg: "#FF4B4B",
  },
  grammar: {
    label: "Grammar",
    iconName: "document-text",
    iconBg: "#7C5CF6",
  },
  audio: {
    label: "Audio Lesson",
    iconName: "musical-notes",
    iconBg: "#1CB0F6",
  },
};

// ── Screen ────────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const { user } = useUser();
  const { selectedLanguage } = useLanguageStore();
  const { streak, dailyXP, dailyGoal, completedLessonIds } = useProgressStore();

  const firstName = user?.firstName ?? user?.username ?? "Learner";
  const langCode = (selectedLanguage?.code ?? "es") as LanguageCode;
  const greeting = GREETINGS[langCode] ?? "Hello";

  const lessons = getLessonsByLanguage(langCode);

  // First incomplete lesson → "Continue" target
  const currentLesson =
    lessons.find((l) => !completedLessonIds.includes(l.id)) ?? lessons[0];
  const currentUnit = currentLesson
    ? getUnitById(currentLesson.unitId)
    : undefined;

  // Today's plan — first 3 lessons
  const todayLessons = lessons.slice(0, 3);

  // Progress ratio for XP bar (0–1)
  const xpProgress = Math.min(dailyXP / dailyGoal, 1);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
          {/* Flag + Greeting */}
          <View className="flex-row items-center gap-2.5">
            <View className="w-[42px] h-[42px] rounded-full overflow-hidden bg-gray-200 items-center justify-center">
              {selectedLanguage ? (
                <Image
                  source={{ uri: selectedLanguage.flag }}
                  className="w-[42px] h-[42px]"
                  contentFit="cover"
                />
              ) : (
                <Text className="text-2xl">🌍</Text>
              )}
            </View>
            <Text className="font-[Poppins-SemiBold] text-base text-[#0D132B]">
              {greeting}, {firstName}! 👋
            </Text>
          </View>

          {/* Streak + Bell */}
          <View className="flex-row items-center gap-3.5">
            <View className="flex-row items-center gap-1">
              <Image
                source={images.streakFire}
                className="w-5 h-5"
                contentFit="contain"
              />
              <Text className="font-[Poppins-SemiBold] text-[15px] text-[#0D132B]">
                {streak}
              </Text>
            </View>
            <TouchableOpacity
              className="w-9 h-9 rounded-full bg-gray-100 items-center justify-center"
              activeOpacity={0.7}
            >
              <Ionicons
                name="notifications-outline"
                size={21}
                color="#0D132B"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Daily Goal Card ─────────────────────────────────────────────── */}
        <View className="mx-5 mb-4 flex-row items-center rounded-3xl px-5 py-4 bg-[#FFF5E6]" style={styles.dailyGoalShadow}>
          {/* Left: XP info + progress bar */}
          <View className="flex-1 gap-2.5">
            <Text className="font-[Poppins-Regular] text-[13px] text-gray-400">
              Daily goal
            </Text>
            <View className="flex-row items-baseline gap-0.5">
              <Text className="font-[Poppins-Bold] text-4xl text-[#0D132B] leading-[42px]">
                {dailyXP}
              </Text>
              <Text className="font-[Poppins-Regular] text-[15px] text-gray-500">
                {" "}
                / {dailyGoal} XP
              </Text>
            </View>
            {/* XP progress bar */}
            <View className="h-[9px] bg-[#FFE0B2] rounded-full overflow-hidden">
              <View
                className="h-full bg-[#FF8A00] rounded-full"
                style={{ width: `${Math.max(xpProgress * 100, 6)}%` }}
              />
            </View>
          </View>

          {/* Treasure chest */}
          <Image
            source={images.treasure}
            className="w-[88px] h-20 ml-3"
            contentFit="contain"
          />
        </View>

        {/* ── Continue Learning Card ──────────────────────────────────────── */}
        {selectedLanguage && (
          <View className="mx-5 mb-5 relative pt-2.5">
            {/* Purple card */}
            <TouchableOpacity
              activeOpacity={0.9}
              className="bg-[#6340E8] rounded-3xl overflow-hidden h-[175px] flex-row"
              style={styles.continueShadow}
            >
              {/* Text content */}
              <View className="flex-1 pl-[22px] pt-[22px] pb-[22px]">
                <Text className="font-[Poppins-Regular] text-[13px] text-white/80 mb-0.5">
                  Continue learning
                </Text>
                <Text className="font-[Poppins-Bold] text-[28px] text-white leading-[34px] mb-0.5">
                  {selectedLanguage.name}
                </Text>
                <Text className="font-[Poppins-Regular] text-[13px] text-white/75 mb-4">
                  A1 · Unit {currentUnit?.order ?? 1}
                </Text>
                <TouchableOpacity
                  className="self-start bg-white rounded-full px-6 py-2"
                  activeOpacity={0.85}
                >
                  <Text className="font-[Poppins-SemiBold] text-sm text-[#6340E8]">
                    Continue
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>

            {/* Palace image — overlaps top of the card */}
            <Image
              source={images.palace}
              className="absolute right-0 bottom-0 w-40 h-[195px]"
              contentFit="contain"
              pointerEvents="none"
            />
          </View>
        )}

        {/* ── Today's Plan ────────────────────────────────────────────────── */}
        <View className="px-5 mb-4">
          {/* Section header */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="font-[Poppins-Bold] text-lg text-[#0D132B]">
              {"Today's plan"}
            </Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text className="font-[Poppins-SemiBold] text-sm text-[#6C4EF5]">
                View all
              </Text>
            </TouchableOpacity>
          </View>

          {/* Plan items */}
          {todayLessons.map((lesson) => {
            const done = completedLessonIds.includes(lesson.id);
            const display = PLAN_DISPLAY[lesson.type];
            const subtitle =
              lesson.type === "vocabulary"
                ? `${lesson.vocabulary.length} words`
                : lesson.description;

            return (
              <TouchableOpacity
                key={lesson.id}
                className="flex-row items-center bg-white rounded-2xl mb-3 px-3.5 py-3.5"
                style={styles.planCardShadow}
                activeOpacity={0.75}
              >
                {/* Type icon */}
                <View
                  className="w-[50px] h-[50px] rounded-[14px] items-center justify-center"
                  style={{ backgroundColor: display.iconBg }}
                >
                  <Ionicons name={display.iconName} size={20} color="#FFFFFF" />
                </View>

                {/* Info */}
                <View className="flex-1 ml-3">
                  <Text className="font-[Poppins-SemiBold] text-[15px] text-[#0D132B] mb-0.5">
                    {display.label}
                  </Text>
                  <Text
                    className="font-[Poppins-Regular] text-[13px] text-gray-500"
                    numberOfLines={1}
                  >
                    {subtitle}
                  </Text>
                </View>

                {/* Completion status */}
                {done ? (
                  <View className="w-[30px] h-[30px] rounded-full bg-[#6C4EF5] items-center justify-center">
                    <Ionicons name="checkmark" size={15} color="#FFFFFF" />
                  </View>
                ) : (
                  <View className="w-[30px] h-[30px] rounded-full border-2 border-gray-300 bg-transparent" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* ── Next Up Card ─────────────────────────────────────────────────── */}
        <View className="mx-5 mb-6 rounded-3xl px-5 py-4 bg-[#F0FAF3]" style={styles.nextUpShadow}>
          <Text className="font-[Poppins-Regular] text-xs text-gray-500 mb-0.5">
            Next up
          </Text>
          <View className="flex-row items-center justify-between mt-1.5">
            <View>
              <Text className="font-[Poppins-Bold] text-lg text-[#0D132B] mb-0.5">
                AI Video Call
              </Text>
              <Text className="font-[Poppins-Regular] text-[13px] text-gray-500">
                Practice speaking
              </Text>
            </View>
            <View className="flex-row items-center gap-2.5">
              {/* Teacher avatar */}
              <Image
                source={{ uri: "https://picsum.photos/seed/teacher42/80/80" }}
                className="w-[54px] h-[54px] rounded-full bg-gray-300"
                contentFit="cover"
              />
              {/* Video call button */}
              <TouchableOpacity
                className="w-[46px] h-[46px] rounded-full bg-[#21C16B] items-center justify-center"
                activeOpacity={0.85}
              >
                <Ionicons name="videocam" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────
// Only for SafeAreaView, ScrollView, and shadow styles (not supported by NativeWind)

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F9F9FF",
  },
  scroll: {
    paddingBottom: 32,
  },
  dailyGoalShadow: {
    shadowColor: "#FF8A00",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  continueShadow: {
    shadowColor: "#5B3BF6",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 18,
    elevation: 10,
  },
  planCardShadow: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  nextUpShadow: {
    shadowColor: "#21C16B",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
});
