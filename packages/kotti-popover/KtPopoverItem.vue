<template>
	<div class="kt-popover-item">
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
.kt-popover-item {
	display: flex;
	line-height: 20px;
	padding: $unit-2;
	margin: $unit-h;
	&:hover {
		background: $lightgray-300;
		border-radius: $border-radius;
		cursor: pointer;
	}
	.yoco {
		align-self: center;
		font-size: 20px;
		padding-right: $unit-1;
	}
}
</style>
