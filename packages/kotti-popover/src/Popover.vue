<template>
	<transition name="popover">
		<div :class="`popover popover-${position}`">
			<slot name="toggle" />
			<div class="popover-container">
				<slot name="content"></slot>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'KtPopover',
	props: {
		position: { default: 'bottom', type: String },
	},
}
</script>
