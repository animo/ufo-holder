import React from 'react'

import { Slide } from '../components/Slide'

import { images } from '@internal/theme/images'

type LegalScreenProps = {
  onPress: () => void
}

export const LegalScreen: React.FunctionComponent<LegalScreenProps> = ({ onPress }) => {
  return (
    <Slide
      image={images.legal}
      text="klaar om te beginnen? Druk op de knop om de applicatie op te zetten. Let op, dit kan even duren."
      button={{ onPress, text: 'Laten we beginnen' }}
    />
  )
}
