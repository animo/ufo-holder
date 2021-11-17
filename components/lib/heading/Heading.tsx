import type { FontSizes } from '@components/global-constants'
import type { ColorNames } from '@components/theme'
import type { FunctionComponent } from 'react'

import { Heading as _Heading } from 'native-base'
import React from 'react'

import { fontSize } from '@components/global-constants'
import { useAppTheme } from '@components/theme'

interface TextProps {
  align?: 'left' | 'right' | 'center' | 'justify'
  size?: FontSizes
  color?: ColorNames
}

export const Heading: FunctionComponent<TextProps> = ({ size = 'l', align, color = 'text', children }) => {
  const { colors } = useAppTheme()
  const mappedSize = fontSize[size]
  return (
    <_Heading fontSize={mappedSize} textAlign={align} color={colors[color][500]}>
      {children}
    </_Heading>
  )
}
