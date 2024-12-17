import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { useEffect, useMemo, useRef } from "react";
import { Coords } from "@/types";
import { calculateDistance } from "@/utils/location/locationUtils";
import { discoverCards } from "@/state/userReducer";

// This is a problem. Causes unecessary rerenders. I will deal with this. FIXED, THIS IS DEPRICIATED!!
export const useDiscover = () => {
  const location = useSelector((state: RootState) => state.location.coords);
  const discovered = useSelector(
    (state: RootState) => state.account.user?.unlocked
  );
  const allCards = useSelector((state: RootState) => state.cardData.cards);
  const token = useSelector((state: RootState) => state.account.user?.token);
  // This will make it more efficent by not running the filter every time
  const undiscovered = useMemo(
    () => allCards?.filter((card) => !discovered?.includes(card.id)) || [],
    [allCards, discovered]
  );
  const prev = useRef<Coords>({ lat: 0, lon: 0, heading: 0 });
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    if (location && token && undiscovered) {
      const dist = calculateDistance(location, prev.current);
      if (dist < 10) return;
      prev.current = location;
      dispatch(discoverCards(undiscovered, location, token));
    }
  }, [location, token, undiscovered]);
};
