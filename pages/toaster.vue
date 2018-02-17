<template>
  <div>
    <h1 id="toaster">Toaster</h1>
    <p>A toaster is a small message shown in the upper right corner of the screen, which disappears after few seconds. </p>
    <p>Toasters can deliver messages that the user needs to pay attention to without interrupting their current workflow. Using banners
      is a better solution, when the message is important and shouldn&#39;t automatically disappear without user&#39;s action.</p>
    <h2 id="structure">Structure</h2>
    <img src="~/assets/img/toaster_structure.png" />
    <ol>
      <li>
        <strong>Type Colour:</strong> Depends on the type of toaster. There are two colours:
        <code>Green-500</code> for success information and
        <code>Red-500</code> for fail/alter message.</li>
      <li>
        <strong>Message:</strong> Keep the message short and easy to understand, since the toaster disappears automatically after a few
        seconds.</li>
      <li>
        <strong>Close Button:</strong> Allows the user to dismiss this message. </li>
    </ol>
    <h2 id="implementation">Implementation</h2>
    <p>You can use our toaster,
      <a href="https://github.com/3YOURMIND/vue-yodify">vue-yodify</a>, as a plugin in your vuejs project.</p>
  </div>
</template>

<script>
export default {
  name: 'Toaster'
}
</script>
