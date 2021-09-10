import React from 'react'

import { ListItem } from './ListItem'

import { gutters } from '@components/global-stylesheets'
import { Box, Icon } from '@components/lib'

export interface IconListItemProps {
  onPress: () => void
  text: string
  subText?: string
  actionIconType?: string
  iconType: string
}

export const IconListItem: React.FunctionComponent<IconListItemProps> = ({
  onPress,
  text,
  subText,
  actionIconType = 'chevron-forward-outline',
  iconType,
}) => (
  <ListItem onPress={onPress} text={text} subText={subText} actionIconType={actionIconType}>
    <Box style={gutters.smallHMargin}>
      <Icon type={iconType} size="xxxl" />
    </Box>
  </ListItem>
)
