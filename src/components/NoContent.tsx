import type { ImageSourcePropType } from 'react-native'

import React from 'react'
import { Image, StyleSheet } from 'react-native'

import { Button, FlexGroup, FlexItem, Heading, Page, Spacer, Text } from '@components/lib'

export interface NoContentProps {
  image: ImageSourcePropType
  heading?: string
  button?: {
    text: string
    onPress: () => void
    iconType?: string
  }
  text?: string
}

export const NoContent: React.FunctionComponent<NoContentProps> = ({ text, heading, image, button }) => (
  <Page>
    <FlexGroup justifyContent="center" alignItems="center" direction="column">
      <FlexItem grow={false}>
        <Image source={image} style={styles.image} />
      </FlexItem>
      {heading && (
        <FlexItem grow={false}>
          <Heading size="l" align="center">
            {heading}
          </Heading>
          <Spacer />
        </FlexItem>
      )}
      <FlexItem grow={false}>
        <Text align="center">{text}</Text>
      </FlexItem>
      {button && (
        <FlexItem grow={false}>
          <Spacer />
          <Button variant="ghost" onPress={button.onPress}>
            {button.text}
          </Button>
        </FlexItem>
      )}
    </FlexGroup>
  </Page>
)

const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
    width: 150,
    height: 200,
  },
})
