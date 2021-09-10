import type { CameraProps as ExpoCameraProps } from 'expo-camera'
import type { PropsWithChildren } from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

import { Camera as ExpoCamera, PermissionStatus } from 'expo-camera'
import React, { forwardRef, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, Platform, StyleSheet, Linking } from 'react-native'

import { Box, Button, Spacer, Text } from '@components/lib'
import { useAppNavigation } from '@internal/navigation'

export const Camera = forwardRef<ExpoCamera, PropsWithChildren<ExpoCameraProps>>((props, ref) => {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null)
  const { t } = useTranslation()
  const navigation = useAppNavigation()

  const localRef = useRef<ExpoCamera>(null)
  const cameraRef = ref ?? localRef

  useEffect(() => {
    async function requestPermissions() {
      const { status } = await ExpoCamera.requestPermissionsAsync()
      setHasPermission(status === PermissionStatus.GRANTED)
    }
    void requestPermissions()
  }, [])

  const onPressOpenSettings = () => {
    void Linking.openSettings()
    navigation.goBack()
  }

  if (hasPermission === null) {
    return null
  }

  if (hasPermission === false) {
    return (
      <Box fill center>
        <Text>{t('feature.camera.noPermissions')}</Text>
        <Spacer />
        <Button variant="plain" onPress={onPressOpenSettings}>
          {t('actions.openSettings')}
        </Button>
      </Box>
    )
  }

  // Android has issues with aspect ratio
  let cameraStyle: StyleProp<ViewStyle> = StyleSheet.absoluteFill
  if (Platform.OS === 'android') {
    const { width, height } = Dimensions.get('screen')
    const cameraWidth = (height / 16) * 9
    const widthOffset = -(cameraWidth - width) / 2
    cameraStyle = { height: height, width: cameraWidth, left: widthOffset }
  }

  return <ExpoCamera style={cameraStyle} ref={cameraRef} {...props} ratio="16:9" />
})
