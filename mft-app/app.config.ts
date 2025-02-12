import "dotenv/config";

export default {
  expo: {
    name: "Tampere",
    slug: "memories-from-tampere",
    version: "0.7.2",
    orientation: "portrait",
    owner: "maxperala",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    platforms: ["ios", "android"],
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: false,
      bundleIdentifier: "com.maxperala.mft",
      infoPlist: {
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: false,
          NSAllowsLocalNetworking: true,
          CFBundleAllowMixedLocalizations: true,
          NSLocationWhenInUseUsageDescription:
            "Allow location access to explore historical sites nearby and unlock new content based on your current location.",
          NSLocationUsageDescription:
            "Allow location access to explore historical sites nearby and unlock new content based on your current location.",
        },
      },
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/logo.png",
        backgroundColor: "#AE2012",
      },
      permissions: [
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
      ],
      package: "com.maxperala.mft",
    },
    locales: {
      fi: "./locales/fi.json",
      en: "./locales/en.json",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/logo.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#AE2012",
        },
      ],
      [
        "expo-build-properties",
        {
          ios: {
            deploymentTarget: "15.1",
          },
        },
      ],
      ["expo-location"],
      [
        "expo-font",
        {
          fonts: [
            "./assets/fonts/Fair-Prosper.ttf",
            "./assets/fonts/SpecialElite-Regular.ttf",
            "./assets/fonts/Montserrat.ttf",
            "./assets/fonts/MarckScript-Regular.ttf",
          ],
        },
      ],
      "@maplibre/maplibre-react-native",
      "expo-build-properties",
      [
        "@rnmapbox/maps",
        {
          RNMapboxMapsDownloadToken: process.env.MAPBOX_SECRET,
        },
      ],
      "expo-localization",
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: { projectId: "cf4c528f-5c1b-423b-9272-17bac71f2ba5" },
    },
  },
};
