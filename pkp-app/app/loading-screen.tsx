import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import LoadingView from "@/components/LoadingView";
import { View, StyleSheet } from "react-native";
import { colors } from "@/colors";

const LoadingScreen = () => {
  const userLoading = useSelector((state: RootState) => state.account.loading);
  const mapLoading = useSelector(
    (state: RootState) => state.location.mapLoading
  );
  const packExists = useSelector(
    (state: RootState) => state.location.packExists
  );
  if (!userLoading && !mapLoading && packExists) return null;

  return (
    <View style={style.container}>
      <LoadingView />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 10000,
    width: "100%",
    height: "100%",
    backgroundColor: colors.light_warm_red,
  },
});

export default LoadingScreen;
