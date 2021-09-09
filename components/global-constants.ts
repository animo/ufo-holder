/**
 * Base size value
 */
const size = 16

export const colorInk = '#000000'
export const colorGhost = '#FFFFFF'

export const sizes = {
  xs: size * 0.25,
  s: size * 0.5,
  m: size * 0.75,
  l: size * 1.5,
  xl: size * 2,
  xxl: size * 2.5,
  xxxl: size * 3,
}

export const tabBarHeight = sizes.xxxl * 1.2

export const prettySize = {
  tiny: sizes.xs,
  small: sizes.s,
  medium: sizes.m,
  large: sizes.l,
  xlarge: sizes.xl,
  xxlarge: sizes.xxl,
}

// https://type-scale.com based loosely on major third
export const fontSize = {
  xs: size * 0.75,
  s: size * 0.85,
  m: size * 1.125,
  l: size * 1.25,
  xl: size * 1.75,
  xxl: size * 2.25,
  xxxl: size * 2.5,
}

export const borderWidthThin = 1

export const borderRadius = {
  s: size * 0.25,
  m: size * 0.5,
  l: size * 0.75,
}

export const paddingSize = {
  s: sizes.s * 0.5,
  m: sizes.m * 0.5,
  l: sizes.l * 0.5,
  xl: sizes.xl * 0.5,
}

export const marginSize = {
  s: sizes.s * 0.5,
  m: sizes.m * 0.5,
  l: sizes.l * 0.5,
  xl: sizes.xl * 0.5,
}

export const avatarSize = {
  s: size * 2,
  m: size * 3,
  l: size * 4,
  xl: size * 5,
}

export const badgeSize = {
  xs: size * 0.75,
  s: size * 0.85,
  m: size * 1.0,
  l: size * 1.0,
  xl: size * 1.0,
  xxl: size * 1.0,
  xxxl: size * 1.0,
}

// TODO: What do we do with this?
export const colors = {
  transparent: 'rgba(0,0,0,0)',
  inputBackground: '#FFFFFF',
  white: '#ffffff',
  text: '#212529',
  primary: '#E14032',
  secondary: 'green',
  success: '#28a745',
  error: '#dc3545',
}

// TODO: What do we do with this?
export const fontColors = {
  text: 'red',
  title: 'red',
  primary: 'red',
  accent: 'red',
  success: 'red',
  warning: 'red',
  danger: 'red',
}

export type FontSizes = typeof fontSize
export type PrettySizes = typeof prettySize
export type Sizes = typeof sizes
export type PaddingSizes = typeof paddingSize
export type MarginSizes = typeof marginSize
export type AvatarSizes = keyof typeof avatarSize
export type BadgeSizes = keyof typeof badgeSize
