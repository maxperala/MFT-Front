import { colors_new } from "@/colors";
import { setPicture } from "@/state/pictureReducer";
import { RootState } from "@/state/store";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Image, View } from "tamagui";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";

const FullScreenImage = () => {
  const uri = useSelector((state: RootState) => state.picture.url);
  const dispatch = useDispatch();
  const setHidden = () => {
    dispatch(setPicture(null));
  };
  if (!uri) return null;
  return (
    <View
      width="100%"
      height="100%"
      backgroundColor={colors_new.black}
      justifyContent="center"
      alignItems="center"
    >
      <ImageZoom
        uri={uri}
        resizeMode={"contain"}
        style={{ width: "100%", height: "100%" }}
        minScale={0.5}
        isSingleTapEnabled
        isDoubleTapEnabled
      />

      <TouchableOpacity
        onPress={setHidden}
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          borderWidth: 1,
          borderRadius: 40,
          backgroundColor: colors_new.beige,
        }}
      >
        <Image
          source={{ uri: require("@/assets/images/marker-x.png") }}
          height={50}
          width={50}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FullScreenImage;
