// TODO: use nativebases scaling (this does not work)
/**
 * Base size value
 */
const size = 16

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
  xxl: sizes.xxl * 0.5,
}

export const marginSize = {
  s: sizes.s * 0.5,
  m: sizes.m * 0.5,
  l: sizes.l * 0.5,
  xl: sizes.xl * 0.5,
}

export const avatarSize = {
  s: size * 0.5,
  m: size * 1,
  l: size * 1.5,
  xl: size * 2,
}

export const iconSize = {
  s: size * 1,
  m: size * 2,
  l: size * 2.5,
  xl: size * 4,
  xxl: size * 5,
  xxxl: size * 6,
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

export type FontSizes = keyof typeof fontSize
export type PrettySizes = typeof prettySize
export type Sizes = typeof sizes
export type PaddingSizes = typeof paddingSize
export type MarginSizes = typeof marginSize
export type AvatarSizes = keyof typeof avatarSize
export type BadgeSizes = keyof typeof badgeSize
export type IconSizes = keyof typeof iconSize
