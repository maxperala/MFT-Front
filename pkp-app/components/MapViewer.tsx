import { View, Text, StyleSheet } from "react-native";
import MapView, { UrlTile, Region } from "react-native-maps";
import { useState } from "react";

// this will be integrated to backend ASAP
const tileUrl = `URL WITH KEY HERE`;

const initialRegion: Region = {
  latitude: 61.49627200720432,
  latitudeDelta: 0.0024941467711343535,
  longitude: 23.731862215263078,
  longitudeDelta: 0.0030575974175732767,
};

const MapViewer = () => {
  const [region, setRegion] = useState<Region>(initialRegion);
  const updateRegion = (region: Region) => {
    console.log(region);
    setRegion(region);
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onRegionChangeComplete={updateRegion}
        showsPointsOfInterest={false}
        showsUserLocation={true}
      >
        <UrlTile urlTemplate={tileUrl} shouldReplaceMapContent={true} />
      </MapView>
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
  },
  tileContainer: {
    flex: 1,
    backgroundColor: "black",
  },
});

export default MapViewer;
