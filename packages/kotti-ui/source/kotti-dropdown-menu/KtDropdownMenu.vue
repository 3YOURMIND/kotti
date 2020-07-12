<template>
	<div class="kt-dropdown-menu">
		<KtPopoverItem :icon="icon">
			<slot />
		</KtPopoverItem>
	</div>
</template>

<script>
import KtPopoverItem from '../kotti-popover/KtPopoverItem.vue'

export default {
	name: 'KtDropdownMenu',
	components: { KtPopoverItem },
	props: {
		icon: {
			type: String,
			default: null,
		},
	},
}
</script>
