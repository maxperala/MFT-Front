import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text } from "tamagui";
import { StyleSheet } from "react-native";
import { useEffect, useRef } from "react";
import { setActive } from "@/state/cardsReducer";
import CardView from "./CardView";
import { colors } from "@/colors";

const CardSheet = () => {
  const card = useSelector((state: RootState) => state.cardData.active);
  const dispatch: AppDispatch = useDispatch();
  const sheetRef = useRef<BottomSheet>(null);
  const closeModal = () => {
    dispatch(setActive(null));
  };

  useEffect(() => {
    if (card) {
      sheetRef.current?.snapToIndex(1);
    }
  }, [card]);

  return (
    <BottomSheet
      snapPoints={["50%", "90%"]}
      onClose={closeModal}
      index={-1}
      ref={sheetRef}
      bottomInset={20}
      detached={true}
      enablePanDownToClose
      handleStyle={{ backgroundColor: colors.white, borderRadius: 15 }}
    >
      <BottomSheetView style={styles.container}>
        <CardView card={card ? card : null}></CardView>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    zIndex: 100,
    paddingBottom: 10,
  },
});

export default CardSheet;
