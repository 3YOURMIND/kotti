<template>
	<div
		class="kt-popover-options-item"
		:class="{
			'kt-popover-options-item--is-disabled': isDisabled,
			'kt-popover-options-item--is-selected': isSelected,
		}"
		:data-test="dataTest"
		:tabindex="isDisabled ? -1 : 0"
		v-on="$listeners"
	>
		<i v-if="icon" class="yoco" v-text="icon" />
		<div v-if="label" v-text="label" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent<{
	dataTest: string | null
	icon: string | null
	isDisabled: boolean
	isSelected: boolean
	label: string | null
}>({
	name: 'IconTextItem',
	props: {
		dataTest: { default: null, type: String },
		icon: { default: null, type: String },
		isDisabled: { default: false, type: Boolean },
		isSelected: { default: false, type: Boolean },
		label: { default: null, type: String },
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-field/mixins';

.kt-popover-options-item {
	@include no-outline;

	display: flex;
	align-items: center;
	padding: var(--unit-2);
	cursor: pointer;
	border-radius: var(--border-radius);

	&--is-disabled {
		cursor: not-allowed;
		opacity: 0.46;
	}

	&--is-selected {
		font-weight: 700;
		color: var(--interactive-03);
	}

	&:not(.kt-popover-options-item--is-disabled) {
		&:hover {
			background-color: var(--ui-01);
			&.kt-popover-options-item--is-selected {
				color: var(--interactive-01-hover);
			}
		}
	}

	.yoco {
		font-size: 1rem;
	}

	> *:not(:first-child) {
		margin-left: var(--unit-1);
	}
}
</style>
