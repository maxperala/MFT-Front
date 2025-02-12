/**
 * Profile Card Component
 *
 * Displays user profile information including username, level, and stamps
 * in a styled card container with a subtle rotation effect.
 *
 * Features:
 * - Loading state with spinner
 * - Username and level display
 * - Stamp collection integration
 * - Styled container with shadow effects
 * - Rotated card design aesthetic
 *
 * @component
 */
import { colors } from "@/colors";
import { RootState } from "@/state/store";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Spinner } from "tamagui";
import UsernameLevelView from "../header/UsernameLevelView";
import StampCard from "../stamps/StampCard";

const ProfileCard = () => {
  const profile = useSelector((state: RootState) => state.account.user);

  if (!profile) {
    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Spinner color={colors.gold} />
      </View>
    );
  }
  return (
    <View style={style.container}>
      <UsernameLevelView profile={profile} />
      <StampCard />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: colors.dirty_white,
    width: "100%",
    padding: 3,
    gap: 0,
    borderRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    elevation: 8,
    transform: [
      {
        rotate: "-2deg",
      },
    ],
  },
});

export default ProfileCard;
