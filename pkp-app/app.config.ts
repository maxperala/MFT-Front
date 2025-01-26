import "dotenv/config";

export default {
  expo: {
    name: "Tampere",
    slug: "memories-from-tampere",
    version: "0.6.2",
    orientation: "portrait",
    owner: "maxperala",
    icon: "./assets/images/logo_bg.jpg",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.maxperala.mft",
      infoPlist: {
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: false,
          NSAllowsLocalNetworking: true,
          CFBundleAllowMixedLocalizations: true,
          NSLocationWhenInUseUsageDescription:
            "The app requires your location to function",
          NSLocationUsageDescription:
            "The app requires your location to function",
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
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
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
