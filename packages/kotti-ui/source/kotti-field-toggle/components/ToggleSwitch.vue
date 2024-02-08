<template>
	<div class="kt-field-toggle-switch">
		<div class="kt-field-toggle-switch__inner" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ToggleSwitch',
})
</script>

<style lang="scss">
@import '../../kotti-field/mixins';

$outer-size: 20px;
$inner-size: 16px;
$inner-gap: ($outer-size - $inner-size) * 0.5;
$track-width: $inner-size * 2.25;

@mixin switch-colors($outer-color, $inner-color) {
	/* background-color: $outer-color; */
	box-shadow: 0 0 1px $outer-color;

	.kt-field-toggle-switch__inner {
		background-color: $inner-color;
	}
}

.kt-field-toggle-switch {
	width: #{$track-width + 2 * $inner-gap};
	height: $outer-size;
	padding: $inner-gap;
	background-color: var(--ui-02);
	border-radius: #{$outer-size * 0.5};

	&__inner {
		width: $inner-size;
		height: $inner-size;
		border-radius: $inner-size * 0.5;
		transition: all 0.2s ease-in-out;
	}
}

.kt-field-toggle-inner {
	&--is-disabled.kt-field-toggle-inner .kt-field-toggle-switch__inner {
		background-color: var(--ui-01);
	}

	&--is-indeterminate .kt-field-toggle-switch__inner {
		width: $track-width;
		background-color: var(--gray-30);
	}

	&--is-off .kt-field-toggle-switch__inner {
		margin-left: 0;
		background-color: var(--ui-03);
	}

	&--is-on .kt-field-toggle-switch__inner {
		margin-left: #{$track-width - $inner-size};
		background-color: var(--interactive-03);
	}
}

.kt-field__wrapper {
	@include validations using ($type) {
		@if $type != empty {
			:not(.kt-field-toggle-inner--is-disabled) .kt-field-toggle-switch {
				@include switch-colors(
					var(--support-#{$type}),
					var(--support-#{$type}-dark)
				);
			}
		}
	}
}
</style>
