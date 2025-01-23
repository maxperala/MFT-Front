import { colors_new } from "@/colors";
import { englishDeleteAlert, finnishDeleteAlert } from "@/config";
import { AppDispatch } from "@/state/store";
import { deleteUser } from "@/state/userReducer";
import { useTranslation } from "react-i18next";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";

const DeleteAccountButton = () => {
  const { t, i18n } = useTranslation();
  const dispatch: AppDispatch = useDispatch();

  const onPressDelete = () => {
    i18n.language === "fi"
      ? finnishDeleteAlert(dispatch, deleteUser)
      : englishDeleteAlert(dispatch, deleteUser);
  };
  return (
    <TouchableOpacity style={style.container} onPress={onPressDelete}>
      <Text style={style.text}>{t("delete_account")}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: colors_new.red,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 10,
    borderWidth: 3,
    borderColor: colors_new.light_red,
    borderRadius: 10,
    height: "15%",
  },
  text: {
    fontFamily: "SpecialElite-Regular",
    color: colors_new.dirty_white,
    fontSize: 20,
  },
});

export default DeleteAccountButton;
