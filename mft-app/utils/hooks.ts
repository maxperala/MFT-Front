import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import { useEffect, useRef } from "react";

import { discoverCards } from "@/state/userReducer";
import * as Location from "expo-location";
import { setUserLocation } from "@/state/locationReducer";

export const useLocation = () => {
  const dispatch: AppDispatch = useDispatch();
  const locationSub = useRef<Location.LocationSubscription | null>(null);
  const allowed = useSelector((state: RootState) => state.location.allowed);
  const startLocationUpdates = async () => {
    try {
      locationSub.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 2000,
          distanceInterval: 5,
        },
        (loc) => {
          dispatch(
            setUserLocation({
              coords: {
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude,
              },
            })
          );
          dispatch(discoverCards());
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (allowed) {
      startLocationUpdates();
    }

    return () => {
      if (locationSub.current) {
        locationSub.current.remove();
        locationSub.current = null;
      }
    };
  }, [allowed, dispatch]);
};
