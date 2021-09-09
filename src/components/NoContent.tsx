import React from 'react'

import { FlexGroup, FlexItem, Icon, Page, Text, Heading, Spacer, Button } from '@components/lib'

export interface NoContentProps {
  iconType: string
  heading?: string
  button?: {
    text: string
    onPress: () => void
    iconType?: string
  }
  text?: string
}

export const NoContent: React.FunctionComponent<NoContentProps> = ({ text, heading, iconType, button }) => (
  <Page>
    <FlexGroup justifyContent="center" alignItems="center" direction="column">
      <FlexItem grow={false}>
        <Icon iconSize={100} iconType={iconType} />
      </FlexItem>
      {heading && (
        <FlexItem grow={false}>
          <Heading size="l">{heading}</Heading>
          <Spacer />
        </FlexItem>
      )}
      <FlexItem grow={false}>
        <Text align="center">{text}</Text>
      </FlexItem>
      {button && (
        <FlexItem grow={false}>
          <Spacer />
          <Button iconType={button.iconType} variant="plain" onPress={button.onPress}>
            {button.text}
          </Button>
        </FlexItem>
      )}
    </FlexGroup>
  </Page>
)
