<template>
	<div
		v-bind="$attrs"
		class="kt-popover-item"
		:class="{
			'kt-popover-item--disabled': isDisabled,
		}"
		v-on="$listeners"
	>
		<i v-show="icon" class="yoco" v-text="icon" />
		<div>{{ text }}</div>
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
		},
		text: {
			type: String,
		},
	},
}
</script>

<style lang="scss">
@import '../kotti-style/_variables.scss';
.kt-popover-item {
	display: flex;
	padding: $unit-2;
	margin: $unit-h;
	line-height: 20px;
	&:hover {
		cursor: pointer;
		background: $lightgray-300;
		border-radius: $border-radius;
	}
	.yoco {
		align-self: center;
		padding-right: $unit-1;
		font-size: 20px;
	}
	&--disabled {
		color: #ccc;
		cursor: auto;
	}
}
</style>
