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
