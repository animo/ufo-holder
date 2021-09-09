import type { ImageSourcePropType } from 'react-native'

//logo: require('@internal/assets/images/logo.png'),
const _images = {}

type ImagesKeys = keyof typeof _images

export const images: ThemeImages = _images

export type ThemeImages = { [key in ImagesKeys]: ImageSourcePropType }
