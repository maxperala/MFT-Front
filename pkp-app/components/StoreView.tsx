import colors from "@/colors";
import { unlockPack } from "@/state/packsReducer";
import { AppDispatch, RootState } from "@/state/store";
import { Pack } from "@/types";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { YStack, Card, CardProps, Text, Button, XStack } from "tamagui";

const props: CardProps = {
  animation: "bouncy",
  size: "$5",
  scale: 0.9,
  hoverStyle: { scale: 0.925 },
  pressStyle: { scale: 0.875 },
  height: "30%",
  width: "100%",
  bordered: true,
  backgroundColor: colors.warm_red,
  shadowOffset: { width: 1, height: 2 },
  shadowOpacity: 0.5,
  shadowRadius: 2,
};

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

  const storeCards = packs.map((pack) => (
    <Card {...props} key={pack.id}>
      <Card.Header padded>
        <Text fontFamily="Fair-Prosper" fontSize="$6" color={colors.white}>
          {i18n.language === "fi" ? pack.name_fi : pack.name}
        </Text>
      </Card.Header>
      <Card.Footer padded>
        <XStack
          gap="$5"
          justifyContent="flex-end"
          alignItems="center"
          flex={1}
          padding="$4"
        >
          <YStack marginRight="$10">
            <Text fontFamily="Montserrat" fontSize="$8">
              {t("price")}:
            </Text>
            <Text fontFamily="Montserrat" fontSize="$6">
              {pack.paid ? "4,99" : t("free")}
            </Text>
          </YStack>

          {unlockedPacks && unlockedPacks.includes(pack.id) ? (
            <Text color={colors.white} fontFamily="Montserrat" fontSize="$5">
              {t("owned")}
            </Text>
          ) : (
            <Button
              backgroundColor={colors.yellow}
              animation="100ms"
              onPress={() => redeem(pack)}
            >
              <Text fontFamily="Montserrat" color={colors.black} fontSize="$6">
                {pack.paid ? t("purchase") : t("claim")}
              </Text>
            </Button>
          )}
        </XStack>
      </Card.Footer>
    </Card>
  ));

  return (
    <YStack
      padding="$2"
      backgroundColor={colors.amber}
      width="100%"
      height="100%"
      alignItems="center"
    >
      {storeCards}
    </YStack>
  );
};

export default StoreView;
