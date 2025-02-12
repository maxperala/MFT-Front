/**
 * Back Navigator Component
 *
 * A reusable navigation header component that provides a consistent way to
 * navigate back to the previous screen across the application.
 *
 * Features:
 * - Translatable "back" text
 * - Consistent styling with app theme
 * - Shadow effects for visual depth
 * - Custom font integration
 * - Expo Router integration for navigation
 *
 * @component
 */
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "@/colors";
import { useTranslation } from "react-i18next";
import { Ionicons } from "@expo/vector-icons";

const BackNavigator = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View style={style.container}>
      <TouchableOpacity style={style.btn} onPress={() => router.back()}>
        <Ionicons
          name="arrow-back"
          size={35}
          color={colors.black}
          style={{
            opacity: 0.5,
            shadowOffset: { width: 1, height: 3 },
            shadowRadius: 3,
            shadowOpacity: 0.3,
          }}
        />
        <Text style={style.text}>{t("back")}</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 45,

    padding: 7,
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",

    backgroundColor: colors.beige,
  },
  btn: { flex: 1, justifyContent: "flex-start", flexDirection: "row" },
  text: {
    fontSize: 20,
    opacity: 0.5,
    paddingTop: 10,
    paddingLeft: 5,
    color: colors.black,
    fontFamily: "SpecialElite-Regular",
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
});

export default BackNavigator;
