<template>
	<div class="kt-dropdown">
		<KtPopover :placement="placement" :size="size">
			<slot>Dropdown Text</slot>
			<div slot="content">
				<slot name="KtDropdownMenus">Dropdown Menu</slot>
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
