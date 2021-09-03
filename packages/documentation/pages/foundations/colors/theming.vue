<template lang="md">
# Theming

You can apply your own theme to the kotti design system.
Since we are defining design tokens with CSS custom properties, you can override any of them easily, on the fly.

## Method 1: CSS file

One easy way of theming kotti component is to overwrite custom props using CSS diretcly. You will need to load this file after loading kotti CSS tho.

Example:

```css
.kt-navbar {
	--navbar-background: red;
	--navbar-color: blue;
}
```

or

```css
:root {
	--navbar-background: red;
	--navbar-color: blue;
}
```

## Method 2: Using the `KtTheme` component (deprecated)

CSS custom props can be get and set using javascript. We take advantage of that in our `KtTheme` component.

You can pass a key-value object to the component and the component will `setProperty` on `:root` for you.

```vue
<KtTheme
	:customProperties="{ 'navbar-background': 'red', 'navbar-color': 'blue' }"
/>
```

## Demo

Stylise the navbar with the select fields:

<KtFieldSingleSelect isOptional label="Navbar Background" v-model="navbarBackground" :options="colors" />
<KtFieldSingleSelect isOptional label="Navbar Color" v-model="navbarColor" :options="colors" />
<KtFieldSingleSelect isOptional label="Navbar Light Color" v-model="navbarLightColor" :options="colors" />
<KtFieldSingleSelect isOptional label="Navbar Border Color" v-model="navbarBorder" :options="colors" />
<KtFieldSingleSelect isOptional label="Navbar Color Active" v-model="navbarColorActive" :options="colors" />

<KtTheme :customProperties="{'navbar-background': navbarBackground, 'navbar-color': navbarColor, 'navbar-color-light': navbarLightColor, 'navbar-border': navbarBorder, 'navbar-color-active': navbarColorActive}"/>
</template>

<script>
export default {
	name: 'Theming',
	data() {
		return {
			navbarBackground: null,
			navbarColor: null,
			navbarLightColor: null,
			navbarBorder: null,
			navbarColorActive: null,
			colors: [
				{ label: 'Default', value: null },
				{ label: 'Blue', value: '#001f3f' },
				{ label: 'Red', value: '#FF4136' },
				{ label: 'Green', value: '#2ECC40' },
				{ label: 'Teal', value: '#39CCCC' },
				{ label: 'White', value: 'white' },
				{ label: 'Black', value: '#111111' },
			],
		}
	},
}
</script>
