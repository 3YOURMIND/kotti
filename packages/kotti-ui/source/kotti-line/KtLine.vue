<template>
	<div class="kt-line">
		<div v-if="position !== Position.LEFT" class="kt-line__line" />
		<div v-if="text" :class="textClasses" @click="handleClick" v-text="text" />
		<div v-if="position !== Position.RIGHT" class="kt-line__line" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { makeProps } from '../make-props'

import { KottiLine } from './types'

export default defineComponent({
	name: 'KtLine',
	props: makeProps(KottiLine.propsSchema),
	emits: ['click'],
	setup(props, { emit }) {
		return {
			handleClick: () => {
				if (props.isInteractive) emit('click')
			},
			Position: KottiLine.Position,
			textClasses: computed(() => ({
				'kt-line__text': true,
				'kt-line__text--is-interactive': props.isInteractive,
			})),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-line {
	display: flex;
	align-items: center;
	height: 0.8rem;
	margin: 0.2rem 0;

	&__line {
		flex: 1 1 auto;
		width: 100%;
		height: 1px;
		background: var(--ui-02);
	}

	&__text {
		flex: 1 0 auto;
		padding: 0 0.4rem;
		font-size: 0.6rem;
		color: var(--text-03);
		text-align: center;

		&--is-interactive {
			font-size: 0.8rem;
			color: var(--interactive-01);
			cursor: pointer;
		}
	}
}
</style>
