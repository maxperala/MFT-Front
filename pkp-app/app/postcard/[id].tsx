import { RootState } from "@/state/store";
import { ScreenProps, useLocalSearchParams } from "expo-router";
import { useSelector } from "react-redux";
import { router } from "expo-router";

import CardView from "@/components/CardView";

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
