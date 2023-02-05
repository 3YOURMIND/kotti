<template>
	<div class="progress-bar">
		<div class="progress-bar__bar">
			<div :class="fillClasses" :style="{ width: progressPercent }" />
		</div>
		<span class="progress-bar__label" v-text="progressPercent" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { makeProps } from '../../make-props'
import { KottiFieldFileUpload } from '../types'

// eslint-disable-next-line no-magic-numbers
const ONE_HUNDRED_PERCENT = 100 as const

export default defineComponent({
	name: 'ProgressBar',
	props: makeProps(KottiFieldFileUpload.ProgressBar.schema),
	setup(props: KottiFieldFileUpload.ProgressBar.Props) {
		return {
			fillClasses: computed(() => ({
				'progress-bar__bar__fill': true,
				'progress-bar__bar__fill--is-error': props.isError,
			})),
			progressPercent: computed(
				() => `${Math.floor(props.progress * ONE_HUNDRED_PERCENT)}%`,
			),
		}
	},
})
</script>

<style lang="scss" scoped>
.progress-bar {
	display: flex;
	gap: var(--unit-2);
	align-items: center;
	height: var(--unit-5);

	&__bar {
		width: 100%;
		height: var(--unit-2);
		background-color: var(--ui-02);
		border-radius: var(--unit-1);

		&__fill {
			display: block;
			height: 100%;
			background-color: var(--interactive-03);
			border-radius: var(--unit-1);
			transition: width 500ms ease-in-out;

			&--is-error {
				background-color: var(--support-error);
			}
		}
	}

	&__label {
		min-width: fit-content;
		font-size: 16px;
		line-height: 20px;
		color: var(--text-01);
		text-align: end;
	}
}
</style>
