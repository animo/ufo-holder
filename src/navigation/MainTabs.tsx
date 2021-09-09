import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'

import { BadgedIcon, Icon } from '@components/lib'
import { screenOptions } from '@internal/components'
import { ActionsTab, ContactsTab, ProofsTab, CredentialsTab } from '@internal/containers'
import { AriesSelectors, useAgentSelector } from '@internal/store/aries'
import { useTheme } from '@internal/theme'

const Tab = createBottomTabNavigator<MainTabsNavigationParamsList>()

export const MainTabs: React.FunctionComponent = () => {
  const { t } = useTranslation()
  const theme = useTheme()

  const hasActions = useAgentSelector(AriesSelectors.hasActionsSelector)

  return (
    <Tab.Navigator screenOptions={screenOptions(theme)}>
      <Tab.Screen
        name="ActionsTab"
        component={ActionsTab}
        options={{
          title: t('feature.actions.title.actions'),
          tabBarIcon: ({ focused }) => (
            <BadgedIcon
              iconType="notifications-outline"
              iconColor={focused ? 'text' : 'textSubduedDarker'}
              size="xl"
              display={hasActions}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CredentialsTab"
        component={CredentialsTab}
        options={{
          title: t('feature.credentials.title.credentials'),
          tabBarIcon: ({ focused }) => (
            <Icon iconType="wallet-outline" iconColor={focused ? 'text' : 'textSubduedDarker'} iconSize="xl" />
          ),
        }}
      />
      <Tab.Screen
        name="ProofsTab"
        component={ProofsTab}
        options={{
          title: t('feature.proofs.title.proofs'),
          tabBarIcon: ({ focused }) => (
            <Icon iconType="git-compare-outline" iconColor={focused ? 'text' : 'textSubduedDarker'} iconSize="xl" />
          ),
        }}
      />
      <Tab.Screen
        name="ContactsTab"
        component={ContactsTab}
        options={{
          title: t('feature.contacts.title.contacts'),
          tabBarIcon: ({ focused }) => (
            <Icon iconType="people-outline" iconColor={focused ? 'text' : 'textSubduedDarker'} iconSize="xl" />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export type MainTabsNavigationParamsList = {
  ActionsTab: undefined
  CredentialsTab: undefined
  ProofsTab: undefined
  ContactsTab: undefined
}
