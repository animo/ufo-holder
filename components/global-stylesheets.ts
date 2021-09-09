/**
 * Importing stylesheets directly into components outside of the `components` directory should be considered a temporary hold-over or a way
 * to address very edge-case styling requirements. The `components` directory should contain UI primitives that wrap 99% of
 * styling and appearance concerns. Instead of importing "global" stylesheets everywhere we are aiming for the following:
 *
 * ```tsx
 * // page imports
 * import { ... } from '@components'
 * ...
 * // further down
 * <Page>
 *    <Header>
 *      <Heading size="l">My title</Heading>
 *    </Header>
 *    <Body>
 *      // etc
 *    </Body>
 * </Page>
 * ```
 *
 */

import type { PrettySizes } from './global-constants'
import type { TextStyle, ViewStyle, ImageStyle } from 'react-native'

import { StyleSheet } from 'react-native'

import { prettySize, fontSize, paddingSize, borderRadius, marginSize } from './global-constants'

type GutterSides = 'T' | 'B' | 'R' | 'L' | 'V' | 'H'
type GutterTypes = 'Margin' | 'Padding'

type ThemeGutterKeys = `${keyof PrettySizes}${GutterSides}${GutterTypes}`
export type ThemeGutters = {
  [key in ThemeGutterKeys]: TextStyle & ViewStyle & ImageStyle
}

export const gutters = StyleSheet.create({
  ...Object.entries(prettySize).reduce(
    (acc, [key, value]) => ({
      ...acc,
      /* Margins */
      [`${key}BMargin`]: {
        marginBottom: value,
      },
      [`${key}TMargin`]: {
        marginTop: value,
      },
      [`${key}RMargin`]: {
        marginRight: value,
      },
      [`${key}LMargin`]: {
        marginLeft: value,
      },
      [`${key}VMargin`]: {
        marginVertical: value,
      },
      [`${key}HMargin`]: {
        marginHorizontal: value,
      },
      /* Paddings */
      [`${key}BPadding`]: {
        paddingBottom: value,
      },
      [`${key}TPadding`]: {
        paddingTop: value,
      },
      [`${key}RPadding`]: {
        paddingRight: value,
      },
      [`${key}LPadding`]: {
        paddingLeft: value,
      },
      [`${key}VPadding`]: {
        paddingVertical: value,
      },
      [`${key}HPadding`]: {
        paddingHorizontal: value,
      },
    }),
    {}
  ),
}) as ThemeGutters

export const layout = StyleSheet.create({
  /* Column Layouts */
  column: {
    flexDirection: 'column',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
  colCenter: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colVCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  colHCenter: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  /* Row Layouts */
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowVCenter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  rowHCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  /* Default Layouts */
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  alignItemsCenter: {
    alignItems: 'center',
  },
  alignItemsStart: {
    alignItems: 'flex-start',
  },
  alignItemsStretch: {
    alignItems: 'stretch',
  },
  justifyContentCenter: {
    justifyContent: 'center',
  },
  justifyContentAround: {
    justifyContent: 'space-around',
  },
  justifyContentBetween: {
    justifyContent: 'space-between',
  },
  scrollSpaceAround: {
    flexGrow: 1,
    justifyContent: 'space-around',
  },
  scrollSpaceBetween: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  selfStretch: {
    alignSelf: 'stretch',
  },
  /* Sizes Layouts */
  fill: {
    flex: 1,
  },
  fullSize: {
    height: '100%',
    width: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
  halfWidth: {
    width: '50%',
  },
  halfHeight: {
    height: '50%',
  },
  /* Operation Layout */
  mirror: {
    transform: [{ scaleX: -1 }],
  },
  rotate90: {
    transform: [{ rotate: '90deg' }],
  },
  rotate90Inverse: {
    transform: [{ rotate: '-90deg' }],
  },
})

export const fontSizes = {
  text: StyleSheet.create({
    xs: {
      fontSize: fontSize.xs,
    },
    s: {
      fontSize: fontSize.s,
    },
    m: {
      fontSize: fontSize.m,
    },
    l: {
      fontSize: fontSize.l,
    },
  }),
  heading: StyleSheet.create({
    s: {
      fontSize: fontSize.m,
      fontWeight: 'bold',
    },
    m: {
      fontSize: fontSize.l,
      fontWeight: 'bold',
    },
    l: {
      fontSize: fontSize.xl,
      fontWeight: 'bold',
    },
    xl: {
      fontSize: fontSize.xxl,
      fontWeight: 'bold',
    },
  }),
}

export const paddingSizes = StyleSheet.create({
  s: {
    padding: paddingSize.s,
  },
  m: {
    padding: paddingSize.m,
  },
  l: {
    padding: paddingSize.l,
  },
  xl: {
    padding: paddingSize.xl,
  },
  none: {
    padding: 0,
  },
})

export const marginSizes = StyleSheet.create({
  s: {
    margin: marginSize.s,
  },
  m: {
    margin: marginSize.m,
  },
  l: {
    margin: marginSize.m,
  },
  xl: {
    margin: marginSize.m,
  },
  none: {
    margin: 0,
  },
})

export const borderRadiusSizes = StyleSheet.create({
  s: {
    borderRadius: borderRadius.s,
  },
  none: {
    borderRadius: 0,
  },
})

type LayoutKeys = keyof typeof layout
export type ThemeLayout = { [key in LayoutKeys]: TextStyle & ViewStyle & ImageStyle }
export type BorderRadiusSizes = keyof typeof borderRadiusSizes
export type PaddingSizes = keyof typeof paddingSizes
export type MarginSizes = keyof typeof marginSizes
