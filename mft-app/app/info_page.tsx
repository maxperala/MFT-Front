/**
 * Info Page Component
 *
 * Displays external web content within the app using WebView, with language-specific
 * content based on the user's selected language preference.
 *
 * Features:
 * - Language-aware content loading (Finnish/English)
 * - Loading spinner while content loads
 * - Styled container with border and padding
 * - Responsive layout with absolute positioning
 *
 * @component
 */
import { colors } from "@/colors";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { Spinner } from "tamagui";
import { INFO_URL } from "@/config";

const InfoPage = () => {
  const { i18n } = useTranslation();
  const uri = i18n.language === "fi" ? INFO_URL.fi : INFO_URL.en;
  const [loading, setLoading] = useState(true);
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri }}
        style={styles.webview}
        onLoad={() => setLoading(false)}
      >
        {loading ? <Spinner color={colors.gold} size="large" /> : null}
      </WebView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.beige,
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
    borderColor: colors.black,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default InfoPage;
