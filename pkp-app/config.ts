import postal_data from "@/assets/mapping/postal_data.json";
import { PostCodeInfo } from "./types";
import wellknown from "wellknown";
import { multiPolygon } from "@turf/helpers";
import i18n from "@/utils/i18n";
import * as Clipboard from "expo-clipboard";
import { Alert } from "react-native";
import { AppDispatch } from "./state/store";
import { ActionCreator } from "@reduxjs/toolkit";

export const POST_CODE_DATA: PostCodeInfo[] = postal_data.codes
  .map((info) => {
    const p = wellknown.parse(info.poly);
    if (p?.type === "MultiPolygon") {
      return { ...info, poly: multiPolygon(p.coordinates) };
    }
    return { ...info, poly: null };
  })
  .filter((p) => p.poly != null);

// Safe to expose. This is also included in the built app.
export const MAPBOX_PUBLIC_KEY =
  "pk.eyJ1IjoibWF4cGVyYWxhIiwiYSI6ImNtNHBzNWh2MzBuZGsya3MzZGRjNHJnZWIifQ.AfbjHIYVmWRjayhMqyS_0A";
export const BACKEND_BASE = "https://service.tampere.app";
export const BACKEND_URL = `${BACKEND_BASE}/api`;
export const MAPBOX_STYLE_URL =
  "mapbox://styles/maxperala/cm4ptcmi2008q01r3hltl9i8u";

// I don't think this is used for anything
export const CDN_URL = BACKEND_BASE;

// At what level the markers are revealed
export const REVEAL_ZOOM_LEVEL = 13;

// These are the bounds for the mappack and the mapview. Point is to force the user to use locally available tiles to limit the api requests. UPDATE: local not possible :(
// Pretty good box. When zoomed fully out it's about the centrum of Tampere.
export const BOUNDS: [GeoJSON.Position, GeoJSON.Position] = [
  [24.246317, 61.78],
  [23.311911, 61.25],
];

export const centerCoordinate = [23.73252, 61.49613];

export const DISCOVER_RANGE = 80;

export const AVAILABLE_LANGUAGES = i18n.languages;

export const PRIVACY_POLICY = {
  fi: `${BACKEND_BASE}/documents/privacy_policy_fi.html`,
  en: `${BACKEND_BASE}/documents/privacy_policy_en.html`,
};

export const INFO_URL = {
  fi: `${BACKEND_BASE}/documents/info_fi.html`,
  en: `${BACKEND_BASE}/documents/info_en.html`,
};

// Thsese should really be their own file.
const finnishClipboardAlert = () => {
  Alert.alert("Kopioitu", "Kirjautumiskoodi kopioitu leikepöydälle");
};

const englishClipboardAlert = () => {
  Alert.alert("Copied", "Login token copied to clipboard");
};

export const finnishDeleteAlert = (
  dispatch: AppDispatch,
  fn: ActionCreator<any, any>
) => {
  Alert.alert("Tilin poistaminen", "Haluatko varmasti poistaa tilisi?", [
    {
      text: "Kyllä",
      onPress: () => dispatch(fn()),
    },
    { text: "Ei", onPress: () => null },
  ]);
};

export const englishDeleteAlert = (
  dispatch: AppDispatch,
  fn: ActionCreator<any, any>
) => {
  Alert.alert(
    "Delete your account",
    "Are you sure you want to delete your account?",
    [
      {
        text: "Yes",
        onPress: () => dispatch(fn()),
      },
      { text: "No", onPress: () => null },
    ]
  );
};

Clipboard.addClipboardListener(() => {
  if (i18n.language === "fi") {
    finnishClipboardAlert();
  } else {
    englishClipboardAlert();
  }
});
