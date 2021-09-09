import type { AvatarSizes } from '@components/global-constants'

import React from 'react'
import { View, Text } from 'react-native'

import { getInitials } from './util'

import { avatarSize } from '@components/global-constants'

interface UserAvatarProps {
  name: string
  size: AvatarSizes
  backgroundColor: string
  textColor: string
}

export const UserAvatar = ({ name, size, backgroundColor, textColor }: UserAvatarProps) => {
  const initials = getInitials(name)
  const styles = getUserAvatarStyles({ size, textColor, backgroundColor, name })

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{initials}</Text>
    </View>
  )
}

const getUserAvatarStyles = ({ size, textColor, backgroundColor }: UserAvatarProps) =>
  ({
    container: {
      width: avatarSize[size],
      height: avatarSize[size],
      borderRadius: avatarSize[size],
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor,
    },
    text: {
      color: textColor,
      fontSize: avatarSize[size] / 2.5,
      fontWeight: '500',
    },
  } as const)
