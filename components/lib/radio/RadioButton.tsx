import type { ColorNames } from '@components/theme/themes'

import React from 'react'
import { RadioButton as _RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'

import { fontSizes, gutters } from '@components/global-stylesheets'
import { useAppTheme } from '@components/theme'

export interface RadioButtonProps {
  color?: ColorNames
  data: { label: string; value: string }
  index: number
  selected: boolean
  setSelected: (index: number) => void
}

export const RadioButton: React.FunctionComponent<RadioButtonProps> = ({
  color = 'primary',
  data,
  index,
  selected = false,
  setSelected,
}) => {
  const { colors } = useAppTheme()
  return (
    <_RadioButton style={gutters.smallVMargin}>
      <RadioButtonInput
        isSelected={selected}
        obj={data}
        index={index}
        buttonWrapStyle={gutters.smallRMargin}
        onPress={() => setSelected(index)}
        buttonOuterColor={colors[color][500]}
        buttonInnerColor={colors[color][500]}
        buttonSize={15}
      />
      <RadioButtonLabel
        obj={data}
        index={index}
        labelStyle={[{ color: colors.text[500] }, fontSizes.text.m]}
        onPress={() => setSelected(index)}
      />
    </_RadioButton>
  )
}
