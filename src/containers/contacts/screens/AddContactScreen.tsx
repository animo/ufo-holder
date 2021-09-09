import { ConnectionInvitationMessage } from '@aries-framework/core'
import { ConnectionThunks } from '@aries-framework/redux-store'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { gutters, layout } from '@components/global-stylesheets'
import { FormField, Button, FlexGroup, FlexItem, HeaderIconButton, Page, Text, Box } from '@internal/components'
import { useAppStackNavigation } from '@internal/navigation'
import { useAppDispatch } from '@internal/store'

export interface AddContactRouteParams {
  invitationUrl: string
}
export interface AddContactScreenProps {
  route: { params: AddContactRouteParams }
}

export const AddContactScreen: React.FunctionComponent<AddContactScreenProps> = ({ route }) => {
  const invitationUrl = route.params.invitationUrl
  const [alias, setAlias] = useState<string>('')
  const [label, setLabel] = useState<string>('')
  const [invitation, setInvitation] = useState<ConnectionInvitationMessage>()
  const { t } = useTranslation()
  const dispatch = useAppDispatch()
  const navigation = useAppStackNavigation()

  const getInvitation = useCallback(async () => {
    setInvitation(await ConnectionInvitationMessage.fromUrl(invitationUrl))
    setLabel(invitation?.label ?? '')
  }, [invitationUrl, invitation?.label])

  const navigateToContacts = useCallback(() => {
    navigation.navigate('MainTabs', {
      screen: 'ContactsTab',
    })
  }, [navigation])

  useEffect(() => {
    void getInvitation()
  }, [getInvitation])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <HeaderIconButton iconType="close-outline" onPress={navigateToContacts} />,
    })
  }, [navigation, navigateToContacts])

  const onAddContact = () => {
    if (invitation) {
      void dispatch(
        ConnectionThunks.receiveInvitation({
          invitation,
          config: { autoAcceptConnection: true, alias: alias.length ? alias : undefined },
        })
      )
    }
    navigateToContacts()
  }

  return (
    <Page>
      <FlexGroup direction="column">
        <FlexItem>
          <FormField
            onChangeText={setAlias}
            headingText={t('feature.contacts.input.contactName.header')}
            helpText={t('feature.contacts.input.contactName.help')}
            placeholder={label}
          />
          <Text size="m" style={gutters.largeTMargin}>
            {t('feature.contacts.text.newConnection', {
              name: label ?? alias,
            })}
          </Text>
        </FlexItem>
        <FlexItem justifyContent="flex-end">
          <Box paddingSize="xl">
            <Button onPress={onAddContact} style={layout.fullWidth}>
              {t('feature.contacts.action.addContact')}
            </Button>
          </Box>
        </FlexItem>
      </FlexGroup>
    </Page>
  )
}
