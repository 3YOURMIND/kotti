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
				<slot name="content">Dropdown Menu</slot>
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
	components: {
		KtButton,
		KtButtonGroup,
		KtPopover,
	},
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
}
</script>
<style lang="scss">
@import '../../kotti-style/_variables.scss';
.kt-dropdown-button {
	display: inline-block;
	margin: 0 $unit-1;
	.button-group {
		position: relative;
		display: flex;
		margin-right: 32px;
	}
	.kt-popper {
		padding-top: $unit-1;
		padding-right: $unit-1;
		padding-right: 0;
		padding-bottom: $unit-1;
		padding-left: $unit-1;
		padding-left: 0;
	}
}
.kt-dropdown-button__button {
	position: relative;
	z-index: 1;
	pointer-events: none;
}
.kt-dropdown-button__icon {
	position: absolute;
	left: 0;
	padding: 0 $unit-2;
	padding-left: 100%;
	border-left: 0 !important;
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
