import React from 'react'
import _Toast from 'react-native-toast-message'

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const Toast = () => <_Toast ref={(ref) => _Toast.setRef(ref)} position="bottom" bottomOffset={75} />

// HOW TO CALL
// import Toast from 'react-native-toast-message'
// Toast.show({ type: 'error', text1: 'Not a valid invitation' })
