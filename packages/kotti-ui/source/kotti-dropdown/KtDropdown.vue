<template>
	<div class="kt-dropdown">
		<KtPopover :placement="placement" :size="size">
			<slot />
			<div slot="content">
				<slot name="KtDropdownMenus" />
				<slot name="content" />
			</div>
		</KtPopover>
	</div>
</template>

<script>
import KtPopover from '../kotti-popover/KtPopover.vue'

export default {
	name: 'KtDropdown',
	components: {
		KtPopover,
	},
	props: {
		placement: {
			type: String,
			default: 'bottom-start',
		},
		size: {
			type: String,
			default: null,
		},
	},
}
</script>
