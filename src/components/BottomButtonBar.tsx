import type { ColorNames } from '@components/theme'

import React from 'react'

import { gutters } from '@components/global-stylesheets'
import { Button, FlexGroup, FlexItem } from '@components/lib'

interface BottomButtonBarProps {
  buttons: { onPress: () => void; text: string; variant?: 'solid' | 'outline'; color?: ColorNames }[]
}

export const BottomButtonBar: React.FunctionComponent<BottomButtonBarProps> = ({ buttons }) => {
  return (
    <FlexGroup alignItems="flexEnd" direction="row" style={gutters.mediumBMargin}>
      {buttons.map((button, index) => (
        <FlexItem key={`${button.text}${index}`} style={gutters.mediumHMargin}>
          <Button onPress={button.onPress} variant={button.variant} color={button.color}>
            {button.text}
          </Button>
        </FlexItem>
      ))}
    </FlexGroup>
  )
}
