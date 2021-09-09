import type { ThemedStylesFunction } from '@components/theme'
import type { Requests } from '@internal/utils'

import React from 'react'

import { borderRadiusSizes, gutters, layout } from '@components/global-stylesheets'
import { useStyles } from '@components/theme'
import { Box, FlexItem, FormDetail, Heading, IconButton, Panel } from '@internal/components'
import { convertToHumanFriendlyName } from '@internal/utils/attribute'

export interface ProofRequestGroupCardProps {
  request: Requests
  title: string
  onPressEdit?: () => void
  editable?: boolean
}

export const ProofRequestGroupCard: React.FunctionComponent<ProofRequestGroupCardProps> = ({
  request,
  title,
  onPressEdit,
  editable = false,
  children,
}) => {
  const styles = useStyles(CardStyles)

  return (
    <Panel style={gutters.mediumBMargin} paddingSize="none">
      <FlexItem
        style={[styles.titleContainer, gutters.mediumHPadding, layout.row]}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading size="m">{title}</Heading>
        {editable && (
          <IconButton iconType="create-outline" iconSize="l" onPress={onPressEdit} style={gutters.tinyRPadding} />
        )}
      </FlexItem>
      <FlexItem style={[gutters.mediumHMargin, gutters.mediumVMargin]}>
        {Object.entries(request.requestedAttributes).map(([key, value]) => {
          return (
            <Box key={key} style={borderRadiusSizes.s}>
              <FormDetail
                headingText={convertToHumanFriendlyName(key)}
                text={convertToHumanFriendlyName(value)}
                key={key}
              />
            </Box>
          )
        })}
        {children}
      </FlexItem>
    </Panel>
  )
}

const CardStyles: ThemedStylesFunction = ({ colors }) => {
  return {
    titleContainer: {
      backgroundColor: colors.backgroundShade,
      borderTopLeftRadius: borderRadiusSizes.s.borderRadius,
      borderTopRightRadius: borderRadiusSizes.s.borderRadius,
      minHeight: 50,
    },
  }
}
