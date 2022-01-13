import type { MapViewDirectionsMode } from 'react-native-maps-directions'

import { CheckIcon, Select, Spacer } from 'native-base'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { useAppTheme } from '@components/theme'
import { Button, FlexItem, Page, Text } from '@internal/components'
import { useAppNavigation } from '@internal/navigation'
import { useAppDispatch, useAppSelector } from '@internal/store'
import { AppSelectors } from '@internal/store/app'
import { AppActions } from '@internal/store/app/app.reducer'

export const TravelModeScreen: React.FunctionComponent = () => {
  const { colors } = useAppTheme()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const tMode = useAppSelector(AppSelectors.travelModeSelector)
  const navigation = useAppNavigation()

  const onSelectTravelMode = (travelMode: MapViewDirectionsMode) => {
    dispatch(AppActions.setTravelMode({ travelMode }))
  }

  return (
    <Page safeArea paddingSize="xxl">
      <FlexItem />
      <Text align="center">{t('feature.onboarding.text.travelMode')}</Text>
      <Spacer />
      <FlexItem>
        <Select
          selectedValue={tMode}
          minWidth="200"
          accessibilityLabel="Choose Service"
          placeholder="Choose Service"
          _selectedItem={{
            bg: colors.primary[500],
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => onSelectTravelMode(itemValue as MapViewDirectionsMode)}
        >
          <Select.Item label="Lopen" value="WALKING" />
          <Select.Item label="Auto" value="DRIVING" />
          <Select.Item label="Fiets" value="BICYCLING" />
        </Select>
      </FlexItem>
      <Button onPress={() => navigation.goBack()}>Ga Terug</Button>
    </Page>
  )
}
