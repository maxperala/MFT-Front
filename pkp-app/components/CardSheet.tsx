import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import BottomSheetModal, { BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleSheet } from "react-native";
import { useEffect, useMemo, useRef } from "react";
import { setActive } from "@/state/cardsReducer";
import CardView from "./CardView";
import { colors } from "@/colors";
import { Spinner } from "tamagui";

const CardSheet = () => {
  const card = useSelector((state: RootState) => state.cardData.active);
  const dispatch: AppDispatch = useDispatch();
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["90%"], []);
  const closeModal = () => {
    dispatch(setActive(null));
  };

  useEffect(() => {
    if (card) {
      sheetRef.current?.snapToIndex(0);
    }
  }, [card]);

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      onClose={closeModal}
      index={-1}
      bottomInset={10}
      ref={sheetRef}
      detached={true}
      enablePanDownToClose
      handleStyle={{
        backgroundColor: colors.amber,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        marginBottom: 1,
        height: 35,
      }}
    >
      <BottomSheetView style={styles.container}>
        {card ? (
          <CardView card={card} />
        ) : (
          <Spinner size="large" color={colors.yellow} />
        )}
        ;
      </BottomSheetView>
    </BottomSheetModal>
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
