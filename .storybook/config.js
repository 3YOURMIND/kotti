import { configure } from '@storybook/vue';
import Vue from 'vue';

import '../packages/kotti-style'
import '@3yourmind/yoco'
import '../assets/storybook-style.css'

function loadStories() {
  require('../stories/CommentStory.js')
  require('../stories/BannerStory.js')
  require('../stories/ButtonStory.js')
  require('../stories/AvatarStory.js')
}

configure(loadStories, module)