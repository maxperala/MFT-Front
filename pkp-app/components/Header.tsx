import { StyleSheet, View, Image } from "react-native";
import { colors_new } from "@/colors";
import TotalFoundCalculation from "./TotalFoundCalculation";
import CurrentLocText from "./CurrentLocText";
import Coords from "./Coords";
import LevelDisplay from "./LevelDisplay";

const Header = () => {
  return (
    <View style={style.container}>
      <LevelDisplay />
      <View style={style.centerContainer}>
        <CurrentLocText />
        <View style={style.coordsContainer}>
          <Image
            source={require("@/assets/images/location-indicator-white.png")}
            style={style.image}
          />
          <Coords />
        </View>
      </View>

      <TotalFoundCalculation />
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
    elevation: 8,

    backgroundColor: colors_new.red,
  },
  centerContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },

  coordsContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    opacity: 0.9,
    paddingRight: 3,
  },
  image: {
    width: 18,
    height: 18,
    objectFit: "contain",
    alignSelf: "flex-end",
    paddingBottom: "2%",
    shadowOffset: { width: 2, height: 1 },
    shadowRadius: 1,
    elevation: 2,
  },
});

export default Header;
