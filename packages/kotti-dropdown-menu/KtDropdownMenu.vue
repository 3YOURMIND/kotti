<template>
	<div class="kt-dropdown-menu">
		<i v-show="icon" class="yoco" v-text="icon" />
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'KtDropdownMenu',
	props: {
		icon: {
			type: String,
			default: null,
		},
	},
}
</script>
<style lang="scss">
.kt-dropdown-menu {
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
