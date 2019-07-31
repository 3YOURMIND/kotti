<template>
	<div class="kt-dropdown-button">
		<KtPopover v-bind="$attrs" :placement="placement">
			<KtButtonGroup>
				<KtButton class="kt-dropdown-button__button" v-bind="$attrs">
					<slot>Dropdown Text</slot>
				</KtButton>
				<KtButton
					class="kt-dropdown-button__icon"
					v-bind="$attrs"
					icon="chevron_down"
				>
					<i class="yoco" v-text="chevron_down" />
				</KtButton>
			</KtButtonGroup>
			<div slot="content">
				<slot name="KtDropdownMenus">Dropdown Menu</slot>
			</div>
		</KtPopover>
	</div>
</template>
<script>
import KtButton from '../kotti-button'
import KtButtonGroup from '../kotti-button-group'
import KtPopover from '../kotti-popover'

export default {
	name: 'KtDropdownButton',
	props: {
		placement: {
			type: String,
			default: 'top-end',
		},
		size: {
			type: String,
			default: null,
		},
	},
	components: {
		KtButton,
		KtButtonGroup,
		KtPopover,
	},
}
</script>
<style lang="scss">
.kt-dropdown-button {
	.button-group {
		display: flex;
		position: relative;
		margin-right: 32px;
	}
}
.kt-dropdown-button__button {
	pointer-events: none;
	position: relative;
	z-index: 1;
}
.kt-dropdown-button__icon {
	border-left: 0 !important;
	padding: 0 $unit-2;
	position: absolute;
	left: 0;
	padding-left: 100%;
	border-radius: 0.2em !important;
	.yoco {
		margin: 0;
		margin-left: $unit-1;
	}
	span .yoco {
		display: none;
	}
}
</style>
