/**
 * Onboarding Viewer Component
 *
 * Manages the initial app onboarding experience with a swipeable carousel of
 * introduction screens explaining key app features and functionality.
 *
 * Features:
 * - Multi-page swiper interface
 * - Localized content using i18n
 * - Custom styled slides with images and animations
 * - Responsive layout with safe area handling
 * - Progress tracking with Redux state management
 * - Custom typography for titles and subtitles
 *
 * @component
 */
import { colors } from "@/colors";
import Onboarding, { Page } from "react-native-onboarding-swiper";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import { setIntroToSeen } from "@/state/settingsReducer";
import { Text } from "tamagui";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

const OnboardingViewer = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const insets = useSafeAreaInsets();
  const onDone = () => {
    dispatch(setIntroToSeen());
  };

  const pages: Page[] = useMemo(() => {
    return [
      {
        backgroundColor: colors.red,
        image: (
          <View style={style.container}>
            <Image
              source={require("@/assets/images/onboarding/slide_1.png")}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </View>
        ),
        title: <Title str={t("adventure")} />,
        subtitle: <Subtitle str={t("adventure_description")} />,
      },
      {
        backgroundColor: colors.red,
        image: (
          <View style={style.container}>
            <Image
              source={require("@/assets/images/onboarding/slide_2.png")}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </View>
        ),
        title: <Title str={t("learn")} />,
        subtitle: <Subtitle str={t("learn_description")} />,
      },
      {
        backgroundColor: colors.red,
        image: (
          <View style={style.container}>
            <Image
              source={require("@/assets/images/onboarding/slide_3.png")}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </View>
        ),
        title: <Title str={t("earn")} />,
        subtitle: <Subtitle str={t("earn_description")} />,
      },
      {
        image: (
          <View style={style.presentContaier}>
            <LottieView
              source={require("@/assets/animations/present.json")}
              style={{ width: "150%", height: "150%" }}
              autoPlay
            />
          </View>
        ),
        backgroundColor: colors.red,
        title: <Title str={t("pyynikki_start")} />,
        subtitle: <Subtitle str={t("pyynikki_description")} />,
      },
    ];
  }, []);

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <Onboarding
        pages={pages}
        showSkip={false}
        nextLabel={t("next")}
        onDone={onDone}
        containerStyles={style.swiper}
      ></Onboarding>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: "85%",
    marginTop: "10%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    aspectRatio: 1,
    borderWidth: 4,
    borderColor: colors.dirty_white,
    borderRadius: 6,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.6,
    elevation: 8,
  },
  swiper: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  presentContaier: {
    width: "85%",
    marginTop: "10%",
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const Title = ({ str }: { str: string }) => {
  return (
    <Text fontFamily="Fair-Prosper" fontSize="$9" color={colors.dirty_white}>
      {str}
    </Text>
  );
};

const Subtitle = ({ str }: { str: string }) => {
  return (
    <Text
      fontFamily="MarckScript-Regular"
      fontSize="$8"
      textAlign="center"
      color={colors.light_grey}
      paddingLeft="4%"
      paddingRight="4%"
      paddingTop="3%"
    >
      {str}
    </Text>
  );
};

export default OnboardingViewer;
