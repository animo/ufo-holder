import React from 'react'

import { ListItem } from './ListItem'

import { Avatar, Badge, Spacer } from '@components/lib'

export interface AvatarListItemProps {
  onPress: () => void
  text: string
  subText?: string
  actionIconType?: string
  name: string
  showBadge?: boolean
}

export const AvatarListItem: React.FunctionComponent<AvatarListItemProps> = ({
  onPress,
  text,
  subText,
  actionIconType = 'chevron-forward-outline',
  name,
  showBadge = false,
}) => (
  <ListItem onPress={onPress} text={text} subText={subText} actionIconType={actionIconType}>
    <Badge display={showBadge}>
      <Avatar text={name} />
    </Badge>
    <Spacer size="s" vertical />
  </ListItem>
)
