<template lang=md>

	# Horizontal Lines

	You can use horizontal row to separte similar elements to create a better information structure.

	You can add `text` to `KtLine` to display the text in the middle.

	<div class="element-example white">
		<h4>Login Options</h4>
		<p>Login with you account</p>
		<KtButton type="primary">Login</KtButton>
		<KtLine text="Or Login with Google"/>
		<KtButton type="secondary">Connect Google</KtButton>
		<KtLine text="Or"/>
		<p>Register a new account</p>
		<KtLine/>
		<p>Text below</p>
	</div>

	```html
	<KtLine text="Or Login with Google"/>
	```

</template>

<script>
import KtLine from '../../../packages/kotti-line'
import KtButton from '../../../packages/kotti-button'
export default {
	name: 'LinePage',
	components: {
		KtLine,
		KtButton,
	},
}
</script>
