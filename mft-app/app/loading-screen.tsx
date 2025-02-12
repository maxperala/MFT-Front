/**
 * Loading Screen Component
 *
 * Displays a loading overlay when either user data or map data is being fetched.
 * Conditionally renders based on loading states from the Redux store.
 *
 * Features:
 * - Full-screen overlay
 * - Conditional rendering based on loading states
 * - Integrated with user and map loading states
 * - Uses LoadingView component for visual feedback
 *
 * @component
 */
import LoadingView from "@/components/views/LoadingView";
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
      <LoadingView />
    </View>
  );
};

export default LoadingScreen;
