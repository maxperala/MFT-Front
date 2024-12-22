import LoadingView from "@/components/LoadingView";
import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { View } from "tamagui";

const LoadingScreen = () => {
  const userLoading = useSelector((state: RootState) => state.account.loading);
  const mapLoading = useSelector(
    (state: RootState) => state.location.mapLoading
  );

  if (!mapLoading && !userLoading) return null;
  return (
    <View width="100%" height="100%">
      <LoadingView />;
    </View>
  );
};

export default LoadingScreen;
