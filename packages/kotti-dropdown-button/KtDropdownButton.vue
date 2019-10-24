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
					:icon="dropdownIcon"
				>
					<i class="yoco" v-text="dropdownIcon" />
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
		dropdownIcon: {
			type: String,
			default: 'chevron_down',
		},
		placement: {
			type: String,
			default: 'bottom-end',
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
	display: inline-block;
	margin: 0 $unit-1;
	.button-group {
		display: flex;
		position: relative;
		margin-right: 32px;
	}
	.kt-popper {
		padding-left: 0;
		padding-right: 0;
		padding-top: $unit-1;
		padding-bottom: $unit-1;
	}
	.kt-dropdown-menu {
		margin-left: 0;
		margin-right: 0;
		padding-left: $unit-3;
		padding-right: $unit-3;
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
