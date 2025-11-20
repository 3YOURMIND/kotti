<template>
	<div :class="classes">
		<div v-if="label" class="kt-tag__label">{{ label }}:&nbsp;</div>
		<slot>
			<div class="kt-tag__text" v-text="text" />
		</slot>
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
import { computed, defineComponent } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { makeProps } from '../make-props'

import { KottiTag } from './types'

export default defineComponent({
	name: 'KtTag',
	props: makeProps(KottiTag.propsSchema),
	emits: ['close'],
	setup(props) {
		return {
			classes: computed(() => ({
				[`kt-tag--is-${props.colorStyle}`]: true,
				'kt-tag': true,
			})),
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
$colors:
	'blue', 'gray', 'green', 'mint', 'orange', 'primary', 'purple', 'red',
	'slate', 'violet', 'yellow';

.kt-tag {
	display: inline-flex;
	align-items: center;
	padding: var(--kt-tag-padding);
	margin: var(--kt-tag-vertical-gap) var(--kt-tag-horizontal-gap);
	font-size: 0.875em;
	color: var(--text-02);
	white-space: nowrap;
	background-color: var(--interactive-02);
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
		border-radius: 50%;

		// clipping also affects the clickable area
		@supports (clip-path: circle(#{$size * 0.5} at center)) {
			border-radius: 0;
			clip-path: circle(#{$size * 0.5} at center);
		}
	}

	&__label {
		font-weight: bold;
	}

	@each $color in $colors {
		&--is-#{$color}-light {
			color: var(--#{$color}-70);
			background-color: var(--#{$color}-10);
			border: var(--kt-tag-border) solid var(--#{$color}-20);

			.kt-tag__icon:not(:hover) {
				background-color: var(--#{$color}-20);
			}
		}

		&--is-#{$color}-filled {
			color: var(--#{$color}-05);
			background-color: var(--#{$color}-60);

			.kt-tag__icon:not(:hover) {
				background-color: var(--#{$color}-50);
			}
		}
	}
}
</style>
