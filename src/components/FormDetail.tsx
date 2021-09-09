import React from 'react'

import { Text } from '@components/lib'

export interface FormDetailProps {
  headingText: string
  text: string
  helpText?: string
}

export const FormDetail: React.FunctionComponent<FormDetailProps> = ({ headingText, text, helpText }) => (
  <>
    <Text size="s" color="textSubdued">
      {headingText}
    </Text>
    <Text size="m">{text}</Text>
    <Text size="xs" color="textSubduedDarker">
      {helpText}
    </Text>
  </>
)
