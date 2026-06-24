import { Ionicons } from "@expo/vector-icons";
import { useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// ─── Types ───────────────────────────────────────────────────────────────────

type Route = {
  key: string;
  name: string;
};

type NavigationState = {
  index: number;
  routes: Route[];
};

type Navigation = {
  navigate: (name: string, params?: object) => void;
  emit: (event: {
    type: string;
    target: string;
    canPreventDefault: boolean;
  }) => { defaultPrevented: boolean };
};

type CustomTabBarProps = {
  state: NavigationState;
  navigation: Navigation;
};

// ─── Tab config ───────────────────────────────────────────────────────────────

type TabConfig = {
  label: string;
  activeIcon: React.ComponentProps<typeof Ionicons>["name"];
  inactiveIcon: React.ComponentProps<typeof Ionicons>["name"];
};

const TABS: TabConfig[] = [
  {
    label: "Home",
    activeIcon: "home",
    inactiveIcon: "home-outline",
  },
  {
    label: "Learn",
    activeIcon: "book",
    inactiveIcon: "book-outline",
  },
  {
    label: "AI Teacher",
    activeIcon: "sparkles",
    inactiveIcon: "sparkles-outline",
  },
  {
    label: "Chat",
    activeIcon: "chatbubble",
    inactiveIcon: "chatbubble-outline",
  },
  {
    label: "Profile",
    activeIcon: "person",
    inactiveIcon: "person-outline",
  },
];

// ─── Constants ────────────────────────────────────────────────────────────────

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const TAB_WIDTH = SCREEN_WIDTH / 5;
const CIRCLE_SIZE = 48;

// ─── Component ────────────────────────────────────────────────────────────────

export default function CustomTabBar({ state, navigation }: CustomTabBarProps) {
  const insets = useSafeAreaInsets();

  // Track the x position of the sliding circle
  const translateX = useSharedValue(state.index * TAB_WIDTH);

  // Animate the circle to the new active tab with a spring
  useEffect(() => {
    translateX.value = withSpring(state.index * TAB_WIDTH, {
      damping: 18,
      stiffness: 150,
      mass: 0.8,
    });
  }, [state.index, translateX]);

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={[
        styles.container,
        { paddingBottom: Math.max(insets.bottom, 8) },
      ]}
    >
      {/* ── Animated sliding circle (sits behind the icons) ── */}
      <Animated.View
        style={[styles.circleTrack, animatedCircleStyle]}
        pointerEvents="none"
      >
        <View style={styles.circle} />
      </Animated.View>

      {/* ── Tab buttons ── */}
      {state.routes.map((route, index) => {
        const isActive = state.index === index;
        const tab = TABS[index];

        if (!tab) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isActive && !event.defaultPrevented) {
            navigation.navigate(route.name, {});
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.75}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isActive }}
          >
            {/* Icon wrapper — same size as the circle so the icon centres over it */}
            <View style={styles.iconWrapper}>
              <Ionicons
                name={isActive ? tab.activeIcon : tab.inactiveIcon}
                size={22}
                color={isActive ? "#FFFFFF" : "#9CA3AF"}
              />
            </View>

            {/* Label */}
            <Text
              style={[
                styles.label,
                isActive ? styles.labelActive : styles.labelInactive,
              ]}
              numberOfLines={1}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 8,
    // iOS shadow
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    // Android elevation
    elevation: 8,
  },

  // The sliding wrapper is absolutely positioned at the top of the bar.
  // It has the same width as one tab and translates horizontally.
  circleTrack: {
    position: "absolute",
    top: 8,
    left: 0,
    width: TAB_WIDTH,
    height: CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },

  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "#6C4EF5",
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingBottom: 4,
  },

  // The icon wrapper must match the circle dimensions so the icon sits
  // centred inside the circle when the tab is active.
  iconWrapper: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    alignItems: "center",
    justifyContent: "center",
  },

  label: {
    fontFamily: "Poppins-Medium",
    fontSize: 10,
    lineHeight: 13,
    marginTop: 1,
  },
  labelActive: {
    color: "#6C4EF5",
  },
  labelInactive: {
    color: "#9CA3AF",
  },
});
