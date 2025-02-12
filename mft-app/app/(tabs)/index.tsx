/**
 * Map Screen Component
 *
 * Main map view of the application that displays postcards on a map interface.
 *
 * Features:
 * - Fetches postcard data when user token is available
 * - Displays loading state when postcards are not yet loaded
 * - Renders MapContainer component with postcard data
 *
 * State Management:
 * - Uses Redux for postcards and user token management
 * - Dispatches getCards action when token becomes available
 *
 * @component
 */
import { View, StyleSheet } from "react-native";
import MapContainer from "@/components/views/map/MapContainer";
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
