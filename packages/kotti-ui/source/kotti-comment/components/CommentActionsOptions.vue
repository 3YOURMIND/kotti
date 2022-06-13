<template>
	<KtPopover
		v-if="options.length > 0"
		class="kt-comment__actions__more-options"
		:options="options"
		placement="bottom"
		trigger="click"
	>
		<i class="yoco" v-text="'dots'" />
	</KtPopover>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { KtPopover } from '../../kotti-popover'
import { Kotti } from '../../types'

export default defineComponent<{
	options: Array<Kotti.Popover.Props['options']>
}>({
	name: 'CommentActionsOptions',
	components: {
		KtPopover,
	},
	props: {
		options: { type: Array, required: true },
	},
})
</script>
