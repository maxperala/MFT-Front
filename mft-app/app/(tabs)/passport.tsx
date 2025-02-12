import { colors_new } from "@/colors";
import { StyleSheet, ScrollView, View } from "react-native";
import ProfileCard from "@/components/ProfileCard";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import StampModal from "@/components/Stamps/StampModal";
import SettingsCard from "@/components/SettingsCard";

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
    backgroundColor: colors_new.beige,
    alignItems: "center",
    padding: 20,
    gap: 20,
  },
  container: {
    height: "100%",
    width: "100%",
  },
  scrollView: {
    backgroundColor: colors_new.beige,
  },
});
export default Settings;
