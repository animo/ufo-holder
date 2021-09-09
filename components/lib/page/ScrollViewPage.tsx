import type { PageProps } from './Page'

import React from 'react'
import { ScrollView } from 'react-native'

import { paddingSizes } from '@components/global-stylesheets'

export type ScrollViewProps = PageProps

export const ScrollViewPage: React.FunctionComponent<ScrollViewProps> = ({ paddingSize = 'xl', children }) => (
  <ScrollView contentContainerStyle={paddingSizes[paddingSize]}>{children}</ScrollView>
)
