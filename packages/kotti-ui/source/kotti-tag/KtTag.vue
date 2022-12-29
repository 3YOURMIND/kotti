<template>
	<div class="kt-tag">
		<div class="kt-tag__text" v-text="text" />
		<div v-if="isClosable" class="kt-tag__icon" @click="$emit('close')">
			<i class="yoco" v-text="Yoco.Icon.CLOSE" />
		</div>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { defineComponent } from '@vue/composition-api'

import { makeProps } from '../make-props'

import { KottiTag } from './types'

export default defineComponent({
	name: 'KtTag',
	props: makeProps(KottiTag.propsSchema),
	setup() {
		return {
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
$vertical-tag-gap: 2px;
$horizontal-tag-gap: 4px;
$tag-padding: 0.4em;
$tag-border: 1px;

.kt-tag {
	display: inline-flex;
	align-items: center;
	padding: $tag-padding;
	margin: $vertical-tag-gap $horizontal-tag-gap;

	font-size: 0.875em;

	color: var(--text-02);
	text-transform: capitalize;
	white-space: nowrap;
	background-color: var(--interactive-02);
	border: $tag-border solid var(--ui-02);
	border-radius: var(--field-border-radius);

	&__icon {
		$size: 1.25em;

		display: flex;
		align-items: center;
		justify-content: center;
		width: $size;
		height: $size;
		margin-left: 4px;
		cursor: pointer;

		background-color: var(--ui-02);
		border-radius: 50%;

		// clipping also affects the clickable area
		@supports (clip-path: circle(#{$size / 2} at center)) {
			clip-path: circle(#{$size / 2} at center);
			border-radius: 0;
		}

		&:hover {
			background-color: var(--interactive-02-hover);
		}
	}
}
</style>
