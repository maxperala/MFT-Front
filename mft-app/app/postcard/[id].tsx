/**
 * Postcard Detail Screen Component
 *
 * Dynamic route component that displays a single postcard's details.
 *
 * Features:
 * - Uses URL parameter to fetch specific postcard by ID
 * - Retrieves card data from Redux store
 * - Automatically navigates back if card is not found
 * - Renders CardView component with card details
 *
 * State Management:
 * - Uses Redux for accessing card data
 * - Handles invalid/missing card scenarios
 *
 * @component
 */
import { RootState } from "@/state/store";
import { ScreenProps, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { router } from "expo-router";
import CardView from "@/components/views/CardView";

export const CardPage = () => {
  const { id }: { id: string } = useLocalSearchParams();
  const cards = useSelector((state: RootState) => state.cardData.cards);
  const card = cards ? cards.find((c) => c.id === id) : null;

  if (!card) {
    router.back();
    return;
  }

  return <CardView card={card} />;
};

export default CardPage;

export const ScreenOptions: ScreenProps = {
  options: {},
};
