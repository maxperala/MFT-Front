/**
 * Passport/Settings Screen Component
 *
 * User profile and settings screen that displays user information and configuration options.
 *
 * Features:
 * - Displays user profile information via ProfileCard
 * - Shows settings options via SettingsCard
 * - Handles stamp modal display when a stamp is active
 * - Scrollable container with consistent styling
 *
 * State Management:
 * - Uses Redux to track active stamp state
 *
 * @component
 */
import { colors } from "@/colors";
import { StyleSheet, ScrollView, View } from "react-native";
import ProfileCard from "@/components/cards/ProfileCard";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import StampModal from "@/components/stamps/StampModal";
import SettingsCard from "@/components/cards/SettingsCard";

const Settings = () => {
  const activeStamp = useSelector(
    (state: RootState) => state.stamps.activeStamp
  );
  return (
    <View style={style.container}>
      <ScrollView
        contentContainerStyle={style.scrollContainer}
        style={style.scrollView}
      >
        <ProfileCard />
        <SettingsCard />
      </ScrollView>
      {activeStamp ? <StampModal stamp={activeStamp} /> : null}
    </View>
  );
};

const style = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    backgroundColor: colors.beige,
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  container: {
    height: "100%",
    width: "100%",
  },
  scrollView: {
    backgroundColor: colors.beige,
  },
});
export default Settings;
