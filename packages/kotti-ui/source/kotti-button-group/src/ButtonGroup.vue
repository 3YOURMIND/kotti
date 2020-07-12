<template>
	<div :class="objectClass">
		<slot />
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

<style lang="scss">
@import '../../kotti-style/_variables.scss';
.button-group {
	/** Fix for inline element space
	https://css-tricks.com/fighting-the-space-between-inline-block-elements/ **/
	font-size: 0;

	.kt-button {
		font-size: $font-size;
		border-radius: 0;
	}

	.kt-button:first-of-type {
		border-radius: $border-radius 0 0 $border-radius;
	}

	.kt-button:last-of-type {
		border-radius: 0 $border-radius $border-radius 0;
	}

	&--shadow {
		box-shadow: 0 1px 2px rgba($color: #000000, $alpha: 0.24);
	}
}
</style>
