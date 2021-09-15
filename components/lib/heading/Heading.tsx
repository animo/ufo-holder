import type { FontSizes } from '@components/global-constants'
import type { FunctionComponent } from 'react'

import { Heading as _Heading } from 'native-base'
import React from 'react'

import { fontSize } from '@components/global-constants'
import { useAppTheme } from '@components/theme'

interface TextProps {
  align?: 'left' | 'right' | 'center' | 'justify'
  size?: FontSizes
}

export const Heading: FunctionComponent<TextProps> = ({ size = 'l', align, children }) => {
  const { colors } = useAppTheme()
  const mappedSize = fontSize[size]
  return (
    <_Heading fontSize={mappedSize} textAlign={align} color={colors.text[500]}>
      {children}
    </_Heading>
  )
}
