<template>
	<div class="kt-field-toggle-switch" :class="switchClasses">
		<div class="kt-field-toggle-switch__inner" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
	name: 'ToggleSwitch',
	props: {
		value: { default: null, type: Boolean },
	},
	setup(props) {
		return {
			switchClasses: computed(() => ({
				'kt-field-toggle-switch--is-indeterminate': props.value === null,
				'kt-field-toggle-switch--is-off': props.value === false,
				'kt-field-toggle-switch--is-on': props.value === true,
			})),
		}
	},
})
</script>

<style lang="scss">
@import '../../kotti-field/mixins';

$outer-size: 20px;
$inner-size: 16px;
$inner-gap: ($outer-size - $inner-size) / 2;
$track-width: $inner-size * 2.25;

@mixin switch-colors($outer-color, $inner-color) {
	background-color: $outer-color;

	.kt-field-toggle-switch__inner {
		background-color: $inner-color;
	}
}

.kt-field-toggle-switch {
	width: #{$track-width + 2 * $inner-gap};
	height: $outer-size;
	padding: $inner-gap;
	margin-right: 0.4rem;
	background-color: var(--ui-02);
	border-radius: #{$outer-size / 2};

	&--is-indeterminate .kt-field-toggle-switch__inner {
		width: $track-width;
		background-color: var(--ui-01);
	}

	&--is-on .kt-field-toggle-switch__inner {
		margin-left: #{$track-width - $inner-size};
		background-color: var(--interactive-03);
	}

	&--is-off .kt-field-toggle-switch__inner {
		margin-left: 0;
		background-color: var(--ui-03);
	}

	&__inner {
		width: $inner-size;
		height: $inner-size;
		border-radius: $inner-size / 2;
		transition: all 0.2s ease-in-out;
	}
}

.kt-field__wrapper {
	@include validations using ($type) {
		@if $type != no-validation {
			&:not(.kt-field__wrapper--disabled) {
				.kt-field-toggle-switch {
					/* stylelint-disable */
					@include switch-colors(
						var(--support-#{$type}-light),
						var(--support-#{$type})
					);
					/* stylelint-enable */
				}
			}
		}
	}
}

.kt-field__wrapper--disabled .kt-field-toggle-switch {
	opacity: 0.5;
}
</style>
