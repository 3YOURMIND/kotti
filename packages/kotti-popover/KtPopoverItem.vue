<template>
	<div v-bind="$attrs" class="kt-popover-item" v-on="$listeners">
		<i v-show="icon" class="yoco" v-text="icon" />
		<slot />
	</div>
</template>

<script>
export default {
	name: 'KtPopoverItem',
	props: {
		icon: {
			type: String,
			default: null,
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
}
</style>
