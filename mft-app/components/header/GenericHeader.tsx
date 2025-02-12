/**
 * Generic Header Component
 *
 * A reusable header component that displays a title with fade-in animation
 * and consistent styling across the application.
 *
 * Features:
 * - Animated title with fade-in effect
 * - Consistent height and styling
 * - Shadow effects for depth
 * - Custom font integration
 * - Centered text alignment
 * - Theme-based color scheme
 *
 * @component
 */
import { StyleSheet, View } from "react-native";
import { colors } from "@/colors";
import Animated, { FadeIn } from "react-native-reanimated";

const GenericHeader = ({ title }: { title: string }) => {
  return (
    <View style={style.container}>
      <Animated.Text style={style.text} entering={FadeIn.duration(1000)}>
        {title}
      </Animated.Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    shadowOffset: { width: 1, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.3,
    elevation: 8,

    backgroundColor: colors.red,
  },
  text: {
    fontSize: 20,
    color: colors.dirty_white,
    fontFamily: "Fair-Prosper",
    textShadowOffset: { width: 2, height: 3 },
    textShadowRadius: 3,
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 4,
    shadowOpacity: 0.5,
    letterSpacing: 2,
  },
});

export default GenericHeader;
