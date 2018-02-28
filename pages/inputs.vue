<template>
<div>
  <h1>Inputs</h1>
  <p>Use a text input to let user enter, select and serach for text. </p>

<h2 id="inputstatus">Input Status</h2>

<p>There are 4 statuses for input fields:</p>
<img src="~/assets/img/input_status.png" />
<ol>
<li><strong>Default:</strong> Normal input field for use in most cases.</li>

<li><strong>Focused:</strong> For when a user is typing.</li>

<li><strong>Invalid:</strong> For when a given input is wrong or has an error.</li>

<li><strong>Disabled:</strong> For when a user shouldn't be able to enter text.</li>
</ol>

<h2 id="feedbackinputs">Feedback Inputs</h2>

<p>This type of input can give a user real time feedback by validating the user's input in the backend or giving help information. </p>
<img src="~/assets/img/input_feedback.png" />
<ol>
<li><strong>Indicator:</strong> Gives a user feedback about their input in real time</li>

<li><strong>Help icon:</strong> Use a help icon when input is hard to understand or hard to find.</li>

<li><strong>Popup/Tooltip:</strong> Detailed text to help a user to understand the purpose of this input. </li>
</ol>

<h2 id="iconinputs">Icon Inputs</h2>

<p>Icon inputs don't need label text to help the user understand them. Recommended for use on common inputs, such as data pickers or search boxes.</p>
<img src="~/assets/img/input_icons.png" />
<ol>
<li><strong>Icons:</strong> Choose an icon which represents the objective of this input.</li>

<li><strong>Placeholder:</strong> Short text to explain the input type.</li>
</ol>

<h2 id="inputaddson">Prefix Inputs</h2>

<p>When an value needs a fixed prefix or suffix, in order to make sure user doesn't put it in input field, use an add-on input to indicate that system has already pre-input this value. </p>
<img src="~/assets/img/input_addson.png" />
<ol>
<li>Prefix for currency</li>
<li>User only needs to input the number</li>
</ol>
<div class="form-group">
  <label class="form-label" for="input-example-1">Name</label>
  <div class="input-group">
    <span class="input-group-addon">Name</span>
    <input type="text" class="form-input" placeholder="...">
  </div>
</div>
<div class="form-group has-icon-left">
  <label class="form-label" for="input-example-1">Name</label>
  <input class="form-input form-input--invalid" type="text" id="input-example-1" placeholder="Name">
  <i class="form-icon yoco">heart</i>
</div>
<div class="form-group has-icon-right">
  <label class="form-label" for="input-example-1">Name</label>
  <input class="form-input form-input--disabled" type="text" disabled placeholder="Name">
  <i class="form-icon form-icon--error yoco">circle_cross</i>
</div>
</div>
</template>

<script>
export default {
  name: 'Inputs'
}
</script>
