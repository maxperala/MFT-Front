/**
 * Tab Navigation Layout Component
 *
 * Defines the main tab navigation structure for the app with four primary sections:
 * - Map: Main exploration view
 * - Collection: User's collected items
 * - Store: In-app marketplace
 * - Passport: User profile and settings
 *
 * Features:
 * - Custom styled tab bar with red background
 * - Gold color for active tabs, off-white for inactive
 * - Custom icons for each tab using Ionicons
 * - Internationalized tab labels
 * - Custom headers for each screen
 *
 * @component
 */
import { Tabs } from "expo-router";
import { colors } from "@/colors";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/header/Header";
import { useTranslation } from "react-i18next";
import GenericHeader from "@/components/header/GenericHeader";

const naviLayout = () => {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.red,
          height: 80,
          shadowOffset: { width: 1, height: -3 },
          shadowRadius: 3,
          shadowOpacity: 0.3,
          elevation: 8,
        },
        tabBarActiveTintColor: colors.gold,
        tabBarInactiveTintColor: colors.dirty_white,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("map"),
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="map" color={color} size={size} />;
          },
          header: () => <Header />,
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: t("collection"),
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="bookmarks" color={color} size={size} />;
          },
          header: () => <GenericHeader title={t("collection")} />,
        }}
      />
      <Tabs.Screen
        name="store"
        options={{
          title: t("store"),
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="cart" color={color} size={size} />;
          },
          header: () => <GenericHeader title={t("store")} />,
        }}
      />
      <Tabs.Screen
        name="passport"
        options={{
          title: t("passport"),
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="person" color={color} size={size} />;
          },
          header: () => <GenericHeader title={t("passport")} />,
        }}
      />
    </Tabs>
  );
};

export default naviLayout;
