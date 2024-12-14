import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { useEffect, useState } from "react";
import { discoverCards } from "@/state/userReducer";
import { Coords } from "@/types";
import { calculateDistance } from "@/utils/location/locationUtils";

export const useDiscover = () => {
  const location = useSelector((state: RootState) => state.location.coords);
  const cards = useSelector((state: RootState) => state.cardData.cards);
  const token = useSelector((state: RootState) => state.account.user?.token);
  const [prev, setPrev] = useState<Coords>({ lat: 0, lon: 0, heading: 0 });
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (cards && location && token) {
      const dist = calculateDistance(location, prev);
      if (dist < 10) return;
      setPrev(location);

      dispatch(discoverCards(cards, location, token));
    }
  }, [location]);
};
