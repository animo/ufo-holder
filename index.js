import 'react-native-gesture-handler'

// Polyfills for AFJ in React Native
import 'react-native-get-random-values'

import { STORYBOOK_APP } from '@env'
import { AppRegistry } from 'react-native'

import { name as appName } from './app.json'

const isStorybookApp = STORYBOOK_APP === 'true'

AppRegistry.registerComponent(appName, () =>
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  isStorybookApp ? require('./storybook').default : require('./src/App').App
)
