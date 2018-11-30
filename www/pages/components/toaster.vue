<template lang="md">

# Toaster

A toaster is a small message shown in the upper right corner of the screen, which disappears after few seconds.

Toasters can deliver messages that the user needs to pay attention to without interrupting their current workflow. Using banners is a better solution, when the message is important and shouldn't automatically disappear without user's action.

## Structure
![Toaster Structure](~/assets/img/toaster_structure.png)

1. Type Colour: Depends on the type of toaster. There are two colours:
	* `Green-500`: for success information and
	*	`Red-500`: for fail/alert message.

2. Message: Keep the message short and easy to understand, since the toaster disappears automatically after a few seconds.

3. Close Button: Allows the user to dismiss this message.

## Implementation

You can use our toaster, [vue-yodify](https://github.com/3YOURMIND/vue-yodify) as a plugin in your vuejs project.

</template>

<script>
export default { name: 'KtToasterDoc' }
</script>
