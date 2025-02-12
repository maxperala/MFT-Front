import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import RadioGroup from "react-native-radio-buttons-group";
import { useMemo, useState } from "react";
import { colors_new } from "@/colors";
import { Ionicons } from "@expo/vector-icons";
import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import { setRoute } from "@/state/settingsReducer";
import { AVAILABLE_LANGUAGES } from "@/config";
import { changeLanguage } from "@/state/settingsReducer";

const LanguageSettings = () => {
  const { t, i18n } = useTranslation();
  const dispatch: AppDispatch = useDispatch();
  const buttons = useMemo(() => {
    const list = [];
    for (const lang of AVAILABLE_LANGUAGES) {
      list.push({
        id: lang,
        label: t("language_name", { lng: lang }),
        value: lang,
        size: 30,
        labelStyle: style.label,
      });
    }
    return list;
  }, []);
  const [selected, setSelected] = useState(i18n.language);

  const onPressDone = async () => {
    dispatch(changeLanguage(selected));
    dispatch(setRoute(""));
  };
  const onPressButton = (id: string) => {
    setSelected(id);
  };

  return (
    <Animated.View
      style={style.container}
      entering={FadeInRight.duration(1000)}
    >
      <TouchableOpacity style={style.btn} onPress={onPressDone}>
        <Text style={style.btnLabel}>{t("done")}</Text>
        <Ionicons name="checkmark" size={50} />
      </TouchableOpacity>
      <Text style={style.text}>{t("choose_language")}</Text>
      <RadioGroup
        radioButtons={buttons}
        onPress={onPressButton}
        selectedId={selected}
        containerStyle={style.radioGroup}
      />
    </Animated.View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 10,
    paddingTop: "20%",
    borderRadius: 6,
    backgroundColor: colors_new.gold,
  },
  text: {
    fontFamily: "MarckScript-Regular",
    fontSize: 30,
    marginBottom: 30,
  },
  radioGroup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  label: {
    fontFamily: "SpecialElite-Regular",
    fontSize: 25,
  },
  btnLabel: {
    fontFamily: "SpecialElite-Regular",
    fontSize: 22,
    paddingTop: 5,
    textDecorationLine: "underline",
  },
  btn: {
    position: "absolute",
    bottom: 20,
    right: 25,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LanguageSettings;
