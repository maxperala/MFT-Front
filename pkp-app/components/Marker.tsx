import { AppDispatch, RootState } from "@/state/store";
import { Postcard } from "@/types";
import { Image, View, StyleSheet, Pressable } from "react-native";
import { Text } from "tamagui";
import { useDispatch, useSelector } from "react-redux";
import { setActiveCard } from "@/state/cardsReducer";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

const Marker = (props: { card: Postcard }) => {
  const dispatch: AppDispatch = useDispatch();
  const discovered = useSelector(
    (state: RootState) => state.account.user?.unlocked
  );
  const { i18n } = useTranslation();
  const lang = i18n.language;
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
      <Pressable onPress={onOpen}>
        <View style={style.textImageContainer}>
          <Image
            source={require("@/assets/images/discovered-marker.png")}
            style={style.discMarker}
          ></Image>
          <Text fontFamily="Fair-Prosper" color="black" fontSize="$1">
            {lang === "fi" ? props.card.title_fi : props.card.title_en}
          </Text>
        </View>
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
  textImageContainer: {
    flex: 1,
    opacity: 0.8,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Marker;
