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

  ![Button types](~/assets/img/button_types.png)

  ### Primary button
  
  Use the primary button to lead a main call to
  action, such as changing the status of an order, or submitting a form. We suggest
  only using one primary button on each page (not including the primary button
  on a different layer). If there is another strong action needed, compare
  their priority and choose the most important one.
  
  <button class="primary">Primary Action</button>
  
  ```html
  <button class="primary">Primary Action</button>
  ```

  ### Secondary butto 
  
  Use a secondary button only when there is a main call to action in the page.

    <button class="secondary">Secondary Button</button>
  
  ```html
  <button class="secondary">Secondary Button</button>
  ```

  ### Danger button
  
  
  The danger button should be used only for actions which can't be undone. 
  For example, canceling an order or deleting a material. Like the primary button, it should also limited to once per page.

  <button class="danger">Danger Action</button>

    
  ```html
  <button class="danger">Secondary Button</button>
  ```


  ### Default button
  
  This button can be used in most cases.

  <button>Default Button</button>

  ```html
  <button>Default Button</button>
  ```


  ### Text button
  
  A text button can be used for sub-menus and page navigation. It also can pair with a primary button for destructive actions such as `Cancel`.
 
  <button class="text">Cancel</button>

  ```html
  <button class="text">Cancel</button>
  ```
  ## Variations
  ![Button variations](~/assets/img/button_variations.png)

  **Label only:** Used in most cases.
  
  **Icon and label:** Use when you need to catch the user's attention.

  <button class="primary icon-text"><i class="yoco">edit</i>text button</button>

  ```html
  <button class="primary icon-text"><i class="yoco">edit</i>text button</button>
  ```

  **Icon only:** Use when you have limited space, such as when the page needs to fit on a mobile device, and a single icon is enough to convey the meaning.

  <button class="primary icon"><i class="yoco">edit</i></button>

  ```html
  <button class="primary icon"><i class="yoco">edit</i></button>
  ```

</template>

<script>
export default {
  name: 'Buttons'
}
</script>

<style lang="scss" scoped>
.yoda-btn {
  border: 0;
  width: 100%;
  border-radius: 0.1rem;
  height: 1.6rem;
  padding: 0 0.8rem;
  text-transform: uppercase;
}

.primary {
  background: #2c66c4;
  color: #fff;
  &:hover {
    background: #2659ab;
  }
}

.secondary {
  background: #ffffff;
  color: #2c66c4;
  font-weight: 600;
  border: 1px solid #2c66c4;
  &:hover {
    color: #2659ab;
    border: 1px solid #2659ab;
    background: #f8f8f8;
  }
}

.danger {
  background: #f8f8f8;
  color: #d91919;
  font-weight: bold;
  &:hover {
    color: #fff;
    background: #d91919;
  }
}

.text {
  font-weight: bold;
  background: transparent;
  color: #2c66c4;
  &:hover {
    color: #2659ab;
    background: #f8f8f8;
  }
}
</style>
