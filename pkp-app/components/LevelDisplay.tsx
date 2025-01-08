import { colors_new } from "@/colors";
import { RootState } from "@/state/store";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const LevelDisplay = () => {
  const level = useSelector((state: RootState) => state.account.user?.lvl);

  if (level === undefined) {
    return <View style={style.container} />;
  }

  return (
    <View style={style.container}>
      <Text style={style.text}>Lvl {level}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "Fair-Prosper",
    color: colors_new.dirty_white,
    fontSize: 20,
  },
});

export default LevelDisplay;
