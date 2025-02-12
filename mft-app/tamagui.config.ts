import { config } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";
/*
A note here. I will never use Tamagui again. It is sparingly used in this project,
and will probably be replaced with just normal StyleSheet or another styling library.
Tamagui is extremely buggy and packages very often come with breaking changes!
*/
export const tamaguiConfig = createTamagui(config);

export default tamaguiConfig;

type Conf = typeof tamaguiConfig;
declare module "@tamagui/core" {
  interface TamaguiCustomConfig extends Conf {}
}
