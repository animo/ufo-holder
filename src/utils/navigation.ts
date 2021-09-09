import { useEffect } from 'react'

import { useAppNavigation } from '@internal/navigation'

export const usePreventGoBack = (active: boolean) => {
  const navigation = useAppNavigation()

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e) => {
        if (!active) {
          // If not active, we can go back
          return
        }

        // Otherwise we prevent going back
        e.preventDefault()
      }),
    [active, navigation]
  )
}
