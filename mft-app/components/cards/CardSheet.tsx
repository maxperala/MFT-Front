/**
 * Card Sheet Component
 *
 * A bottom sheet modal component that displays detailed postcard information
 * with customized behavior for different platforms (iOS/Android).
 *
 * Features:
 * - Platform-specific gesture handling
 * - Customizable snap points (50% and 90%)
 * - Dynamic loading state with spinner
 * - Redux integration for state management
 * - Styled bottom sheet with custom handle
 *
 * @component
 */
import { AppDispatch } from "@/state/store";
import { useDispatch } from "react-redux";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleSheet, Platform } from "react-native";
import { useMemo } from "react";
import { setActive } from "@/state/cardsReducer";
import CardView from "../views/CardView";
import { colors } from "@/colors";
import { Spinner } from "tamagui";
import { Postcard } from "@/types";
// This is, for now, the best I can do with this extremely buggy and laggy bottomsheet library. I will come back to this.
const CardSheet = ({ card }: { card: Postcard }) => {
  const dispatch: AppDispatch = useDispatch();
  const snapPoints = useMemo(() => ["50%", "90%"], []);
  const enablePanningGesture = Platform.OS === "android" ? false : true;
  const closeModal = () => {
    dispatch(setActive(null));
  };
  if (!card) return;

  return (
    <BottomSheet
      snapPoints={snapPoints}
      onClose={closeModal}
      index={1}
      bottomInset={5}
      detached={true}
      enablePanDownToClose
      handleStyle={{
        backgroundColor: colors.beige,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        marginBottom: 1,
        height: 35,
      }}
      enableContentPanningGesture={enablePanningGesture}
      enableDynamicSizing={false}
    >
      <BottomSheetView style={styles.container}>
        {card ? (
          <CardView card={card} />
        ) : (
          <Spinner size="large" color={colors.yellow} />
        )}
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.dirty_white,
    zIndex: 100,
  },
});

export default CardSheet;
