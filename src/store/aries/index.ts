import type { RootState } from '../store.types'
import type { Agent } from '@aries-framework/core'
import type { Store } from '@reduxjs/toolkit'

import {
  startConnectionsListener,
  startCredentialsListener,
  startMediationListener,
  startProofsListener,
} from '@aries-framework/redux-store'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { AriesReducer } from './aries.reducer'
import { AriesSelectors } from './aries.selectors'
import { AriesThunks } from './aries.thunks'

export function useAgentListeners(agent: Agent, store: Store) {
  useEffect(() => {
    // returns cleaner method
    const removeConnectionsListener = startConnectionsListener(agent, store)
    const removeCredentialsListener = startCredentialsListener(agent, store)
    const removeProofsListener = startProofsListener(agent, store)
    const removeMediationListener = startMediationListener(agent, store)

    return () => {
      removeConnectionsListener()
      removeCredentialsListener()
      removeProofsListener()
      removeMediationListener()
    }
  }, [agent, store])
}

// Nested selector to get the agent state
const useAgentSelector = <TSelected = unknown>(
  selector: (state: RootState['aries']) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
): TSelected => useSelector((state: RootState) => selector(state.aries), equalityFn)

export { AriesReducer, AriesThunks, AriesSelectors, useAgentSelector }
