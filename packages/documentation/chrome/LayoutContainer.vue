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
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'LayoutContainer',
	setup(_, context) {
		return {
			hasActionBar: computed(() => Boolean(context.slots.actionbar)),
		}
	},
})
</script>
