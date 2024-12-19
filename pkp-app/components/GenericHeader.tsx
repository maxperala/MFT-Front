import { StyleSheet, View, Text } from "react-native";
import colors, { colors_new } from "@/colors";

const GenericHeader = ({ title }: { title: string }) => {
  return (
    <View style={style.container}>
      <Text style={style.text}>{title}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.3,

    backgroundColor: colors_new.red,
  },
  text: {
    fontSize: 26,
    color: colors_new.dirty_white,
    fontFamily: "Fair-Prosper",
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
});

export default GenericHeader;
