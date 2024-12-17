import { Tabs } from "expo-router";
import colors from "@/colors";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import { useTranslation } from "react-i18next";

const naviLayout = () => {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.main_red,
          height: 80,
        },
        tabBarActiveTintColor: colors.yellow,
        tabBarInactiveTintColor: colors.white,
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
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t("settings"),
          tabBarIcon: ({ color, size }) => {
            return <Ionicons name="settings" color={color} size={size} />;
          },
        }}
      />
    </Tabs>
  );
};

export default naviLayout;
