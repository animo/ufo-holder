import type { ImageSourcePropType, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native'
import type PagerView from 'react-native-pager-view'

import { Image } from 'native-base'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'

import { Box, Button, FlexItem, Input, Page, Spacer, Text } from '@components/lib'

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

export type FormSlideProps = Omit<SlideProps, 'image'> & {
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void
}

export type IndicatorSlideProps = Pick<SlideProps, 'indicator'>

export interface SlideWithRef {
  pagerViewRef: React.RefObject<PagerView>
}

export const FormSlide: React.FunctionComponent<FormSlideProps> = ({ text, button, indicator, onChange }) => {
  const indicators = []
  const { t } = useTranslation()

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
        <FlexItem grow={3} />
        <Input placeholder={t('feature.onboarding.placeholders.register.name')} onChange={onChange} />
        <FlexItem grow={2} />
        <FlexItem>
          <Text align="center">{text}</Text>
        </FlexItem>
        {indicators}
        <FlexItem justifyContent="flex-end" grow={2}>
          {button && <Button onPress={button.onPress}>{button.text}</Button>}
        </FlexItem>
        <Spacer size="xl" />
      </Page>
    </View>
  )
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
        <FlexItem grow={3} />
        <Image source={image} alt="onboarding-image" style={styles.image} />
        <FlexItem grow={2} />
        <FlexItem>
          <Text align="center">{text}</Text>
        </FlexItem>
        {indicators}
        <FlexItem justifyContent="flex-end" grow={2}>
          {button && <Button onPress={button.onPress}>{button.text}</Button>}
        </FlexItem>
        <Spacer size="xl" />
      </Page>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: '35%',
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
