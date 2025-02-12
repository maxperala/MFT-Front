/**
 * Privacy Policy View Component
 *
 * Displays the privacy policy content in a WebView with localized content
 * and a close button for navigation.
 *
 * Features:
 * - Localized policy content
 * - WebView integration
 * - Loading state handling
 * - Close button navigation
 * - Loading spinner indicator
 * - Responsive layout
 *
 * @component
 */
import { colors } from "@/colors";
import { PRIVACY_POLICY } from "@/config";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { Spinner } from "tamagui";

const PrivacyPolicyView = ({ showPolicy }: { showPolicy: Function }) => {
  const { i18n } = useTranslation();
  const uri = i18n.language === "fi" ? PRIVACY_POLICY.fi : PRIVACY_POLICY.en;
  const [loading, setLoading] = useState(true);
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn} onPress={() => showPolicy(false)}>
        <Ionicons name="close" size={50} />
      </TouchableOpacity>
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
    width: "100%",
    height: "100%",
    backgroundColor: colors.beige,
    position: "absolute",
    paddingTop: "10%",
    paddingBottom: "10%",
    paddingLeft: "2%",
    paddingRight: "2%",
  },
  webview: {
    flex: 1,
    borderRadius: 6,
    borderColor: colors.black,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    alignSelf: "flex-end",
    position: "absolute",
    top: "6%",
    right: "5%",
    zIndex: 2,
  },
});

export default PrivacyPolicyView;
