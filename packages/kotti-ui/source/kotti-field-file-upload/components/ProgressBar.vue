<template>
	<div class="progress-bar">
		<div class="progress-bar__background">
			<div :class="fillClasses" :style="{ width: progressCssWidth }" />
		</div>
		<div class="progress-bar__label-wrapper">
			<!-- HACK: this invisible span calculates the width for "99%" -->
			<span
				class="progress-bar__label"
				style="user-select: none; opacity: 0"
				v-text="'99%'"
			/>
			<span class="progress-bar__label" v-text="progressPercent" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { ONE_HUNDRED_PERCENT } from '../../constants'
import { makeProps } from '../../make-props'
import { KottiFieldFileUploadRemote } from '../types'

export default defineComponent({
	name: 'ProgressBar',
	props: makeProps(KottiFieldFileUploadRemote.ProgressBar.schema),
	setup(props) {
		return {
			fillClasses: computed(() => ({
				'progress-bar__fill': true,
				'progress-bar__fill--is-error': props.isError,
			})),
			progressCssWidth: computed(
				() => `${String(props.progress * ONE_HUNDRED_PERCENT)}%`,
			),
			progressPercent: computed(
				() => `${String(Math.floor(props.progress * ONE_HUNDRED_PERCENT))}%`,
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

	&__background {
		width: 100%;
		height: var(--unit-2);
		background-color: var(--ui-02);
		border-radius: var(--unit-1);
	}

	&__fill {
		display: block;
		height: 100%;
		background-color: var(--interactive-03);
		border-radius: var(--unit-1);
		transition: width 50ms ease-in-out;

		&--is-error {
			background-color: var(--support-error);
		}
	}

	&__label-wrapper {
		display: grid;
	}

	&__label {
		grid-row: 1;
		grid-column: 1;
		font-size: 16px;
		font-variant-numeric: tabular-nums;
		line-height: 20px;
		color: var(--text-01);
		text-align: end;
	}
}
</style>
