import type { FunctionComponent } from 'react'

import React from 'react'
import { View, StyleSheet } from 'react-native'

import { ThemeContextProvider } from './theme/context'
import { theme } from './theme/themes/dark'

export const ThemeWrapper: FunctionComponent = ({ children }) => (
  <ThemeContextProvider themeName="dark">{children}</ThemeContextProvider>
)

const defaultDecoratorStyle = StyleSheet.create({
  page: {
    margin: 20,
    flex: 1,
    backgroundColor: theme.colors.background,
  },
})

export const DefaultDecorator: FunctionComponent = ({ children }) => {
  return <View style={defaultDecoratorStyle.page}>{children}</View>
}
