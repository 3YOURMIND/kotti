<template>
	<div class="kt-button-group">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { KottiButtonGroup } from './types'

export default defineComponent<KottiButtonGroup.PropsInternal>({
	name: 'KtButtonGroup',
})
</script>

<style lang="scss">
@import '../kotti-style/_variables.scss';

.kt-button-group {
	font-size: 0; /* Fix for inline element space https://css-tricks.com/fighting-the-space-between-inline-block-elements/ */

	.kt-button {
		font-size: $font-size;
		border-radius: 0;

		&:first-of-type {
			border-radius: $border-radius 0 0 $border-radius;
		}

		&:last-of-type {
			border-radius: 0 $border-radius $border-radius 0;
		}
	}
}
</style>
