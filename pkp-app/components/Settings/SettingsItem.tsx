import { setSettingsRoute } from "@/state/settingsReducer";
import { AppDispatch } from "@/state/store";
import { SettingsRoute } from "@/types";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

const SettingsItem = ({
  title,
  description,
  path,
  color,
}: {
  title: string;
  description: string;
  path: SettingsRoute;
  color: string;
}) => {
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();

  const onPressButton = () => {
    dispatch(setSettingsRoute(path, router));
  };
  return (
    <TouchableOpacity
      style={[style.container, { backgroundColor: color }]}
      onPress={onPressButton}
    >
      <View style={style.textContainer}>
        <Text style={style.headerText}>{title}</Text>
        <Text style={style.footerText}>{description}</Text>
      </View>
      <View style={style.iconContainer}>
        <Ionicons name="arrow-forward-circle" size={50} />
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    flex: 1,
  },
  textContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  headerText: {
    fontSize: 18,
    fontFamily: "MarckScript-Regular",
  },
  footerText: {
    fontSize: 12,
    fontFamily: "SpecialElite-Regular",
  },
});

export default SettingsItem;
