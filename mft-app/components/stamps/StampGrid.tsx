/**
 * Stamp Grid Component
 *
 * Displays a grid of collected stamps and empty placeholders in a structured
 * two-row layout with dynamic content rendering.
 *
 * Features:
 * - Dynamic stamp rendering
 * - Empty slot placeholders
 * - Two-row grid layout
 * - Redux integration for stamps data
 * - Memoized row calculations
 * - Responsive positioning
 *
 * @component
 */
import { RootState } from "@/state/store";
import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Stamper from "./Stamper";
import EmptyStamp from "./EmptyStamp";
import { StampID, Stamp } from "@/types";

const StampGrid = () => {
  const stampsOwned: StampID[] | undefined = useSelector(
    (state: RootState) => state.account.user?.stamps
  );
  const allStamps = useSelector((state: RootState) => state.stamps.allStamps);
  const stamps = useMemo(() => {
    return allStamps.filter((s) => stampsOwned?.includes(s.id));
  }, [stampsOwned, allStamps]);
  const stampOrEmpty: (Stamp | string)[] = useMemo(() => {
    let i = 0;
    const list = [];
    while (i <= 6) {
      if (stamps && stamps.length >= i + 1) {
        list.push(stamps[i]);
      } else {
        list.push("empty");
      }
      i++;
    }
    return list;
  }, [stamps]);

  const firstRow = useMemo(() => {
    return stampOrEmpty.slice(0, 3).map((s, i) => {
      return typeof s === "string" ? (
        <EmptyStamp key={i} />
      ) : (
        <Stamper stamp={s} key={i} />
      );
    });
  }, [stampOrEmpty]);

  const secondRow = useMemo(() => {
    return stampOrEmpty.slice(3, 6).map((s, i) => {
      return typeof s === "string" ? (
        <EmptyStamp key={i} />
      ) : (
        <Stamper stamp={s} key={i} />
      );
    });
  }, [stampOrEmpty]);
  return (
    <View style={style.container}>
      <View style={style.row}>{firstRow}</View>
      <View style={style.row}>{secondRow}</View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: "90%",
    height: "95%",
    position: "absolute",
    flex: 1,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default StampGrid;
