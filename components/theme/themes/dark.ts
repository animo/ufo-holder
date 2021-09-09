import type { Theme } from '../types'

import { colorInk, colorGhost } from '../../global-constants'
import { relativeLuminanceW3C, tint } from '../../utils'

const darkestShade = colorInk
const darkerShade = tint(darkestShade, 5)
const lightestShade = colorGhost

const getHighContrastText = (hex: string) => (relativeLuminanceW3C(hex) > 0.5 ? darkestShade : lightestShade)

const primary = '#71a9f7'
const secondary = '#3c5a85'

const accent = '#af7595'

const text = 'white'
const textSubdued = '#E0E0E0'
const textSubduedDarker = '#979797'

const success = '#63d471'
const warning = '#f8bd4f'
const danger = '#d8464b'
const transparent = 'rgba(0,0,0,0)'

const textPrimary = getHighContrastText(primary)
const textSecondary = getHighContrastText(secondary)
const textSuccess = lightestShade
const textAccent = getHighContrastText(accent)
const textWarning = getHighContrastText(warning)
const textDanger = getHighContrastText(danger)

const background = '#151515'
const bottomBarBackground = darkerShade
const backgroundShade = '#303030'

const border = '#111111'
const borderSubdued = '#222222'
const card = '#222222'
const notification = '#394363'

const black = '#000000'
const white = '#FFFFFF'

export const theme: Theme = {
  colors: {
    darkestShade,
    lightestShade,

    primary,
    secondary,

    accent,

    text,
    textSubdued,
    textSubduedDarker,

    success,
    warning,
    danger,
    transparent,

    textPrimary,
    textSecondary,
    textSuccess,
    textAccent,
    textWarning,
    textDanger,

    background,
    bottomBarBackground,
    backgroundShade,

    border,
    borderSubdued,
    card,
    notification,

    black,
    white,
  },
}
