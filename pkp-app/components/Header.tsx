import { StyleSheet, View, Text } from "react-native";
import colors from "@/colors";

const Header = () => {
  return (
    <View style={style.container}>
      <Text style={style.text}>Tahmela</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 45,
    alignItems: "flex-end",
    justifyContent: "center",
    flexDirection: "row",

    backgroundColor: colors.main_red,
  },
  text: {
    fontSize: 30,
    color: colors.white,
    paddingBottom: 2,
    paddingLeft: 8,
    paddingRight: 8,
    fontFamily: "Fair-Prosper",
  },
});

export default Header;
