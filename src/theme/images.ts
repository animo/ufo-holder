/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { ImageSourcePropType } from 'react-native'

//logo: require('@internal/assets/images/logo.png'),
const _images = {
  pilot: require('@internal/assets/images/pilot.png'),
  credentials: require('@internal/assets/images/credentials.png'),
  feedback: require('@internal/assets/images/feedback.png'),
  legal: require('@internal/assets/images/legal.png'),
  location: require('@internal/assets/images/location.png'),
  noData: require('@internal/assets/images/no-data.png'),
  welcome: require('@internal/assets/images/welcome.png'),
}

type ImagesKeys = keyof typeof _images

export const images: ThemeImages = _images

export type ThemeImages = { [key in ImagesKeys]: ImageSourcePropType }
