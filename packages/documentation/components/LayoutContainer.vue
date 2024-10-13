<template>
	<div class="kt-container">
		<slot name="navbar" />
		<slot v-if="hasActionBar" name="actionbar" />
		<div class="workspace">
			<slot name="workspace" />
		</div>
	</div>
</template>

<script>
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

/* eslint-disable perfectionist/sort-objects */
export default {
	name: 'LayoutContainer',
	computed: {
		hasActionBar() {
			return Boolean(this.$slots.actionbar)
		},
	},
}
/* eslint-enable perfectionist/sort-objects */
</script>
