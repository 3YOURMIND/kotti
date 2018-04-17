<template lang="md">
  # Buttons
  
  Use buttons to lead a call to action or guide a user to their next steps.</p>
  
  ## Labels
  
  The label text explains the purpose of the button, which should be clear, self-explanatory and short.

  ![Button labels](~/assets/img/button_label.png)

  `Yes/No` buttons are not self-explanatory, the user needs to read the
  context to understand the action. Using `Cancel/Replace` buttons
  let the user respond quickly without thinking.

  ## Types

  <KtButton type="primary">Primary Button</KtButton>
  <KtButton type="secondary">Secondary Button</KtButton>
  <KtButton type="danger">Danger Button</KtButton>
  <KtButton>Default Button</KtButton>
  <KtButton type="text">Text Button</KtButton>

  **Primary button**
  
  Use the primary button to lead a main call to
  action, such as changing the status of an order, or submitting a form. We suggest
  only using one primary button on each page (not including the primary button
  on a different layer). If there is another strong action needed, compare
  their priority and choose the most important one.

  **Secondary Button**

  Use a secondary button only when there is a main call to action in the page.

  **Danger Button**

  The danger button should be used only for actions which can't be undone. 
  For example, canceling an order or deleting a material. Like the primary button, it should also limited to once per page.

  **Default button**
  
  This button can be used in most cases.

  **Text button**
  
  A text button can be used for sub-menus and page navigation. It also can pair with a primary button for destructive actions such as `Cancel`.
 

  
  ## Icon

  <KtButton type="primary" icon="edit" class="mr-16px">Edit button</KtButton>
  <KtButton type="primary" icon="edit" />
  
  **Label only:** Used in most cases.

  **Icon and label:** Use when you need to catch the user's attention.

  **Icon only:** Use when you have limited space, such as when the page needs to fit on a mobile device, and a single icon is enough to convey the meaning.

  ```html
  <KtButton type="primary" icon="edit">Edit button</KtButton>
  <KtButton type="primary" icon="edit" />
  ```
  ## Loading

  <KtButton type="primary" loading icon="edit">Loading button</KtButton>

  ```html
  <KtButton type="primary" loading icon="edit">Loading button</KtButton>
  ```

  <div v-html="buttonUsage" />

</template>

<script>
import ButtonUsage from '../../packages/kotti-button/README.md'
import KtButton from '../../packages/kotti-button'
import ShowCase from '../components/ShowCase'

export default {
  name: 'Buttons',
  components: {
    KtButton, ShowCase
  },
  computed: {
    buttonUsage() {
      return ButtonUsage
    }
  }
}
</script>