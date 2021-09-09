import type { RadioFormProps } from '@components/lib/radio/RadioForm'

import React from 'react'

import { gutters } from '@components/global-stylesheets'
import { Box, Heading } from '@components/lib'
import { RadioForm } from '@components/lib/radio/RadioForm'

export interface RadioFormFieldProps extends RadioFormProps {
  headingText: string
}

export const RadioFormField: React.FunctionComponent<RadioFormFieldProps> = ({
  headingText,
  dataList,
  selected,
  setSelected,
}) => (
  <>
    <Heading size="s">{headingText}</Heading>
    <Box style={gutters.tinyLMargin}>
      <RadioForm dataList={dataList} selected={selected} setSelected={setSelected} />
    </Box>
  </>
)
