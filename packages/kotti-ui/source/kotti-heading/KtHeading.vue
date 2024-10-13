<template>
	<div>
		<h3>
			<span class="kt-heading__title" v-text="text" />
			<span
				v-if="type === KottiHeading.Type.ACTION"
				class="kt-heading__button"
				@click="handleClick"
			>
				{{ actionText }} <i class="yoco" v-text="icon" />
			</span>
			<span
				v-if="type === KottiHeading.Type.TOGGLE"
				class="kt-heading__button"
				@click="handleClick"
			>
				{{ toggleTextRep }}
				<i
					class="yoco"
					v-text="toggleStatus ? Yoco.Icon.MINUS : Yoco.Icon.PLUS"
				/>
			</span>
		</h3>
		<div v-if="toggleStatus && type === KottiHeading.Type.TOGGLE">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { makeProps } from '../make-props'

import { KottiHeading } from './types'

export default defineComponent({
	name: 'KtHeading',
	props: makeProps(KottiHeading.propsSchema),
	emits: ['click', 'toggle'],
	setup(props, { emit }) {
		return {
			handleClick: (event: Event) => {
				if (props.type === KottiHeading.Type.ACTION) {
					emit('click', event)
				}
				if (props.type === KottiHeading.Type.TOGGLE) {
					emit('toggle', event)
				}
			},
			KottiHeading,
			toggleTextRep: computed(() =>
				props.toggleStatus ? props.toggleCloseText : props.toggleText,
			),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-heading__button {
	display: flex;
	align-items: center;
	float: right;
	font-weight: 500;
	color: var(--interactive-01);

	&:hover {
		color: var(--interactive-01);
		cursor: pointer;
	}
}

.kt-heading__title {
	flex: 1;
}

h3 {
	display: flex;
	align-items: center;

	i.yoco {
		font-size: 1rem;
	}
}
</style>
