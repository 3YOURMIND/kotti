<template>
	<slot />
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue'

import { KT_IS_IN_POPOVER } from '../constants'

export default defineComponent({
	name: 'ContextEscapeWrapper',
	setup() {
		/**
		 * For nested popovers/tooltips, we don't want to stay
		 * inside the same CSS stacking context.
		 */
		provide(KT_IS_IN_POPOVER, false)

		return {}
	},
})
</script>
