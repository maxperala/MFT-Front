import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import colors, { colors_new } from "@/colors";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import { useTranslation } from "react-i18next";
import GenericHeader from "@/components/GenericHeader";

const naviLayout = () => {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.main_red,
          height: 80,
          shadowOffset: { width: 1, height: -3 },
          shadowRadius: 3,
          shadowOpacity: 0.3,
          elevation: 8,
        },
        tabBarActiveTintColor: colors_new.gold,
        tabBarInactiveTintColor: colors_new.dirty_white,
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
