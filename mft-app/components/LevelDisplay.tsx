import { colors_new } from "@/colors";
import { RootState } from "@/state/store";
import { View, StyleSheet, Text } from "react-native";
import { useSelector } from "react-redux";
import { useMemo } from "react";

import FillingCircle from "./FillingCircle";

const LevelDisplay = () => {
  const level = useSelector((state: RootState) => state.account.user?.lvl);
  const unlocked = useSelector(
    (state: RootState) => state.account.user?.unlocked
  );
  let percentage = useMemo(() => {
    if (unlocked && level && level.limit != 0) {
      const perc = (unlocked.length / level.limit) * 100;
      return perc === 0 ? 20 : perc;
    }
    return 20;
  }, [unlocked, level]);

  if (level === undefined) {
    return <View style={style.container} />;
  }

  return (
    <View style={style.container}>
      <Text style={style.text}>Lvl</Text>
      <FillingCircle percentage={percentage} lvl={level.lvl} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 6,
  },
  text: {
    fontFamily: "Fair-Prosper",
    color: colors_new.dirty_white,
    fontSize: 18,
    lineHeight: 40,
    paddingTop: 4,
  },
});

export default LevelDisplay;
