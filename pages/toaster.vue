<template>
  <div>
    <h1 id="toaster">Toaster</h1>
    <p>Toaster is a small message showing on upper right corner of the user screen, and disappears after few seconds. </p>
    <p>Using toaster can deliver message that need user pay attention without interrupt user&#39;s current workflow. Using banners
      is better solution, when the message is important and shouldn&#39;t be self-disappeared without user&#39;s action.</p>
    <h2 id="structure">Structure</h2>
    <img src="~/assets/img/toaster_structure.png" />
    <ol>
      <li>
        <strong>Type Colour:</strong> Depends on the type of toaster, there are two colours,
        <code>Green-500</code> for success information and
        <code>Red-500</code> for fail/alter message.</li>
      <li>
        <strong>Message:</strong> Keep the message short and easy to understand, since the toast disappears automatically after few
        seconds.</li>
      <li>
        <strong>Close Button:</strong> Allow user to dismiss this message. </li>
    </ol>
    <h2 id="implementation">Implementation</h2>
    <p>You can use toaster
      <a href="https://github.com/3YOURMIND/vue-yodify">vue-yodify</a> as plugin in your vuejs project.</p>
  </div>
</template>

