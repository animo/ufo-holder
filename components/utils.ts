import { colorInk, colorGhost } from './global-constants'

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) {
    throw new Error('Expected "hex" to be "#" followed by 6 hex characters')
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

/**
 * Convert a decimal value to hex
 */
function d2h(d: number) {
  return d.toString(16)
}

/**
 * Convert a hex value to decimal
 */
function h2d(h: string) {
  return parseInt(h, 16)
}

export function mix(color1: string, color2: string, weight: number) {
  color1 = color1.replace(/^#/g, '')
  color2 = color2.replace(/^#/g, '')
  let color = '#'

  for (let i = 0; i <= 5; i += 2) {
    // loop through each of the 3 hex pairs—red, green, and blue

    // extract the current pairs
    const v1 = h2d(color1.substr(i, 2)),
      v2 = h2d(color2.substr(i, 2))

    // combine the current pairs from each source color, according to the specified weight
    let val = d2h(Math.floor(v2 + (v1 - v2) * (weight / 100.0)))

    while (val.length < 2) {
      val = '0' + val
    } // prepend a '0' if val results in a single digit

    color += val // concatenate val to our new color string
  }

  return color // PROFIT!
}

export function shade(color: string, weight: number) {
  return mix(colorInk, color, weight)
}

export function tint(color: string, weight: number) {
  return mix(colorGhost, color, weight)
}

/**
 * See http://www.w3.org/TR/WCAG20/#relativeluminancedef
 */
export function relativeLuminanceW3C(hex: string) {
  const { r: r8bit, g: g8bit, b: b8bit } = hexToRgb(hex)
  const RsRGB = r8bit / 255
  const GsRGB = g8bit / 255
  const BsRGB = b8bit / 255

  const R = RsRGB <= 0.03928 ? RsRGB / 12.92 : Math.pow((RsRGB + 0.055) / 1.055, 2.4)
  const G = GsRGB <= 0.03928 ? GsRGB / 12.92 : Math.pow((GsRGB + 0.055) / 1.055, 2.4)
  const B = BsRGB <= 0.03928 ? BsRGB / 12.92 : Math.pow((BsRGB + 0.055) / 1.055, 2.4)

  // For the sRGB colorspace, the relative luminance of a color is defined as:
  const L = 0.2126 * R + 0.7152 * G + 0.0722 * B

  return L
}
