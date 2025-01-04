import { colors_new } from "@/colors";
import { useTranslation } from "react-i18next";
import Animated, { FadeOut, FadeIn } from "react-native-reanimated";
import { Image, Text } from "tamagui";

const MapOverlay = () => {
  const { t } = useTranslation();

  return (
    <Animated.View
      style={{
        justifyContent: "center",
        alignItems: "center",
        zIndex: 2,
        width: "100%",
        height: "100%",
      }}
      entering={FadeIn}
      exiting={FadeOut}
    >
      {/*I put it to repeat this if it has issues with other aspect ratio/resolution devices... I will fix if needed when testing the app*/}
      <Image
        source={{ uri: require("@/assets/images/map-overlay.png") }}
        width="100%"
        height="100%"
        objectFit="fill"
      />
      <Text
        position="absolute"
        fontFamily="Fair-Prosper"
        color={colors_new.black}
        fontSize="$8"
        textAlign="center"
        opacity={0.7}
        shadowOffset={{ width: 2, height: 2 }}
        shadowRadius={4}
        shadowOpacity={0.5}
      >
        {t("arrival")}
      </Text>
    </Animated.View>
  );
};

export default MapOverlay;
