import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { useEffect, useMemo, useState } from "react";
import { Coords } from "@/types";
import { calculateDistance } from "@/utils/location/locationUtils";
import { discoverCards } from "@/state/userReducer";

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
  const [prev, setPrev] = useState<Coords>({ lat: 0, lon: 0, heading: 0 });
  const dispatch: AppDispatch = useDispatch();
  if (!undiscovered.length) return;
  useEffect(() => {
    if (location && token && undiscovered) {
      const dist = calculateDistance(location, prev);
      if (dist < 10) return;
      setPrev(location);
      dispatch(discoverCards(undiscovered, location, token));
    }
  }, [location, token, undiscovered]);
};
