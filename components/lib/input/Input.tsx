import type { FontSize } from '../text/Text'
import type { ColorNames, ThemedStylesFunction } from '@components/theme'
import type { ViewStyle } from 'react-native'

import React from 'react'
import { TextInput } from 'react-native'

import { borderRadius, borderWidthThin } from '@components/global-constants'
import { fontSizes, gutters } from '@components/global-stylesheets'
import { useStyles, useTheme } from '@components/theme'

export interface InputProps {
  variant?: 'outline'
  value?: string
  placeholder?: string
  onChangeText: (text: string) => void
  disabled?: boolean
  size?: FontSize
  style?: ViewStyle | ViewStyle[]
  defaultValue?: string
  email?: boolean
  hasError?: boolean
  noCapitalization?: boolean
  onBlur?: () => void
}

export const Input: React.FunctionComponent<InputProps> = ({
  variant = 'outline',
  value,
  onChangeText,
  onBlur,
  disabled,
  placeholder,
  size = 'm',
  style,
  defaultValue,
  hasError,
  email = false,
  noCapitalization = false,
}) => {
  const themedStyles = useStyles(InputStyles, hasError ? 'danger' : 'borderSubdued')
  const variantStyle = themedStyles[variant]
  const { colors } = useTheme()

  return (
    <TextInput
      style={[
        themedStyles.base,
        themedStyles.rounded,
        variantStyle,
        fontSizes.text[size],
        { color: colors.text },
        style,
      ]}
      onBlur={onBlur}
      value={value}
      onChangeText={onChangeText}
      editable={!disabled}
      placeholder={placeholder}
      placeholderTextColor={colors.textSubduedDarker}
      defaultValue={defaultValue}
      keyboardType={email ? 'email-address' : 'default'}
      autoCapitalize={noCapitalization ? 'none' : 'sentences'}
    />
  )
}

const InputStyles: ThemedStylesFunction<ColorNames> = ({ colors }, color = 'borderSubdued') => {
  return {
    base: {
      ...gutters.mediumHPadding,
      ...gutters.mediumVPadding,
    },
    rounded: {
      borderRadius: borderRadius.s,
    },
    outline: {
      borderWidth: borderWidthThin,
      borderColor: colors[color],
    },
  }
}
