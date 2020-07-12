<template lang="md">
# Design tokens

Design token are abstracting values used for our design system. It allow us to use meaningful
names and to never use hardcoded values.
It also open us to a lot of theming features.

## Usage

We store the tokens in JSON files. We can then easily export these to SCSS, CSS custom properties
and even figma styles for colors!
We enforce CSS custom properties over SCSS variables.
The `ie11-custom-properties` package ensure IE11 support.
Here is how weuse CSS custom properties:

``` css
  /* set a css custom property */
  --text-01: #000;
  --background-01: #f5f5f5;

  /* read a property */
  color: var(--text-01)
  background-color: var(--background-01)
```


</template>

<script>
export default {
	name: 'Index',
}
</script>
