import { StyleSheet } from 'react-native'

import { sizes } from '../../global-constants'

const { base, flexReset } = StyleSheet.create({
  base: {
    display: 'flex',
    flex: 1,
  },
  flexReset: {
    flex: 0,
  },
})

const alignItems = StyleSheet.create({
  stretch: {
    alignItems: 'stretch',
  },
  flexStart: {
    alignItems: 'flex-start',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  center: {
    alignItems: 'center',
  },
  baseline: {
    alignItems: 'baseline',
  },
})

export type FlexGroupAlignItems = keyof typeof alignItems

const justifyContent = StyleSheet.create({
  flexStart: {
    justifyContent: 'flex-start',
  },
  flexEnd: {
    justifyContent: 'flex-end',
  },
  center: {
    justifyContent: 'center',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  spaceAround: {
    justifyContent: 'space-around',
  },
  spaceEvenly: {
    justifyContent: 'space-evenly',
  },
})

export type FlexGroupJustifyContent = keyof typeof justifyContent

const direction = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  rowReverse: {
    flexDirection: 'row-reverse',
  },
  column: {
    flexDirection: 'column',
  },
  columnReverse: {
    flexDirection: 'column-reverse',
  },
})

export type FlexGroupDirection = keyof typeof direction

const { wrap } = StyleSheet.create({
  wrap: {
    flexWrap: 'wrap',
  },
})

const gutterSize = StyleSheet.create({
  none: {
    margin: 0,
  },
  xs: {
    margin: -sizes.xs * 0.5,
  },
  s: {
    margin: -sizes.s * 0.5,
  },
  m: {
    margin: -sizes.m * 0.5,
  },
  l: {
    margin: -sizes.l * 0.5,
  },
  xl: {
    margin: -sizes.xl * 0.5,
  },
})

export type FlexGroupGutter = keyof typeof gutterSize

export const styles = {
  base,
  alignItems,
  justifyContent,
  direction,
  wrap,
  gutterSize,
  flexReset,
}
