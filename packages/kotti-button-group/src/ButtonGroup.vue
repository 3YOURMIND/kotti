<template>
	<div :class="objectClass">
		<slot/>
	</div>
</template>

<script>
export default {
	name: 'KtButtonGroup',
	props: {
		shadow: Boolean,
	},
	computed: {
		objectClass() {
			return {
				'button-group': true,
				'button-group--shadow': this.shadow,
			}
		},
	},
}
</script>
