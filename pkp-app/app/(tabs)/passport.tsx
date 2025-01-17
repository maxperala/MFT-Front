import { colors_new } from "@/colors";
import { StyleSheet, ScrollView, View } from "react-native";
import ProfileCard from "@/components/ProfileCard";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import StampModal from "@/components/Stamps/StampModal";

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
        <View style={{ flex: 2 }} />
      </ScrollView>
      {activeStamp ? <StampModal stamp={activeStamp} /> : null}
    </View>
  );
};

const style = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: colors_new.beige,
    alignItems: "center",
    padding: 20,
  },
  container: {
    width: "100%",
    height: "100%",
  },
  scrollView: {
    backgroundColor: colors_new.beige,
  },
});
export default Settings;
