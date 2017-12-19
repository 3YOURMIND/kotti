<template>
  <div>
    <h1 id="buttons">Buttons</h1>
    <p>Use buttons to lead a call to action or guide user to next steps.</p>
    <h2 id="labels">Labels</h2>
    <p>The label text explains the purpose of the button, which should be clearly, self-explained and short. </p>
    <img src="~/assets/img/button_label.png" />
    <p>&quot;Yes/No&quot; buttons are not self-explained, user need to read the context to understand the action. Using &quot;Cancel/Replace&quot;
      buttons let user response quickly without thinking.</p>
    <h2 id="types">Types</h2>
    <div class="columns">
      <div class="column col-6 col-md-12">
        <ol>
          <li>
            <strong>Primary button:</strong>Using primary to lead main call to action, such as change the status of an order, submit
            a form. We suggest only use one primary button on each page (not include the primary button on different layer).
            If there is another strong action needs, compare the priority and choose the most priority one.
          </li>
          <li>
            <strong>Secondary button:</strong> Using secondary button only when there is a main call to action in the page.
          </li>
          <li>
            <strong>Danger button:</strong> Danger button should be used only when an action cause not re-doable status. For example,
            cancel an order or delete a material. Same to primary button, it should also limited to once per page.
            <li>
              <strong>Default button:</strong> This button can be used in most case.
            </li>
            <li>
              <strong>Text button:</strong> Text button can be used for sub-menu, page navigation. It also can pair with primary
              button to destructive action such as &quot;Cancel&quot;.
            </li>
        </ol>
      </div>
      <div class="column col-6 col-md-12">
        <img class="white" src="~/assets/img/button_types.png" />
      </div>
    </div>
    <h2 id="variations">Variations</h2>
    <div class="columns">
      <div class="column col-6 col-md-12">
        <ol>
          <li>
            <strong>Label only:</strong> Used in most case.
          </li>
          <li>
            <strong>Icon and label:</strong> Use when need draw more attention from users.
          </li>
          <li>
            <strong>Icon only:</strong> Use when limited space such as page needs to fit in mobile device, and single icon is enough
            to convey the meaning.
          </li>
        </ol>
      </div>
      <div class="column col-6 col-md-12">
        <img class="white" src="~/assets/img/button_variations.png" />
      </div>
    </div>
  </div>
</template>




<style lang="scss" scoped>
.yoda-btn {
  border: 0;
  width: 100%;
  border-radius: .1rem;
  height: 1.6rem;
  padding: 0 .8rem;
  text-transform: uppercase;
}
.primary {
  background: #2C66C4;
  color: #fff;
  &:hover {
    background: #2659AB;
  }
}
.secondary {
  background: #FFFFFF;
  color: #2C66C4;
  font-weight: 600;
  border: 1px solid #2C66C4;
  &:hover {
    color: #2659AB;
    border: 1px solid #2659AB;
    background: #f8f8f8;
  }
}
.danger {
  background: #f8f8f8;
  color: #D91919;
  font-weight: bold;
  &:hover {
    color: #fff;
    background: #D91919;
  }
}
.text {
  font-weight: bold;
  background: transparent;
  color: #2C66C4;
  &:hover {
    color: #2659AB;
    background: #f8f8f8;
  }
}
</style>
