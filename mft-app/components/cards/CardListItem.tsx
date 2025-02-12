import { colors } from "@/colors";
import { RootState } from "@/state/store";
import { Postcard } from "@/types";
import { calculateDistance } from "@/utils/location/locationHelpers";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { XGroup, YGroup, Text, Image } from "tamagui";
import { useRouter } from "expo-router";

// This component is ugly. I need to design a proper style in figma and implement it later. Like this for now. VIP!!
const CardListItem = ({ card }: { card: Postcard }) => {
  const { t, i18n } = useTranslation();
  const unlockedCards = useSelector(
    (state: RootState) => state.account.user?.unlocked
  );
  const location = useSelector((state: RootState) => state.location.coords);
  const router = useRouter();

  const distance = location ? calculateDistance(card.location, location) : null;

  if (!unlockedCards?.includes(card.id)) {
    return (
      <TouchableOpacity
        style={{
          width: "100%",
          height: "15%",
          borderBottomWidth: 1,
          borderColor: colors.dirty_white,
        }}
      >
        <XGroup
          backgroundColor={colors.light_red}
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          height="100%"
          gap="$2"
          padding="$2"
          borderRadius={0}
        >
          <XGroup alignItems="center">
            <Image
              source={{
                uri: require("@/assets/images/marker-x-white.png"),
              }}
              width={70}
              height={70}
              shadowOffset={{ width: 2, height: 1 }}
              shadowRadius={3}
              shadowOpacity={0.5}
            />
            <YGroup gap="$2">
              <Text
                fontFamily="MarckScript-Regular"
                fontSize="$6"
                color={colors.dirty_white}
                textShadowOffset={{ width: 2, height: 1 }}
                textShadowRadius={3}
                shadowOffset={{ width: 2, height: 1 }}
                shadowRadius={3}
                shadowOpacity={0.7}
              >
                {t("undiscovered")}
              </Text>
              {distance ? (
                <Text
                  fontFamily="SpecialElite-Regular"
                  shadowOffset={{ width: 2, height: 1 }}
                  shadowRadius={3}
                  shadowOpacity={0.5}
                >
                  {t("distance")}: {Math.floor(distance)}m
                </Text>
              ) : null}
            </YGroup>
          </XGroup>
        </XGroup>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={{
        width: "100%",
        height: "40%",
        borderBottomWidth: 1,
        borderColor: colors.dirty_white,
      }}
      onPress={() => router.push(`/postcard/${card.id}`)}
    >
      <XGroup
        backgroundColor={colors.red}
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        height="100%"
        gap="$2"
        padding="$2"
        borderRadius={0}
      >
        <XGroup alignItems="center">
          <Image
            source={{
              uri: require("@/assets/images/discovered-marker-yellow.png"),
            }}
            width={70}
            height={70}
            shadowOffset={{ width: 2, height: 1 }}
            shadowRadius={3}
            shadowOpacity={0.5}
          />
          <YGroup gap="$2">
            <Text
              fontFamily="MarckScript-Regular"
              fontSize="$6"
              color={colors.dirty_white}
              textShadowOffset={{ width: 2, height: 1 }}
              textShadowRadius={3}
              shadowOffset={{ width: 2, height: 1 }}
              shadowRadius={3}
              shadowOpacity={0.7}
            >
              {i18n.language === "fi" ? card.title_fi : card.title_en}
            </Text>
            {distance ? (
              <Text
                fontFamily="SpecialElite-Regular"
                shadowOffset={{ width: 2, height: 1 }}
                shadowRadius={3}
                shadowOpacity={0.5}
              >
                {t("distance")}: {Math.floor(distance)}m
              </Text>
            ) : null}
          </YGroup>
        </XGroup>

        <Ionicons
          name="arrow-forward"
          size={30}
          color={colors.dirty_white}
          shadowOffset={{ width: 2, height: 1 }}
          shadowRadius={3}
          shadowOpacity={0.5}
        />
      </XGroup>
    </TouchableOpacity>
  );
};

export default CardListItem;
