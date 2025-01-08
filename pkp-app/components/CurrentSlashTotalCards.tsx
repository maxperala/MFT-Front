import { colors_new } from "@/colors";
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
        color={color ? color : colors_new.black}
      >
        {current}/{total}
      </Text>
    </XStack>
  );
};

export default CurrentSlashTotalCards;
