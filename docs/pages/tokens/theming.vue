<template lang="md">
# Theming

You can apply your own theme to the kotti design system.
Since we are defining design tokens with CSS custom properties, you can override any of them easily, on the fly.

> We are defining every custom props on `:root` because only root variables are supported by  [css-vars-ponyfill](https://github.com/jhildenbiddle/css-vars-ponyfill)>, the ponyfill we are using. 
> If you don't care about IE11 support, you can overwrite custom props on any element.

## Method 1: CSS file
One easy way of theming kotti component is to overwrite custom props using CSS diretcly. You will need to load this file after loading kotti CSS tho.

Example:
``` css 
:root{
  --navbar-background: red;
  --navbar-color: blue;
}
```

## Method 2: Using the `KtTheme` component 
CSS custom props can be get and set using javascript. We take advantage of that in our `KtTheme` component.

You can pass a key-value object to the component and the component will `setProperty` on `:root` fro you.

``` vue
<KtTheme :customProperties="{'navbar-background': 'red', 'navbar-color': 'blue'}"/>
```
## Demo 
Stylise the navbar with the select fields:

<KtSelect :allowEmpty="true" label="Navbar Background" v-model="navbarBackground" :options="colors" />
<KtSelect :allowEmpty="true" label="Navbar Color" v-model="navbarColor" :options="colors" />
<KtSelect :allowEmpty="true" label="Navbar Light Color" v-model="navbarLightColor" :options="colors" />
<KtSelect :allowEmpty="true" label="Navbar Border Color" v-model="navbarBorder" :options="colors" />
<KtSelect :allowEmpty="true" label="Navbar Color Active" v-model="navbarColorActive" :options="colors" />

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
				{ label: 'Blue', value: 'blue' },
				{ label: 'Red', value: 'red' },
				{ label: 'Green', value: 'green' },
				{ label: 'White', value: 'white' },
				{ label: 'Black', value: 'black' },
			],
		}
	},
}
</script>
