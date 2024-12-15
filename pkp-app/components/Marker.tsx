import { AppDispatch, RootState } from "@/state/store";
import { Postcard } from "@/types";
import { Image, View, Text, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCard } from "@/state/cardsReducer";
import { useMemo } from "react";

const Marker = (props: { card: Postcard }) => {
  const dispatch: AppDispatch = useDispatch();
  const discovered = useSelector(
    (state: RootState) => state.account.user?.unlocked
  );
  // This is to give each marker a random orientation, improving visuals. But we need to make sure it doesn't recalculate while the thing is visible
  const rotation = useMemo<number>(() => Math.floor(Math.random() * 359), []);
  if (!discovered) return;
  if (!discovered.includes(props.card.id)) {
    return (
      <View style={style.container}>
        <Image
          source={require("@/assets/images/marker-x.png")}
          style={[style.marker, { transform: [{ rotate: `${rotation}deg` }] }]}
        ></Image>
      </View>
    );
  }

  const onOpen = () => {
    dispatch(setActiveCard(props.card));
  };
  return (
    <View style={style.container}>
      <Pressable style={style.btn} onPress={onOpen}>
        <Image
          source={require("@/assets/images/discovered-marker.png")}
          style={style.discMarker}
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
    width: 30,
    height: 30,
    resizeMode: "contain",

    opacity: 0.9,
  },
  btn: {
    width: "100%",
    height: "100%",
  },
  discMarker: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default Marker;
