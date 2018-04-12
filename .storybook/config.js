import { configure } from '@storybook/vue';

import '@3yourmind/kotti-style'
import '@3yourmind/yoco'
import '../storybook/src/assets/style.css'

function loadStories() {
  require('../storybook/src/stories/CommentStory.js')
  require('../storybook/src/stories/BannerStory.js')
  require('../storybook/src/stories/AvatarStory.js')
  require('../storybook/src/stories/ButtonStory.js')
}

configure(loadStories, module)