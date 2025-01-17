import { setActiveStampDebounced } from "@/state/stampsReducer";
import { AppDispatch } from "@/state/store";
import { Stamp } from "@/types";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";

const Stamper = ({ stamp }: { stamp: Stamp }) => {
  const dispatch: AppDispatch = useDispatch();
  const onPressBtn = () => {
    dispatch(setActiveStampDebounced(stamp));
  };

  return (
    <View style={style.container}>
      <TouchableOpacity style={style.button} onPress={onPressBtn}>
        <Image source={{ uri: stamp.asset }} style={style.image} />
      </TouchableOpacity>
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
  button: {
    width: "100%",
    height: "100%",
  },
});

export default Stamper;
