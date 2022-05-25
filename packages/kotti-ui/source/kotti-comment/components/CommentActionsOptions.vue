<template>
	<KtPopover
		v-if="options.length > 0"
		class="kt-comment__actions__more-options"
		:clickBehavior="clickBehavior"
		:options="options"
		placement="bottom"
		trigger="click"
	>
		<i class="yoco" v-text="'dots'" />
	</KtPopover>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { Kotti } from '../../types'

export default defineComponent<{
	options: Array<Kotti.Popover.Props['options']>
}>({
	name: 'CommentActionsOptions',
	props: {
		options: { type: Array, required: true },
	},
	setup() {
		return {
			clickBehavior: Kotti.Popover.ClickBehavior.HIDE_ON_CLICK_AWAY,
		}
	},
})
</script>

