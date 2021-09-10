import 'react-native-gesture-handler'

// Polyfills for AFJ in React Native
import 'react-native-get-random-values'

import { AppRegistry } from 'react-native'

import { name as appName } from './app.json'

// eslint-disable-next-line @typescript-eslint/no-var-requires
AppRegistry.registerComponent(appName, () => require('./src/App').App)
