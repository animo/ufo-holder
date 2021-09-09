import type { BadgeProps } from '../badge/Badge'
import type { ButtonProps } from './Button'

import React from 'react'
import { StyleSheet } from 'react-native'

import { Badge } from '../badge/Badge'

import { Button } from '@internal/components'

export type BadgedButtonProps = BadgeProps & ButtonProps

export const BadgedButton: React.FunctionComponent<BadgedButtonProps> = ({
  badgeColor,
  display,
  onPress,
  badgeSize,
  disabled,
  style: buttonStyle,
  variant: buttonVariant,
  children,
}) => {
  const styles = StyleSheet.create({
    badge: {
      top: 0,
      right: 0,
    },
  })
  return (
    <Badge display={display} badgeColor={badgeColor} badgeSize={badgeSize} badgeStyle={styles.badge}>
      <Button onPress={onPress} disabled={disabled} style={buttonStyle} variant={buttonVariant}>
        {children}
      </Button>
    </Badge>
  )
}
