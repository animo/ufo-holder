import * as SplashScreen from 'expo-splash-screen'
import { useEffect } from 'react'

import { useAppSelector } from '@internal/store'
import { AppSelectors } from '@internal/store/app'

export const useSplashScreen = () => {
  const isAppReady = useAppSelector(AppSelectors.isInitializedSelector)

  useEffect(() => {
    void SplashScreen.preventAutoHideAsync()
  }, [])

  useEffect(() => {
    if (isAppReady) {
      void SplashScreen.hideAsync()
    }
  }, [isAppReady])
}
