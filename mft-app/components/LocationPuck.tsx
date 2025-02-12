import { Image, View, StyleSheet } from "react-native";

const LocationPuck = () => {
  return (
    <View style={style.container}>
      <Image
        source={require("@/assets/images/location-puck.png")}
        style={style.marker}
      ></Image>
    </View>
  );
};

export default LocationPuck;

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 30,
    height: 30,
    resizeMode: "contain",

    opacity: 0.9,
  },
});
