import { storiesOf } from '@storybook/vue'


import KtButton from '../packages/kotti-button/'

storiesOf('Button', module)
  .add('Different button type', () => {
    return {
      components: { KtButton },
      template: `<div>
      <KtButton>Default</KtButton>
      <KtButton type="primary">Primary</KtButton>
      <KtButton type="text">Text</KtButton>
      <KtButton type="danger">Danger</KtButton>
      <KtButton type="secondary">Secondary</KtButton>
      </div>`
    }
  })
  .add('Disabled button type', () => {
    return {
      components: { KtButton },
      template: `<div>
      <KtButton disabled>Default</KtButton>
      <KtButton type="primary" disabled>Primary</KtButton>
      <KtButton type="text" disabled>Text</KtButton>
      <KtButton type="danger" disabled>Danger</KtButton>
      <KtButton type="secondary" disabled>Secondary</KtButton>
      </div>`
    }
  })
  .add('Button with icon', () => {
    return {
      components: { KtButton },
      template: `<div>
      <KtButton icon="cloud" />
      <KtButton type="primary" icon="announce">Announce</KtButton>
      <KtButton type="danger" icon="trash">Danger</KtButton>
      <KtButton type="secondary" icon="version">New Version</KtButton>
      </div>`
    }
  })
  .add('Loading button', () => {
    return {
      components: { KtButton },
      template: `<div>
      <KtButton type="text" loading>Loading</KtButton>
      <KtButton type="primary" loading>Loading</KtButton>
      <KtButton type="primary" loading />
      </div>`
    }
  })