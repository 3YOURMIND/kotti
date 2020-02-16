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
import KtPopover from '../kotti-popover'
export default {
	name: 'KtDropdown',
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
	components: {
		KtPopover,
	},
}
</script>
