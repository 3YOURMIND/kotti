import { configure } from '@storybook/vue';

import '@3yourmind/kotti-style'
import '@3yourmind/yoco'
import '../src/assets/style.css'

function loadStories() {
  require('../src/stories/CommentStory.js')
  require('../src/stories/BannerStory.js')
  require('../src/stories/AvatarStory.js')
  require('../src/stories/ButtonStory.js')
}

configure(loadStories, module)