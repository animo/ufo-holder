/**
 * Used to navigating without the navigation prop
 * @see https://reactnavigation.org/docs/navigating-without-navigation-prop/
 *
 * You can add other navigation functions that you need and export them
 */
import type { RootNavigationParamList } from './navigators.types'
import type { NavigationContainerRef } from '@react-navigation/native'

import { CommonActions } from '@react-navigation/native'
import { createRef } from 'react'

export const navigationRef = createRef<NavigationContainerRef<RootNavigationParamList>>()

type ContainerRef = NavigationContainerRef<RootNavigationParamList>
type Navigate = ContainerRef['navigate']

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const _navigate = (...args: [any, any]) => {
  navigationRef.current?.navigate(...args)
}

// Work around stupid TS errors, but still get typing! :)
export const navigate = _navigate as Navigate

export function navigateAndReset(routes = [], index = 0) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes,
    })
  )
}

export function navigateAndSimpleReset(name: string, index = 0) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index,
      routes: [{ name }],
    })
  )
}
