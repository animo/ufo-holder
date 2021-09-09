import type { Theme } from '../types'

import { colorInk, colorGhost } from '../../global-constants'
import { relativeLuminanceW3C, tint, shade } from '../../utils'

const darkestShade = colorInk
const lightestShade = colorGhost
const lighterShade = shade(lightestShade, 1)

const getHighContrastText = (hex: string) => (relativeLuminanceW3C(hex) > 0.5 ? darkestShade : lightestShade)

const primary = '#71a9f7'
const secondary = '#3c5a85'

const accent = '#af7595'

const text = '#000000'
const textSubdued = '#AAAAAA'
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

const background = '#FFFFFF'
const bottomBarBackground = lighterShade
const backgroundShade = '#EEEEEE'

const border = '#222222'
const borderSubdued = tint(border, 75)
const card = '#FFFFFF'
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
