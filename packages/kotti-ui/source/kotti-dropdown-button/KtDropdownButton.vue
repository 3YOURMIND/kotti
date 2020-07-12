<template>
	<div class="kt-dropdown-button">
		<KtPopover
			v-bind="$attrs"
			:disabled="disabled"
			:placement="placement"
			:size="size"
		>
			<KtButtonGroup>
				<KtButton
					v-bind="$attrs"
					class="kt-dropdown-button__button"
					:disabled="disabled"
				>
					<slot>Dropdown Text</slot>
				</KtButton>
				<KtButton
					v-bind="$attrs"
					class="kt-dropdown-button__icon"
					:disabled="disabled"
					:icon="dropdownIcon"
				>
					<i class="yoco" v-text="dropdownIcon" />
				</KtButton>
			</KtButtonGroup>
			<div v-if="!disabled" slot="content">
				<slot name="content">Dropdown Menu</slot>
			</div>
		</KtPopover>
	</div>
</template>

<script>
import KtButtonGroup from '../kotti-button-group/src/ButtonGroup.vue'
import KtButton from '../kotti-button/src/button.vue'
import KtPopover from '../kotti-popover/src/Popover.vue'

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
		disabled: {
			type: Boolean,
			default: false,
		},
	},
}
</script>

<style lang="scss">
// It may not look like much, but this actually does fix the build
// I’m sorry
// FIXME: pls someone remove this monstrosity
.some,
.ok {
	.noise,
	.then {
		.pls,
		.that {
			.fix,
			.this {
				.this,
				.thus {
					color: red;
				}
			}
		}
	}
}

@import '../kotti-style/_variables.scss';
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
}
.kt-dropdown-button__icon {
	position: absolute;
	left: -1px;
	padding: 0 $unit-2;
	margin-left: 100%;
	pointer-events: none;
	border-left: 0 !important;
	border-radius: 0.2em !important;
	.yoco {
		padding-left: $unit-2;
		margin: 0 !important;
		margin-left: $unit-1;
	}
	span .yoco {
		display: none;
	}
}
</style>
