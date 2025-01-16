import { colors_new } from "@/colors";
import { Text, StyleSheet, ScrollView, View } from "react-native";
import ProfileCard from "@/components/ProfileCard";

const Settings = () => {
  return (
    <ScrollView
      contentContainerStyle={style.container}
      style={style.scrollView}
    >
      <ProfileCard />
      <View style={{ flex: 2 }} />
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors_new.beige,
    alignItems: "center",
    padding: 20,
  },
  scrollView: {
    backgroundColor: colors_new.beige,
  },
});
export default Settings;
