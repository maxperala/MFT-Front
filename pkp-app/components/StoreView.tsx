import colors, { colors_new } from "@/colors";
import { unlockPack } from "@/state/packsReducer";
import { AppDispatch, RootState } from "@/state/store";
import { Pack } from "@/types";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  YStack,
  Card,
  CardProps,
  Text,
  Button,
  XStack,
  Image,
  View,
} from "tamagui";

const props: CardProps = {
  animation: "bouncy",
  size: "$5",
  scale: 0.9,
  hoverStyle: { scale: 0.925 },
  pressStyle: { scale: 0.875 },
  height: "30%",
  width: "100%",
  bordered: true,
  backgroundColor: colors_new.dark_red,
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
};
/* Currently, each pack has the same bg, which is okay since there is only one pack. When more are implemented, I will switch to hosting the backgrounds
as well and providing the bg urls for each pack from the backend. But for now it's fine. I'm not really certain about the color choices and will work on that.
*/
const StoreView = () => {
  const packs: Pack[] = useSelector((state: RootState) => state.packs.packs);
  const dispatch: AppDispatch = useDispatch();
  const unlockedPacks: string[] | undefined = useSelector(
    (state: RootState) => state.account.user?.packs
  );
  const { t, i18n } = useTranslation();

  const redeem = (pack: Pack) => {
    dispatch(unlockPack(pack.id));
  };

  const storeCards = packs.map((pack) => {
    const unclocked = unlockedPacks && unlockedPacks.includes(pack.id);
    const paid = pack.paid;
    return (
      <Card {...props} key={pack.id}>
        <Card.Background>
          <Image
            source={{ uri: require("@/assets/images/pack-1-bg.png") }}
            width="100%"
            height="100%"
            borderRadius={10}
          />
        </Card.Background>
        <Card.Header padded>
          <Text fontFamily="Fair-Prosper" fontSize="$6" color={colors.white}>
            {i18n.language === "fi" ? pack.name_fi : pack.name}
          </Text>
        </Card.Header>
        <Card.Footer padded>
          <XStack
            gap="$5"
            justifyContent="flex-start"
            alignItems="center"
            flex={1}
            padding="$3"
          >
            <YStack marginRight="$10" justifyContent="center">
              <Text fontFamily="Montserrat" fontSize="$8">
                {t("price")}:
              </Text>
              <Text fontFamily="Montserrat" fontSize="$6">
                {pack.paid ? "4,99" : t("free")}
              </Text>
            </YStack>

            <Button
              backgroundColor={
                unclocked ? colors_new.dirty_white : colors_new.brown
              }
              animation="100ms"
              disabled={unclocked}
              borderWidth="$0.25"
              borderColor={colors_new.beige}
              onPress={() => redeem(pack)}
            >
              <Text
                fontFamily="Montserrat"
                color={unclocked ? colors_new.black : colors_new.dirty_white}
                fontSize="$6"
              >
                {unclocked ? t("owned") : paid ? t("purchase") : t("claim")}
              </Text>
            </Button>
          </XStack>
        </Card.Footer>
      </Card>
    );
  });

  return (
    <YStack
      padding="$2"
      backgroundColor={colors_new.beige}
      width="100%"
      height="100%"
      alignItems="center"
    >
      {storeCards}
    </YStack>
  );
};

export default StoreView;
