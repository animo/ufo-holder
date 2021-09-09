import React from 'react'

import { ListItem } from './ListItem'

import { Avatar, Spacer } from '@components/lib'

export interface AvatarListItemProps {
  onPress: () => void
  text: string
  subText?: string
  actionIconType?: string
  name: string
  id: string
}

export const AvatarListItem: React.FunctionComponent<AvatarListItemProps> = ({
  onPress,
  text,
  subText,
  actionIconType = 'chevron-forward-outline',
  name,
  id,
}) => (
  <ListItem onPress={onPress} text={text} subText={subText} actionIconType={actionIconType}>
    <Avatar avatarName={name} id={id} />
    <Spacer size="s" vertical />
  </ListItem>
)
