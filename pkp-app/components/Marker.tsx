import { AppDispatch, RootState } from "@/state/store";
import { Postcard } from "@/types";
import { Image, View, Text, StyleSheet, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCard } from "@/state/cardsReducer";

const Marker = (props: { card: Postcard }) => {
  const dispatch: AppDispatch = useDispatch();
  const discovered = useSelector(
    (state: RootState) => state.account.user?.unlocked
  );
  if (discovered && !discovered.includes(props.card.id)) {
    return (
      <View style={style.container}>
        <Image
          source={require("@/assets/images/marker-x.png")}
          style={style.marker}
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
          source={require("@/assets/images/marker-x.png")}
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
    width: 30,
    height: 30,
    resizeMode: "contain",

    opacity: 0.9,
  },
  btn: {
    width: "100%",
    height: "100%",
  },
});

export default Marker;
