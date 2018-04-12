import { storiesOf } from '@storybook/vue'
import { action } from '@storybook/addon-actions'
import { withKnobs, text, number, boolean, array, select, color, date, button } from '@storybook/addon-knobs/vue'

import KtBanner from './components/Banner.vue'

storiesOf('Banner', module)
  .addDecorator(withKnobs)
  .add('Collapsed', () => {
    const message = text('Banner Message', 'Text message')
    const greyBanner = boolean('GreyBanner', false)
    return {
      components: { KtBanner },
      methods: {
        customAction() {
          action('action-click')(`hmmm, I'm clicked.. you can do more actions`)
        }
      },
      template: `<KtBanner message="${message}" :isGrey="${greyBanner}">
      <div slot="customAction">
        <button @click="customAction">Click Me</button>
      </div>
      <div slot="glyph"><i class="yoco">cloud</i></div>
      </KtBanner>`
    }
  })
  .add('Expandable', () => {
    const message = text('Banner Message', 'Text message')
    const actionText = text('Action Text', 'View')
    const actionTextSwitch = text('Action Text Swtich', 'Clow')
    const expandable = boolean('expandable', true)
    return {
      components: { KtBanner },
      template: `<KtBanner message="${message}" :expandable="${expandable}" :isGrey="true" actionText="${actionText}"  actionTextSwitch="${actionTextSwitch}">
      <div slot="glyph"><i class="yoco">cloud</i></div>
      <div slot="expand"><h1>New message</h1></div>
      </KtBanner>`
    }
  })