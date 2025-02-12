/**
 * Total Found Calculation Component
 *
 * Displays the total number of cards found by the user compared to the total
 * available cards, with a visual discovered marker icon.
 *
 * Features:
 * - Redux integration for card data
 * - Current/total cards counter display
 * - Custom styling with opacity effects
 * - Discovered marker icon integration
 * - Responsive layout with flex positioning
 * - Consistent theme-based styling
 *
 * @component
 */
import { RootState } from "@/state/store";
import { Image, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import CurrentSlashTotalCards from "../header/CurrentSlashTotalCards";
import { colors } from "@/colors";

const TotalFoundCalculation = () => {
  const totalCards = useSelector((state: RootState) => state.cardData.cards);
  const found = useSelector((state: RootState) => state.account.user?.unlocked);

  return (
    <View style={style.container}>
      <View style={style.textContainer}>
        <CurrentSlashTotalCards
          current={found ? found.length : 0}
          total={totalCards ? totalCards.length : 0}
          color={colors.dirty_white}
          size="$8"
          font="Fair-Prosper"
        />
      </View>

      <Image
        source={require("@/assets/images/discovered-marker-white.png")}
        style={{ width: 50, height: 50, paddingRight: 5 }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    opacity: 0.9,
    paddingBottom: "2%",
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    height: 50,
  },
});

export default TotalFoundCalculation;
