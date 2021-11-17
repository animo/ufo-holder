import type { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'

import { Input as _Input } from 'native-base'
import React from 'react'

import { useAppTheme } from '@internal/theme'

export interface InputProps {
  placeholder?: string
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
}

export const Input: React.FunctionComponent<InputProps> = ({ placeholder, onChange }) => {
  const { colors } = useAppTheme()

  return <_Input color={colors.text[500]} borderColor={colors.primary} placeholder={placeholder} onChange={onChange} />
}
