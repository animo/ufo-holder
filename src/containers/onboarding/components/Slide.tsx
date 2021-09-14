import type { ImageSourcePropType } from 'react-native'
import type PagerView from 'react-native-pager-view'

import { Image } from 'native-base'
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Box, Button, FlexGroup, FlexItem, Page, Spacer, Text } from '@components/lib'

export interface SlideProps {
  button?: {
    onPress: () => void
    text: string
  }
  text: string
  image: ImageSourcePropType
  indicator?: {
    index: number
    count: number
  }
}

export type IndicatorSlideProps = Pick<SlideProps, 'indicator'>

export interface SlideWithRef {
  pagerViewRef: React.RefObject<PagerView>
}

export const Slide: React.FunctionComponent<SlideProps> = ({ image, text, button, indicator }) => {
  const indicators = []

  if (indicator?.count && indicator.index) {
    for (let i = 0; i < indicator.count; i++) {
      if (i === indicator.index) {
        indicators.push(<Box style={styles.dot} key={i} />)
      } else {
        indicators.push(<Box style={[styles.dot, styles.indexedDot]} key={i} />)
      }
    }
  }

  return (
    <View style={StyleSheet.absoluteFill} collapsable={false}>
      <Page safeArea paddingSize="xxl">
        <FlexGroup>
          <FlexItem grow={1} />
          <FlexItem grow={3}>
            <Image source={image} alt="onboarding-image" style={styles.image} />
          </FlexItem>
          <Spacer size="xl" />
          <FlexItem grow={2}>
            <Text align="center">{text}</Text>
          </FlexItem>
          {indicators}
          {button && (
            <>
              <FlexItem justifyContent="flex-end">
                <Button onPress={button.onPress}>{button.text}</Button>
              </FlexItem>
              <Spacer size="xl" />
            </>
          )}
        </FlexGroup>
      </Page>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'contain',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'grey',
  },
  indexedDot: {
    backgroundColor: 'black',
  },
})
