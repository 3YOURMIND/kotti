<template lang="md">

# Toaster

A toaster is a small message shown in the upper right corner of the screen, which disappears after few seconds.

Toasters can deliver messages that the user needs to pay attention to without interrupting their current workflow. Using banners is a better solution, when the message is important and shouldn't automatically disappear without user's action.

## Structure
![Toaster Structure](~/assets/img/toaster_structure.png)

1. Type Colour: Depends on the type of toaster. There are two colours:
	* `Green-500`: for success information and
	*	`Red-500`: for fail/alert message.
	*	`Orange-500`: for warning message.

2. Message: Keep the message short and easy to understand, since the toaster disappears automatically after a few seconds.

3. Close Button: Allows the user to dismiss this message.

## Usage

Since `Kotti-UI 1.0.0`, [vue-yodify](https://github.com/3YOURMIND/vue-yodify) is merged into Kotti-UI as `KtToaster`.

<div class="element-example">
<KtToaster/>
<button @click="$yodify({text: 'Wow very looooooooooooong text, and it breaks the line!', type: 'success'})">Long Message</button>
<button @click="$yodify({text: 'Error message', type: 'error'})">Error Message</button>
<button @click="$yodify({text: 'Warning message', type: 'warning'})">Warning Message</button>
</div>

You should include `KtToaster` as global componet in your Vue applications.

```html
<!-- for example in app.vue -->
<template>
  <div id="app">
    <KtToaster />
    <router-view />
  </div>
</template>
```
After registering the component you can call it globally by using the Vue instance in the script part of a component.

```js
this.$yodify({
  text: 'This was successful :)',
  type: 'success', // optional, default
  duration: 3000, // optional, default
});
```
### Attributes

| Attribute   | Description                         | Type     | Accepted values               | Default   |
|:------------|:------------------------------------|:---------|:------------------------------|:----------|
| `text`      | text message in the toaster         | `String` | -                             | -         |
| `type`      | define the type of the toaster      | `String` | `success`, `error`, `warning` | `success` |
| `durationg` | the duration when toaster disappear | `Number` | -                             | `3000`    |


</template>

<script>
export default { name: 'KtToasterDoc' }
</script>
