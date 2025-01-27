import { View, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Marker from "./Marker";
import { BOUNDS, REVEAL_ZOOM_LEVEL } from "@/config";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/state/store";
import Mapbox from "@rnmapbox/maps";
import { useLocation } from "@/utils/hooks";
import { setMapHeading, setMapLoading } from "@/state/locationReducer";
import { Platform } from "react-native";
import { debounce } from "lodash";
/**
 * There is an issue with the Mapbox library version 10.1.33 and ios 17.X currently.
 * The user location causes an error and weird behaviour. So we use expo-location for the actual location
 * functionality of the app trough useLocation custom hook. But we can still render the Mapbox.LocationPuck component, without errors
 * so we use that. Idk how it is working while UserLocation is not, but we use it like this for now.
 */

// These are public api keys, and can be exposed. They just provide access to the right style of map
import { MAPBOX_STYLE_URL, centerCoordinate } from "@/config";

import { colors_new } from "@/colors";
import { Postcard } from "@/types";

const MapViewerMapbox = () => {
  const dispatch: AppDispatch = useDispatch();
  const accessToken = useSelector(
    (state: RootState) => state.account.user?.mapkey
  );
  const mapRef = useRef<Mapbox.Camera>(null);
  // DON'T REMOVE THIS, IT WILL BREAK THE APP ON IOS!! ** The map needs to rerender after loading the first time for it to emit any data. So we force a rerender when the map itself states it's ready **
  const _ready = useSelector((state: RootState) => state.location.mapLoading);
  const cards = useSelector((state: RootState) => state.cardData.cards);
  useEffect(() => {
    if (accessToken) {
      Mapbox.setAccessToken(accessToken);
    }
  }, [accessToken]);

  const [showMarkers, setShowMarkers] = useState(false);
  const [ready, setReady] = useState(false);

  useLocation();
  const defaultSettings: Mapbox.CameraStop = {
    centerCoordinate: centerCoordinate,
    zoomLevel: 14,
  };
  // Debouce to improve performance on lower-end devices, especially android
  const updateHeadingAndZoom = debounce((e: Mapbox.MapState) => {
    if (!ready) {
      setMapReady();
    }
    if (e.properties.zoom > REVEAL_ZOOM_LEVEL && !showMarkers) {
      setShowMarkers(true);
    } else if (e.properties.zoom < REVEAL_ZOOM_LEVEL && showMarkers) {
      setShowMarkers(false);
    }
    dispatch(setMapHeading(e.properties.heading));
  }, 200);
  // This is because sometimes, for some unknown reason none of the map ready events fire on android. This works for now.
  const setMapReady = () => {
    setReady(true);
    mapRef.current?.setCamera(defaultSettings);
    dispatch(setMapLoading(false));
  };

  const MemoMarker = React.memo(({ card }: { card: Postcard }) => {
    return (
      <Mapbox.MarkerView
        coordinate={[card.location.lon, card.location.lat]}
        key={card.id}
        allowOverlap={true}
        allowOverlapWithPuck={true}
      >
        <Marker card={card} />
      </Mapbox.MarkerView>
    );
  });

  const markers = useMemo(() => {
    if (cards && showMarkers) {
      return cards.map((card) => <MemoMarker card={card} key={card.id} />);
    }
  }, [cards, showMarkers]);

  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        styleURL={MAPBOX_STYLE_URL}
        compassEnabled={false}
        // Compass won't disable on iOS, so I hid it. THERE IS A COMMIT NOW TO FIX THIS, WE WAIT FOR A RELEASE
        compassPosition={{ top: -50, left: -50 }}
        scaleBarEnabled={false}
        // The first one works on ios but not android. Thus the second one lol
        onDidFinishLoadingStyle={
          Platform.OS === "android" ? setMapReady : () => null
        }
        onDidFinishLoadingMap={Platform.OS === "ios" ? setMapReady : () => null}
        onCameraChanged={updateHeadingAndZoom}
      >
        <Mapbox.Camera
          maxBounds={{ ne: BOUNDS[0], sw: BOUNDS[1] }}
          ref={mapRef}
          defaultSettings={defaultSettings}
        />

        <Mapbox.LocationPuck
          pulsing={{ isEnabled: true, color: colors_new.dark_red }}
        />

        {markers}
      </Mapbox.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    backgroundColor: "black",
    alignContent: "stretch",
  },
  tileContainer: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default MapViewerMapbox;
