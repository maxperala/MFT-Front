/**
 * Delete Account Button Component
 *
 * A button component that handles account deletion with localized confirmation
 * dialogs and consistent styling across the application.
 *
 * Features:
 * - Localized confirmation dialogs
 * - Redux integration for user state
 * - Custom styled button appearance
 * - Language-aware alert messages
 * - Consistent theme-based colors
 * - Safe deletion confirmation flow
 *
 * @component
 */
import { colors } from "@/colors";
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
    backgroundColor: colors.red,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: "10%",
    marginRight: "10%",
    marginTop: 10,
    borderWidth: 3,
    borderColor: colors.light_red,
    borderRadius: 10,
    height: "15%",
  },
  text: {
    fontFamily: "SpecialElite-Regular",
    color: colors.dirty_white,
    fontSize: 20,
  },
});

export default DeleteAccountButton;
