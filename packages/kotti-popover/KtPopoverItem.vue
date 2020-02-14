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
