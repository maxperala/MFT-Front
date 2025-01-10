import { AppDispatch, RootState } from "@/state/store";
import { useDispatch, useSelector } from "react-redux";
import BottomSheetModal, { BottomSheetView } from "@gorhom/bottom-sheet";
import { StyleSheet, Platform } from "react-native";
import {  useMemo, useRef } from "react";
import { setActive } from "@/state/cardsReducer";
import CardView from "./CardView";
import { colors_new, colors } from "@/colors";
import { Spinner } from "tamagui";
// This is, for now, the best I can do with this extremely buggy and laggy bottomsheet library. I will come back to this.
const CardSheet = () => {
  const card = useSelector((state: RootState) => state.cardData.active);
  const dispatch: AppDispatch = useDispatch();
  const sheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["90%"], []);
  const enablePanningGesture = Platform.OS === "android" ? false : true;
  const closeModal = () => {
    dispatch(setActive(null));
  };
  if (!card) return;

  return (
    <BottomSheetModal
      snapPoints={snapPoints}
      onClose={closeModal}
      index={0}
      bottomInset={5}
      ref={sheetRef}
      detached={true}
      enablePanDownToClose
      handleStyle={{
        backgroundColor: colors_new.beige,
        borderTopLeftRadius: 14,
        borderTopRightRadius: 14,
        marginBottom: 1,
        height: 35,
      }}
      enableContentPanningGesture={enablePanningGesture}
    >
      <BottomSheetView style={styles.container}>
        {card ? (
          <CardView card={card} />
        ) : (
          <Spinner size="large" color={colors.yellow} />
        )}
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
