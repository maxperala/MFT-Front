import { AppDispatch } from "@/state/store";
import { Postcard } from "@/types";
import { Image, View, Text, StyleSheet, Pressable } from "react-native";
import { useDispatch } from "react-redux";
import { setActiveCard } from "@/state/cardsReducer";

const Marker = (props: { card: Postcard }) => {
  const dispatch: AppDispatch = useDispatch();
  const onOpen = () => {
    dispatch(setActiveCard(props.card));
  };
  return (
    <View style={style.container}>
      <Pressable style={style.btn} onPress={onOpen}>
        <Image
          source={require("@/assets/images/location-pin.png")}
          style={style.marker}
        ></Image>
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 50,
    height: 50,
    resizeMode: "contain",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btn: {
    width: "100%",
    height: "100%",
  },
});

export default Marker;
