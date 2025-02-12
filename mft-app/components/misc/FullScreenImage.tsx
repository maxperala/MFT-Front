/**
 * Full Screen Image Component
 *
 * A modal component that displays images in full-screen view with zoom capabilities
 * and a close button for navigation.
 *
 * Features:
 * - Image zoom functionality
 * - Full screen modal display
 * - Close button with custom styling
 * - Redux integration for state management
 * - Responsive image scaling
 * - Touch gesture support
 *
 * @component
 */
import { colors } from "@/colors";
import { setPicture } from "@/state/pictureReducer";
import { RootState } from "@/state/store";
import { TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { View } from "tamagui";
import { ImageZoom } from "@likashefqet/react-native-image-zoom";
import { Ionicons } from "@expo/vector-icons";

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
      backgroundColor={colors.black}
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
          backgroundColor: colors.beige,
        }}
      >
        <Ionicons name="close-circle" size={50} color={colors.black} />
      </TouchableOpacity>
    </View>
  );
};

export default FullScreenImage;
