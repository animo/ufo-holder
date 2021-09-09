import type { ThemedStylesFunction } from '../../theme'
import type { PropsWithChildren } from 'react'
import type { ViewStyle } from 'react-native'

import React from 'react'
import { TouchableOpacity } from 'react-native'

import { borderRadius, borderWidthThin } from '../../global-constants'
import { gutters, layout } from '../../global-stylesheets'
import { useStyles } from '../../theme'
import { Text } from '../text'

import { styles } from './Button.styles'

import { FlexGroup, Icon } from '@components/lib'
import { Spacer } from '@internal/components'

type ButtonVariant = 'default' | 'outline' | 'plain'

export interface ButtonProps {
  onPress?: () => void
  style?: ViewStyle | ViewStyle[]
  variant?: ButtonVariant
  /**
   * `success` and `secondary` are the same, we should refactor to just `success` in the future.
   */
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  disabled?: boolean
  iconType?: string
}

export const Button = ({
  children,
  onPress,
  style,
  variant = 'default',
  color = 'primary',
  disabled,
  iconType,
}: PropsWithChildren<ButtonProps>) => {
  const themedStyles = useStyles(ButtonStyles, color)

  const variantStyle = themedStyles[variant]
  const textColor = variant === 'default' ? variantTextColors[color] : color

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[themedStyles.base, styles.height, variantStyle, style ?? {}]}
      onPress={onPress}
      disabled={disabled}
    >
      <FlexGroup justifyContent="center" alignItems="center" direction="row">
        {iconType && (
          <>
            <Icon iconType={iconType} iconColor={textColor} iconSize="xl" />
            <Spacer size="s" vertical />
          </>
        )}
        <Text align="center" color={textColor}>
          {children}
        </Text>
      </FlexGroup>
    </TouchableOpacity>
  )
}

// TODO: when we get the theme, which colors do we want to display with white text and which with black.
const variantTextColors = {
  primary: 'white',
  secondary: 'white',
  accent: 'white',
  background: 'white',
  backgroundShade: 'white',
  black: 'white',
  border: 'white',
  card: 'white',
  danger: 'white',
  textSubdued: 'white',
  textSubduedDarker: 'white',
  white: 'black',
  darkestShade: 'white',
  lightestShade: 'white',
  notification: 'white',
  success: 'white',
  text: 'white',
  textAccent: 'white',
  textDanger: 'white',
  textPrimary: 'white',
  textSecondary: 'white',
  textSuccess: 'white',
  textWarning: 'white',
  warning: 'white',
  transparent: 'white',
} as const

const ButtonStyles: ThemedStylesFunction<ButtonProps['color']> = ({ colors }, color = 'primary') => {
  return {
    base: {
      ...layout.center,
      ...gutters.largeHPadding,
      borderRadius: borderRadius.s,
    },
    default: {
      backgroundColor: colors[color],
    },
    outline: {
      backgroundColor: colors.transparent,
      borderWidth: borderWidthThin,
      borderColor: colors[color],
      color: colors[color],
    },
    plain: {
      backgroundColor: colors.transparent,
      color: colors[color],
    },
  }
}
