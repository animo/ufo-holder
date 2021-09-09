# Mobile Agent React Native

## Prerequisites

Fist make sure you have the your environment set up correctly.

- [React Native Dev Setup](https://reactnative.dev/docs/environment-setup)
- [Node V12](https://nodejs.org)

> Node V12 is required for aries-framework-javascript

## Installation

```sh
yarn install
```

### iOS

```sh
pod install --project-directory=ios/
```

> The current build of indy (`Indy.framework`) that is currently included in this repository does not support simulator architectures. Therefore the mobile app can only be run on **physical iOS devices** at the moment. Android does not have this limitation.

## Hermes

This project makes use of the new Hermes JavaScript engine for both iOS and Android. See the [Hermes documentation](https://reactnative.dev/docs/hermes) for more information.

> Indy does not work on React Native versions > 0.61.5 without Hermes enabled. Therefore it is important to keep Hermes enabled.

## Flipper

This project makes use of Flipper for development and debugging. This is supported out of the box for debug builds. The only thing you need to do is install the [Flipper desktop app](https://fbflipper.com/).

For running on iOS physical devices you need to install the [facebook IDB tool](https://github.com/facebook/idb) (see Github Project for most up-to-date install instructions):

```sh
brew tap facebook/fb
brew install idb-companion
pip3.6 install fb-idb
```

## iOS

> TODO: support iOS 12
