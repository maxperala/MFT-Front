import { colors_new } from "@/colors";
import { PRIVACY_POLICY } from "@/config";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { Spinner } from "tamagui";

const InfoPage = () => {
  const { i18n } = useTranslation();
  // This will be replaced with a different web page when I finnish creating the info webpage
  const uri = i18n.language === "fi" ? PRIVACY_POLICY.fi : PRIVACY_POLICY.en;
  const [loading, setLoading] = useState(true);
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri }}
        style={styles.webview}
        onLoad={() => setLoading(false)}
      >
        {loading ? <Spinner color={colors_new.gold} size="large" /> : null}
      </WebView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors_new.beige,
    position: "absolute",
    paddingTop: "15%",
    paddingBottom: "10%",
    paddingLeft: "2%",
    paddingRight: "2%",
    width: "100%",
    height: "100%",
  },
  webview: {
    flex: 1,
    borderRadius: 6,
    borderColor: colors_new.black,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InfoPage;
