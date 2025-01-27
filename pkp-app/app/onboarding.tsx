import { colors_new } from "@/colors";
import Onboarding, { Page } from "react-native-onboarding-swiper";
import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import { setIntroToSeen } from "@/state/settingsReducer";

const OnboardingViewer = () => {
  const { t } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const onDone = () => {
    dispatch(setIntroToSeen());
  };
  const pages: Page[] = useMemo(() => {
    return [
      {
        backgroundColor: colors_new.red,
        image: (
          <View style={style.container}>
            <Image
              source={require("@/assets/images/onboarding/slide_1.png")}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </View>
        ),
        title: t("adventure"),
        subtitle: t("adventure_description"),
      },
      {
        backgroundColor: colors_new.red,
        image: (
          <View style={style.container}>
            <Image
              source={require("@/assets/images/onboarding/slide_2.png")}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </View>
        ),
        title: t("learn"),
        subtitle: t("learn_description"),
      },
      {
        backgroundColor: colors_new.red,
        image: (
          <View style={style.container}>
            <Image
              source={require("@/assets/images/onboarding/slide_3.png")}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </View>
        ),
        title: t("earn"),
        subtitle: t("earn_description"),
      },
    ];
  }, []);

  return (
    <Onboarding
      pages={pages}
      showSkip={false}
      nextLabel={t("next")}
      onDone={onDone}
      titleStyles={style.title}
      subTitleStyles={style.sub}
    ></Onboarding>
  );
};

const style = StyleSheet.create({
  container: {
    width: "90%",
    aspectRatio: 1,
    borderWidth: 4,
    borderColor: colors_new.dirty_white,
    borderRadius: 6,
    shadowOffset: { width: 2, height: 2 },
    shadowRadius: 5,
    shadowOpacity: 0.6,
    elevation: 8,
  },
  title: {
    fontFamily: "Fair-Prosper",
    fontSize: 25,
  },
  sub: {
    fontFamily: "MarckScript-Regular",
    fontSize: 18,
  },
});

export default OnboardingViewer;
