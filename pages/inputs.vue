<template>
<div>
  <h1>Inputs</h1>
  <p>Use text input to let user enter, select and serach for text. </p>

<h2 id="inputstatus">Input Status</h2>

<p>There are 4 status of input fields:</p>
<img src="~/assets/img/input_status.png" />
<ol>
<li><strong>Default:</strong> Normal input field in most case.</li>

<li><strong>Focused:</strong> When user is typing or typing indicator in the input field.</li>

<li><strong>Invaild:</strong> When given input is wrong or has an error.</li>

<li><strong>Disabeld:</strong> User can't enter text.</li>
</ol>

<h2 id="feedbackinputs">Feedback Inputs</h2>

<p>This type of inputs can give user a real time feedback by validate user's input with backend or giving help information. </p>
<img src="~/assets/img/input_feedback.png" />
<ol>
<li><strong>Indicator:</strong> Give user feedback of their inputs real time</li>

<li><strong>Help icon:</strong> Place help icon when input is hard to understand or hard to find.</li>

<li><strong>Popup/Tooltip:</strong> Detailed text to help user to understand the purpose of this input. </li>
</ol>

<h2 id="iconinputs">Icon Inputs</h2>

<p>Icon inputs doesn't need label text to help user understand. Recommend to use on common inputs, such as: data picker, serach box.</p>
<img src="~/assets/img/input_icons.png" />
<ol>
<li><strong>Icons:</strong> Choose an icon represents the objective of this input.</li>

<li><strong>Placeholder:</strong> Small text to explain the input type.</li>
</ol>

<h2 id="inputaddson">Prefix Inputs</h2>

<p>When an value needs fixed prefix or suffix, in order to make sure user don't put prefix or suffix in input field, use adds-on input to indicate that system is already pre-input this value. </p>
<img src="~/assets/img/input_addson.png" />
<ol>
<li>Prefix for currency</li>
<li>User only need input the number</li>
</ol>
</div>
</template>

<script>
export default {
  name: 'Inputs'
}
</script>
