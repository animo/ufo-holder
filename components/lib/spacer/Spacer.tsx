import type { FunctionComponent } from 'react'

import React from 'react'
import { StyleSheet } from 'react-native'

import { sizes } from '../../global-constants'
import { Box } from '../box'

export interface Props {
  size?: keyof typeof horizontalStyle
  vertical?: boolean
}

const horizontalStyle = StyleSheet.create({
  s: {
    height: sizes.s,
  },
  m: {
    height: sizes.m,
  },
  l: {
    height: sizes.l,
  },
  xl: {
    height: sizes.xl,
  },
  xxl: {
    height: sizes.xxl,
  },
  xxxl: {
    height: sizes.xxxl,
  },
})

const verticalStyle = StyleSheet.create({
  s: {
    width: sizes.s,
  },
  m: {
    width: sizes.m,
  },
  l: {
    width: sizes.l,
  },
  xl: {
    width: sizes.xl,
  },
  xxl: {
    width: sizes.xxl,
  },
  xxxl: {
    width: sizes.xxxl,
  },
})

export const Spacer: FunctionComponent<Props> = ({ children, size = 'm', vertical = false }) => (
  <Box style={vertical ? verticalStyle[size] : horizontalStyle[size]}>{children}</Box>
)
