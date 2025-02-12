import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

const NotFound = () => {
  const { t } = useTranslation();
  return (
    <View>
      <Text>{t("not_found")}</Text>
    </View>
  );
};

export default NotFound;
