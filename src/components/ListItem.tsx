import React from 'react'
import { TouchableOpacity } from 'react-native'

import { gutters } from '@components/global-stylesheets'
import { FlexGroup, FlexItem, Icon, Text } from '@components/lib'

export interface ListItemProps {
  onPress: () => void
  text: string
  subText?: string
  actionIconType?: string
}

export const ListItem: React.FunctionComponent<ListItemProps> = ({
  onPress,
  text,
  subText,
  actionIconType = 'chevron-forward-outline',
  children,
}) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
    <FlexGroup alignItems="center" justifyContent="spaceBetween" direction="row" style={gutters.smallVMargin}>
      {children}
      <FlexItem>
        <Text>{text}</Text>
        {subText && (
          <Text color="textSubdued" size="s">
            {subText}
          </Text>
        )}
      </FlexItem>
      <Icon type={actionIconType} size="l" />
    </FlexGroup>
  </TouchableOpacity>
)
