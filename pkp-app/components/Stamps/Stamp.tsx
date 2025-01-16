import { Image, View, StyleSheet } from "react-native";

const Stamp = ({ url }: { url: string }) => {
  return (
    <View style={style.container}>
      <Image source={{ uri: url }} style={style.image} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
});

export default Stamp;
