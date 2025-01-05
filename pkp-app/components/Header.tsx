import { StyleSheet, View, Text } from "react-native";
import { colors_new } from "@/colors";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";

const Header = () => {
  const navData = useSelector((state: RootState) => state.navigation);
  return (
    <View style={style.container}>
      <Text style={style.text}>
        {navData.currentDistrict
          ? navData.currentDistrict.name
          : "Unknown area"}
      </Text>
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
    zIndex: 10,
    elevation: 8,

    backgroundColor: colors_new.red,
  },
  text: {
    fontSize: 26,
    color: colors_new.dirty_white,
    fontFamily: "Fair-Prosper",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 4,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
  },
});

export default Header;
