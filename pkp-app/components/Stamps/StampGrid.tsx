import { RootState } from "@/state/store";
import { useMemo } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Stamp from "./Stamp";
import EmptyStamp from "./EmptyStamp";

const StampGrid = () => {
  const stamps = useSelector((state: RootState) => state.account.user?.stamps);
  const stampOrEmpty: string[] = useMemo(() => {
    let i = 0;
    const list = [];
    while (i <= 6) {
      if (stamps && stamps.length >= i + 1) {
        list.push(stamps[i].asset);
      } else {
        list.push("empty");
      }
      i++;
    }
    return list;
  }, [stamps]);

  const firstRow = useMemo(() => {
    return stampOrEmpty.slice(0, 3).map((asset, i) => {
      return asset === "empty" ? (
        <EmptyStamp key={i} />
      ) : (
        <Stamp url={asset} key={i} />
      );
    });
  }, [stampOrEmpty]);

  const secondRow = useMemo(() => {
    return stampOrEmpty.slice(3, 6).map((asset, i) => {
      return asset === "empty" ? (
        <EmptyStamp key={i} />
      ) : (
        <Stamp url={asset} key={i} />
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
