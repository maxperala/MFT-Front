# Memories From Tampere - Frontend

>If you just want to test the app, refer to the instructions in the [main repo](https://github.com/maxperala/MFT-Public), there you can find prebuilt binaries as well as links to the App Store

This repository contains the frontend code for the Memories From Tampere project. Currently, only the mobile app is implemented and this document focuses on that. The app runs on both iOS and android, but the iOS version is the priority.

*The app is not compatible with Expo GO!*

## Installing

Before you continue, building the app requires a Mapbox private key with atleast a download scope. You can get this for free from [mapbox.com](mapbox.com).

### Setting up project

1. Clone the repo
2. Navigate to mft-app
3. Run ```npm install```
4. Create a .env file containing your mapbox private key with the name ```MAPBOX_SECRET```.
5. You are set!

### Running on Android

Set up android studio and build tools before continuing. If you need help, refer to the [Expo documentation](https://docs.expo.dev/get-started/set-up-your-environment/)

#### Development build

1. Run ```npm run prebuild``` to create a native android project
2. You can then use ```npm run android``` to start building the development build
3. Launch expo dev server with ```npm start```

#### Standalone build

1. Run ```npm run prebuild``` to create a native android project
2. Open the project in android studio, set build profile to ```release```
3. Build an APK or to a device

### Running on iOS

Set up Xcode and install command line build tools. If you need help, refer to the [Expo documentation](https://docs.expo.dev/get-started/set-up-your-environment/)

#### Development build

1. Run ```npm run prebuild```to create a native Xcode project.
2. You can then use ```npm run ios```to start building the development build
3. Launch expo dev server with ```npm start``` 

#### Standalone build

1. Run ```npm run prebuild```to create a native Xcode project.
2. Open the project in Xcode, setup certification under ```Signing & Capabilities```
3. Edit the Schema build configuration to be ```Release```
4. Build the project

## Notes

Using the app requires for the user to be in a specific location. You can find suggestions for location spoofing in the  [main repo](https://github.com/maxperala/MFT-Public). The app does not work well with Xcode iOS simulators location spoofing, especially when changing locations mid-session.

The app is preconfigured to point to the backend running at ```service.tampere.app```. You are free to use that but if you host your own backend you need to change ```BACKEND_BASE```under ```config.ts```.

This repository used to contain a Mapbox public key, which is supposed to be safe to expose. In the current version of the app the key is provided by the backend and the key found in this repo is no longer active.
