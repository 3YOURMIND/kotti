<template>
	<div class="kt-tag">
		<div class="kt-tag__text" v-text="text" />
		<div
			v-if="!isDisabled"
			class="kt-tag__icon"
			@click.prevent.stop="$emit('close')"
		>
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

<style lang="scss">
:root {
	--kt-tag-vertical-gap: var(--unit-h);
	--kt-tag-horizontal-gap: var(--unit-1);
	--kt-tag-border: var(--unit-q);
	--kt-tag-padding: var(--unit-1);
}
</style>

<style lang="scss" scoped>
.kt-tag {
	display: inline-flex;
	align-items: center;
	padding: var(--kt-tag-padding);
	margin: var(--kt-tag-vertical-gap) var(--kt-tag-horizontal-gap);
	font-size: 0.875em;
	color: var(--text-02);
	text-transform: capitalize;
	white-space: nowrap;
	background-color: var(--interactive-02);
	border: var(--kt-tag-border) solid var(--ui-02);
	border-radius: var(--field-border-radius);

	&__icon {
		$size: 1.25em;

		display: flex;
		align-items: center;
		justify-content: center;
		width: $size;
		height: $size;
		margin-left: var(--unit-1);
		cursor: pointer;
		background-color: var(--ui-02);
		border-radius: 50%;

		// clipping also affects the clickable area
		@supports (clip-path: circle(#{$size * 0.5} at center)) {
			clip-path: circle(#{$size * 0.5} at center);
			border-radius: 0;
		}

		&:hover {
			background-color: var(--interactive-02-hover);
		}
	}
}
</style>
