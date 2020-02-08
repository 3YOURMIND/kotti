<template>
	<div class="kt-container">
		<slot name="navbar" />
		<slot name="actionbar" v-if="hasActionBar" />
		<div class="workspace">
			<slot name="workspace" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtContainer',
	computed: {
		hasActionBar() {
			return Boolean(this.$slots.actionbar)
		},
	},
}
</script>
