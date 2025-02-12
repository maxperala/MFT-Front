import { View, Text, StyleSheet } from "react-native";
import MapContainer from "@/components/MapContainer";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { useEffect } from "react";
import { getCards } from "@/state/cardsReducer";
const mapScreen = () => {
  const dispatch: AppDispatch = useDispatch();
  const postcards = useSelector((state: RootState) => state.cardData.cards);
  const token = useSelector((state: RootState) => state.account.user?.token);
  useEffect(() => {
    if (token) {
      dispatch(getCards(token));
    }
  }, [token]);

  if (!postcards) {
    return <View></View>;
  }

  return (
    <View style={style.container}>
      <MapContainer />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default mapScreen;
