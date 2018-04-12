import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, number, boolean, array, select, color, date, button } from '@storybook/addon-knobs/vue'

import KtAvatar from './components/Avatar.vue'

const storiesOfAvatar = storiesOf('Avatar', module)
  .addDecorator(withKnobs)
  .add('Single Avatar', () => {
    const showTooltip = boolean('Show Tool Tip', false)
    const selected = boolean('Selected', false)
    const avatarImg = text('Avatar Src', 'https://picsum.photos/200/200')
    return {
      components: {KtAvatar},
      template: `<KtAvatar :data="userData" 
      :showTooltip="${showTooltip}"
      :selected="${selected}"/>`,
      data() {
        return {
          userData: [
            {
              name: 'Benni',
              src: avatarImg
            },
          ]
        }
      }
    }
  })
  .add('Avatar Group', () => ({
    components: { KtAvatar },
    template: '<KtAvatar :data="userData" showTooltip="true" :avatarGroup="true"/>',
    data() {
      return {
        userData: [
          {
            name: 'Benni',
            src: 'https://picsum.photos/200/200'
          },
          {
            name: 'Json',
            src: 'https://picsum.photos/200/200'
          },
          {
            name: 'Jackson',
            src: 'https://picsum.photos/200/200'
          },
        ]
      }
    },
  }))

  export default {
    storiesOfAvatar
  }