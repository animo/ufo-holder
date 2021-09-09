import type { ColorNames } from '@components/theme'

import React from 'react'
import { RadioButton as _RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button'

import { fontSizes, gutters } from '@components/global-stylesheets'
import { useTheme } from '@components/theme'

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
  const { colors } = useTheme()
  return (
    <_RadioButton style={gutters.smallVMargin}>
      <RadioButtonInput
        isSelected={selected}
        obj={data}
        index={index}
        buttonWrapStyle={gutters.smallRMargin}
        onPress={() => setSelected(index)}
        buttonOuterColor={colors[color]}
        buttonInnerColor={colors[color]}
        buttonSize={15}
      />
      <RadioButtonLabel
        obj={data}
        index={index}
        labelStyle={[{ color: colors.text }, fontSizes.text.m]}
        onPress={() => setSelected(index)}
      />
    </_RadioButton>
  )
}
