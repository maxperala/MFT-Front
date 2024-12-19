import { Image, View } from "tamagui";

const FullScreenImage = ({ uri }: { uri: string }) => {
  return (
    <View width="100%" height="100%" position="absolute">
      <Image source={{ uri }} />
    </View>
  );
};

export default FullScreenImage;
