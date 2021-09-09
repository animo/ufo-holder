import React from 'react'
import _RadioForm from 'react-native-simple-radio-button'

import { RadioButton } from './RadioButton'

export interface RadioFormProps {
  dataList: { label: string; value: string }[]
  selected: number
  setSelected: (index: number) => void
}

export const RadioForm: React.FunctionComponent<RadioFormProps> = ({ dataList, selected, setSelected, children }) => (
  <_RadioForm>
    {children}
    {dataList.map((data, index) => (
      <RadioButton data={data} index={index} key={data.label} selected={selected === index} setSelected={setSelected} />
    ))}
  </_RadioForm>
)
