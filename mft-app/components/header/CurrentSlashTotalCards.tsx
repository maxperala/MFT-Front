/**
 * Current/Total Cards Counter Component
 *
 * Displays a fraction showing current card position out of total cards
 * with customizable styling options.
 *
 * Features:
 * - Customizable text color
 * - Adjustable font size and family
 * - Centered layout positioning
 * - Slash separator format (x/y)
 * - Flexible styling props
 *
 * @component
 */
import { colors } from "@/colors";
import { Text, XStack } from "tamagui";

const CurrentSlashTotalCards = ({
  current,
  total,
  color,
  size,
  font,
}: {
  current: number;
  total: number;
  color?: string;
  size?: string;
  font?: string;
}) => {
  return (
    <XStack justifyContent="center" alignItems="center" alignSelf="center">
      <Text
        fontFamily={font ? font : "SpecialElite-Regular"}
        fontSize={size ? size : "$3"}
        color={color ? color : colors.black}
      >
        {current}/{total}
      </Text>
    </XStack>
  );
};

export default CurrentSlashTotalCards;
