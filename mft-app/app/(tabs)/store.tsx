/**
 * Store Screen Component
 *
 * Marketplace screen that displays purchasable items and offers.
 *
 * Features:
 * - Full-screen view container
 * - Renders StoreView component for item display
 * - Maintains consistent layout with other main screens
 *
 * @component
 */
import StoreView from "@/components/views/StoreView";
import { View } from "tamagui";

const Store = () => {
  return (
    <View flex={1} width="100%" height="100%">
      <StoreView />
    </View>
  );
};

export default Store;
