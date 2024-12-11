import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
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

  // This is necessary. I don't know why but it is
  const setModalPos = (index: number) => {
    console.log(index);
    if (index != 1) {
      sheetRef.current?.close();
      closeModal();
    }
  };

  useEffect(() => {
    if (card) {
      sheetRef.current?.snapToIndex(1);
    }
  }, [card]);

  return (
    <BottomSheet
      snapPoints={["90%"]}
      onClose={closeModal}
      onChange={setModalPos}
      index={-1}
      ref={sheetRef}
      detached={false}
      enablePanDownToClose
      handleStyle={{
        backgroundColor: colors.amber,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        marginBottom: 1,
      }}
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
  },
});

export default CardSheet;
