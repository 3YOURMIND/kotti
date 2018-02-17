<template>
  <div>
    <h1 id="buttons">Buttons</h1>
    <p>Use buttons to lead a call to action or guide a user to their next steps.</p>
    <h2 id="labels">Labels</h2>
    <p>
      The label text explains the purpose of the button, which should be
      clear, self-explanatory and short.
    </p>
    <img src="~/assets/img/button_label.png" />
    <p>
      &quot;Yes/No&quot; buttons are not self-explanatory, the user needs to read the
      context to understand the action. Using &quot;Cancel/Replace&quot; buttons
      let the user respond quickly without thinking.
    </p>
    <h2 id="types">Types</h2>
    <img src="~/assets/img/button_types.png" />
    <ol>
      <li>
        <strong>Primary button:</strong>Use the primary button to lead a main call to
        action, such as changing the status of an order, or submitting a form. We suggest
        only using one primary button on each page (not including the primary button
        on a different layer). If there is another strong action needed, compare
        their priority and choose the most important one.
      </li>
      <li>
        <strong>Secondary button:</strong> Use a secondary button only when
        there is a main call to action in the page.
      </li>
      <li>
        <strong>Danger button:</strong> The danger button should be used only for
        actions which can't be undone. For example, canceling an order or
        deleting a material. Like the primary button, it should also limited to
        once per page.
      </li>
      <li>
        <strong>Default button:</strong> This button can be used in most cases.
      </li>
      <li>
        <strong>Text button:</strong> A text button can be used for sub-menus and page
        navigation. It also can pair with a primary button for destructive actions
        such as &quot;Cancel&quot;.
      </li>
    </ol>

    <h2 id="variations">Variations</h2>
    <div class="columns">
      <div class="column col-6 col-md-12">
        <ol>
          <li>
            <strong>Label only:</strong> Used in most cases.
          </li>
          <li>
            <strong>Icon and label:</strong> Use when you need to catch the user's
            attention.
          </li>
          <li>
            <strong>Icon only:</strong> Use when you have limited space, such as
            when the page needs to fit on a mobile device, and a single icon is
            enough to convey the meaning.
          </li>
        </ol>
      </div>
      <div class="column col-6 col-md-12">
        <img class="white" src="~/assets/img/button_variations.png" />
      </div>
    </div>
  </div>
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
