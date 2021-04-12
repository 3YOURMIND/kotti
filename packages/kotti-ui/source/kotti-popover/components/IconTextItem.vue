<template>
	<div
		class="kt-popover-options-item"
		:class="{
			'kt-popover-options-item--is-disabled': isDisabled,
		}"
		:data-test="dataTest"
		v-on="$listeners"
	>
		<i v-if="icon" class="yoco" v-text="icon" />
		<div v-text="label" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent<{
	dataTest: string | null
	icon: string | null
	isDisabled: boolean
	label: string | null
}>({
	name: 'IconTextItem',
	props: {
		dataTest: { default: null, type: String },
		icon: { default: null, type: String },
		isDisabled: { default: false, type: Boolean },
		label: { default: null, type: String },
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.kt-popover-options-item {
	display: flex;
	align-items: center;
	padding: $unit-2;
	cursor: pointer;
	border-radius: $border-radius;

	&--is-disabled {
		cursor: not-allowed;
		opacity: 0.46;
	}

	&:not(.kt-popover-options-item--is-disabled) {
		&:hover {
			background-color: var(--ui-01);
		}
	}

	.yoco {
		font-size: 1rem;
	}

	> *:not(:first-child) {
		margin-left: $unit-1;
	}
}
</style>
