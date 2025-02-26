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
	.kt-field-toggle-switch {
		background-color: $outer-color;

		&__inner {
			background-color: $inner-color;
		}
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
	&--is-indeterminate {
		@include switch-colors(var(--interactive-01), var(--interactive-04));

		.kt-field-toggle-switch__inner {
			width: $track-width;
		}

		&:hover {
			@include switch-colors(
				var(--interactive-01-hover),
				var(--interactive-01-hover)
			);
		}

		&:active {
			@include switch-colors(
				var(--interactive-01-active),
				var(--interactive-01-active)
			);
		}
	}

	&--is-off {
		@include switch-colors(var(--ui-02), var(--white));

		.kt-field-toggle-switch__inner {
			margin-left: 0;
		}

		&:hover {
			@include switch-colors(var(--ui-03), var(--white));
		}

		&:active {
			@include switch-colors(var(--ui-04), var(--white));
		}
	}

	&--is-on {
		@include switch-colors(var(--interactive-03), var(--white));

		.kt-field-toggle-switch__inner {
			margin-left: #{$track-width - $inner-size};
		}

		&:hover {
			@include switch-colors(var(--interactive-01-hover), var(--white));
		}

		&:active {
			@include switch-colors(var(--interactive-01-active), var(--white));
		}
	}
}

.kt-field-toggle-inner--is-disabled {
	&.kt-field-toggle-inner {
		&--is-indeterminate {
			@include switch-colors(var(--text-05), var(--ui-02));
		}

		&--is-off {
			@include switch-colors(var(--text-05), var(--ui-01));
		}

		&--is-on {
			@include switch-colors(var(--text-05), var(--ui-01));
		}
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
