import { Alert } from 'react-native'

export const sendFeedback = (feedback: string) => {
  Alert.alert(`Sent feedback: ${feedback}`)
}
