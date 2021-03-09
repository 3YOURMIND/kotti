<template>
	<div
		class="kt-popover-item"
		:class="{
			'kt-popover-item--is-disabled': isDisabled,
		}"
		v-on="$listeners"
	>
		<i v-if="icon" class="yoco" v-text="icon" />
		<div>{{ label }}</div>
	</div>
</template>

<script>
export default {
	name: 'KtPopoverIconTextItem',
	props: {
		icon: {
			type: String,
			default: null,
		},
		isDisabled: {
			type: Boolean,
			default: false,
		},
		label: {
			type: String,
			default: null,
		},
	},
}
</script>

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';
.kt-popover-item {
	display: flex;
	padding: $unit-2;
	margin: $unit-h;
	line-height: 20px;
	&:hover {
		cursor: pointer;
		background: var(--gray-10);
		border-radius: $border-radius;
	}
	.yoco {
		align-self: center;
		padding-right: $unit-1;
		font-size: 20px;
	}
	&--is-disabled {
		opacity: 0.46;
		&:hover {
			cursor: not-allowed;
		}
	}
}
</style>
