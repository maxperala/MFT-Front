import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text } from "tamagui";
import { StyleSheet } from "react-native";
import { useRef } from "react";
import { setActive } from "@/state/cardsReducer";

const CardSheet = () => {
  const card = useSelector((state: RootState) => state.cardData.active);
  const dispatch: AppDispatch = useDispatch();
  const sheetRef = useRef<BottomSheet>(null);
  const closeModal = () => {
    dispatch(setActive(null));
  };

  return (
    <BottomSheet
      snapPoints={["50%", "90%"]}
      onClose={closeModal}
      index={card ? 0 : -1}
      ref={sheetRef}
      bottomInset={20}
      detached={true}
      enablePanDownToClose
    >
      <BottomSheetView style={styles.container}>
        <Text>{card ? card.title : "None"}</Text>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CardSheet;
