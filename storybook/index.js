// if you use expo remove this line
import { withKnobs } from '@storybook/addon-knobs'
import { getStorybookUI, configure, addDecorator } from '@storybook/react-native'

import './rn-addons'

// enables knobs for all stories
addDecorator(withKnobs)

// import stories
configure(() => {
  require('../components/lib/button/Button.stories.tsx')
  require('../components/lib/flex/Flex.stories.tsx')
  require('../components/lib/text/Text.stories.tsx')
  require('../components/lib/heading/Heading.stories.tsx')
  require('../components/lib/stories/ResultPage.stories.tsx')
}, module)

// Refer to https://github.com/storybookjs/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({
  asyncStorage: null,
})

export default StorybookUIRoot
