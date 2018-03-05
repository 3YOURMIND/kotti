<template lang="md">
  # Inputs
  
  ## Input Status
  
  There are 4 statuses for input fields:

  ![Inputs Status](~/assets/img/input_status.png)

  1. **Default:** Normal input field for use in most cases.
  2. **Focused:** For when a user is typing.
  3. **Invalid:** For when a given input is wrong or has an error.
  4. **Disabled:** For when a user shouldn't be able to enter text.

  ## Feedback Inputs
  
  Input can give a user real time feedback by validating the user's input in the backend or giving help information.

  ![Inputs with feedback](~/assets/img/input_feedback.png)

  1. **Indicator:** Gives a user feedback about their input in real time.
  2. **Help icon:** Use a help icon when input is hard to understand or hard to find.
  3. **Popup/Tooltip:** Detailed text to help a user to understand the purpose of this input.

  <div class="element-example">
    <div class="form-group has-icon-right">
      <label class="form-label" for="input-example-1">Name</label>
      <div class="has-icon-right">
          <input class="form-input" type="text" placeholder="Name">
          <i class="form-icon yoco">circle_question</i>
        </div>
    </div>
  </div>

  ```html
  <div class="element-example">
    <div class="form-group">
      <label class="form-label">Name</label>
      <div class="has-icon-right">
        <input class="form-input" type="text" placeholder="Name">
        <i class="form-icon yoco">circle_question</i>
      </div>
    </div>
  </div>
  ```

  ## Icon Inputs

  Icon inputs don't need label text to help the user understand them. Recommended for use on common inputs, such as data pickers or search boxes.

  <div class="element-example">
    <div class="form-group">
      <div class="has-icon-left">
        <input class="form-input" type="text" placeholder="Search 3D Project">
        <i class="form-icon yoco">search</i>
      </div>
    </div>
  </div>

  ```html
    <div class="form-group">
      <div class="has-icon-left">
        <input class="form-input" type="text" placeholder="Search 3D Project">
        <i class="form-icon yoco">search</i>
      </div>
    </div>
  ```



  ## Prefix Inputs

  When an value needs a fixed prefix or suffix, in order to make sure user doesn't put it in input field, 
  use an add-on input to indicate that system has already pre-input this value.

  <div class="element-example">
  <div class="form-group">
    <label class="form-label" for="input-example-1">Price</label>
    <div class="input-group">
      <span class="input-group-addon">$</span>
      <input type="text" class="form-input" placeholder="...">
    </div>
  </div>
  </div>

  ```html
  <div class="form-group">
    <label class="form-label" for="input-example-1">Price</label>
    <div class="input-group">
      <span class="input-group-addon">$</span>
      <input type="text" class="form-input" placeholder="...">
    </div>
  </div>
  ```

</template>

<script>
export default {
  name: 'Inputs'
}
</script>
