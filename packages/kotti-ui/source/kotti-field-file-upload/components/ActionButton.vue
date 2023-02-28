<template>
	<div :class="classes" @click="$emit('click')">
		<i class="yoco" v-text="icon" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { makeProps } from '../../make-props'
import { Shared } from '../types'

export default defineComponent({
	name: 'ActionButton',
	props: makeProps(Shared.ActionButton.schema),
	setup(props: Shared.ActionButton.Props) {
		return {
			classes: computed(() => ({
				'action-button': true,
				'action-button--is-disabled': props.isDisabled,
			})),
		}
	},
})
</script>

<style lang="scss" scoped>
.action-button {
	display: flex;
	align-items: center;
	height: var(--unit-8);
	padding: 0 var(--unit-2);
	font-size: 1rem;
	color: var(--interactive-01);
	cursor: pointer;
	border-radius: var(--border-radius);

	&:not(&--is-disabled):hover {
		color: var(--interactive-01-hover);
		background-color: var(--interactive-02-hover);
		border-color: var(--interactive-02-hover);
	}

	&--is-disabled {
		pointer-events: none;
		opacity: 0.46;
	}
}
</style>
