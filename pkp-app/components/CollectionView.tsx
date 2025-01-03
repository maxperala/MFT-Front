import { RootState } from "@/state/store";
import { Postcard } from "@/types";
import { useSelector } from "react-redux";
import { YGroup, ScrollView } from "tamagui";
import CardListItem from "./CardListItem";
import { colors_new } from "@/colors";

const CollectionView = () => {
  const cards = useSelector((state: RootState) => state.cardData.cards);

  const sections = cards
    ? cards.map((card: Postcard) => {
        return (
          <YGroup.Item key={card.id}>
            <CardListItem card={card} />
          </YGroup.Item>
        );
      })
    : [];

  return (
    <YGroup
      width="100%"
      height="100%"
      flex={1}
      backgroundColor={colors_new.beige}
    >
      <ScrollView>{sections}</ScrollView>
    </YGroup>
  );
};

export default CollectionView;
