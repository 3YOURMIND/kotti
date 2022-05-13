<template>
	<KtPopover
		v-if="options.length > 0"
		:clickBehavior="Kotti.Popover.HIDE_ON_CLICK_AWAY"
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
	name: 'CommentOptions',
	props: {
		options: { type: Array, required: true },
	},
	setup() {
		return {
			Kotti,
		}
	},
})
</script>

