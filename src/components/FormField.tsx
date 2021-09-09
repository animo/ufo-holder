import React from 'react'

import { gutters } from '@components/global-stylesheets'
import { Heading, Input, Text } from '@components/lib'

export interface FormFieldProps {
  onChangeText: (text: string) => void
  headingText: string
  helpText: string
  placeholder?: string
  defaultValue?: string
  value?: string
  email?: boolean
  disabled?: boolean
  error?: string | null
  noCapitalization?: boolean
  onBlur?: () => void
}

export const FormField: React.FunctionComponent<FormFieldProps> = ({
  onChangeText,
  headingText,
  helpText,
  placeholder,
  defaultValue,
  value,
  error,
  email = false,
  disabled = false,
  noCapitalization = false,
  onBlur,
}) => (
  <>
    <Heading size="s">{headingText}</Heading>
    <Input
      style={gutters.smallVMargin}
      placeholder={placeholder}
      onChangeText={onChangeText}
      defaultValue={defaultValue}
      value={value}
      email={email}
      disabled={disabled}
      hasError={!!error}
      noCapitalization={noCapitalization}
      onBlur={onBlur}
    />
    <Text size="s" color={error ? 'danger' : 'textSubdued'}>
      {error ?? helpText}
    </Text>
  </>
)
