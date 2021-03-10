<template>
	<div
		class="kt-popover-item"
		:class="{
			'kt-popover-item--is-disabled': isDisabled,
		}"
		v-on="$listeners"
	>
		<i v-if="icon" class="yoco" v-text="icon" />
		<div v-text="label" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent<{
	icon: string | null
	isDisabled: boolean
	label: string | null
}>({
	name: 'IconTextItem',
	props: {
		icon: { default: null, type: String },
		isDisabled: { default: false, type: Boolean },
		label: { default: null, type: String },
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.kt-popover-item {
	display: flex;
	padding: $unit-2;
	margin: $unit-h;
	line-height: 20px;
	cursor: pointer;

	&:hover {
		background: var(--gray-10);
		border-radius: $border-radius;
	}

	.yoco {
		align-self: center;
		padding-right: $unit-1;
		font-size: 20px;
	}

	&--is-disabled {
		cursor: not-allowed;

		opacity: 0.46;
	}
}
</style>
