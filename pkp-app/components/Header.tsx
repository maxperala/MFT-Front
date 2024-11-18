import { StyleSheet, View, Text } from "react-native";
import colors from "@/colors";
import { getLoadedFonts } from "expo-font";

const Header = () => {
  const fonts = getLoadedFonts();
  console.log(fonts);
  return (
    <View style={style.container}>
      <Text style={style.text}>Pyynikinharju</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 90,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: colors.main_red,
  },
  text: {
    fontSize: 30,
    color: colors.white,
    paddingBottom: 2,
    fontFamily: "Fair-Prosper",
  },
});

export default Header;
