import { storiesOf } from '@storybook/vue'


import KtButton from '../packages/kotti-button/'

storiesOf('Button', module)

  .add('Default', () => {
    return {
      components: { KtButton },
      template: `<KtButton />`
    }
  })