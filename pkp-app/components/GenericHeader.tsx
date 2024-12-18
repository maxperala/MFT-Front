import { StyleSheet, View, Text } from "react-native";
import colors from "@/colors";

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

    backgroundColor: colors.main_red,
  },
  text: {
    fontSize: 28,
    color: colors.white,
    fontFamily: "Fair-Prosper",
  },
});

export default GenericHeader;
