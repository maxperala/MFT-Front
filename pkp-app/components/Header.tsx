import { StyleSheet, View } from "react-native";
import { colors_new } from "@/colors";
import TotalFoundCalculation from "./TotalFoundCalculation";
import CurrentLocText from "./CurrentLocText";

const Header = () => {


  return (
    <View style={style.container}>
      <TotalFoundCalculation />
      <CurrentLocText />
      <View style={{flex: 1}} />
 
      
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
});

export default Header;
