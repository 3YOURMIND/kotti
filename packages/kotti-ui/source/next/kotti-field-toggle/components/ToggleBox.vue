<template>
	<div class="kt-field-toggle-box">
		<div class="kt-field-toggle-box__inner">
			<svg
				class="kt-field-toggle-box__check"
				fill="none"
				height="8"
				viewBox="0 0 9 8"
				width="9"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1 3.92761L2.92242 6L8 1"
					stroke-linecap="round"
					stroke-width="2"
				/>
			</svg>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	name: 'ToggleBox',
})
</script>

<style lang="scss">
@import '../../kotti-field/mixins';

@mixin toggle-colors($check-stroke-color, $border-color, $shadow-main) {
	border-color: $border-color;
	box-shadow: var(--shadow-base), 0px 0px 0px 1px $shadow-main inset;

	.kt-field-toggle-box__check {
		path {
			stroke: $check-stroke-color;
		}
	}
}

.kt-field-toggle-box {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 0.8rem;
	height: 0.8rem;
	background: var(--ui-background);
	border: 1px solid var(--ui-02);
	border-radius: var(--toggle-border-radius);
	transition: border-color ease-in-out var(--transition-short);

	&__check {
		transition: all ease-in-out var(--transition-short);
	}

	&__inner {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 0.5rem;
		height: 0.5rem;
		background-color: transparent;
		transition: all ease-in-out var(--transition-short);
	}
}

.kt-field-toggle__inner {
	&--is-indeterminate .kt-field-toggle-box {
		@include toggle-colors(
			var(--interactive-01),
			var(--interactive-01),
			var(--interactive-01)
		);

		&__check {
			opacity: 0;
			transform: scale(0);
		}

		&__inner {
			background-color: var(--interactive-04);
		}
	}

	&--is-on .kt-field-toggle-box {
		@include toggle-colors(
			var(--interactive-01),
			var(--interactive-01),
			var(--interactive-01)
		);

		&__check {
			opacity: 1;
			transform: scale(1);
		}
	}

	&--is-off .kt-field-toggle-box {
		&__check {
			opacity: 0;
			transform: scale(0);
		}
	}
}

.kt-field__wrapper {
	@include validations using ($type) {
		@if $type != empty {
			:not(.kt-field-toggle__inner--is-disabled) {
				.kt-field-toggle-box {
					/* stylelint-disable */
					@include toggle-colors(
						var(--support-#{$type}),
						var(--support-#{$type}),
						var(--support-#{$type}-light)
					);
					/* stylelint-enable */
				}
			}
		}
	}

	&:focus-within {
		&.kt-field__wrapper--is-validation-empty {
			.kt-field-toggle-box {
				@include toggle-colors(
					var(--interactive-03),
					var(--interactive-03),
					var(--interactive-03)
				);
			}
		}
	}
}

.kt-field-toggle__inner--is-disabled {
	&.kt-field-toggle__inner {
		&--is-indeterminate .kt-field-toggle-box {
			/* stylelint-disable */
			@include toggle-colors(var(--ui-02), var(--ui-02), var(--ui-01));
			/* stylelint-enable */

			.kt-field-toggle-box__inner {
				background-color: var(--ui-02);
			}
		}

		&--is-off .kt-field-toggle-box {
			/* stylelint-disable */
			@include toggle-colors(var(--ui-02), var(--ui-02), var(--ui-01));
			/* stylelint-enable */
		}

		&--is-on .kt-field-toggle-box {
			/* stylelint-disable */
			@include toggle-colors(var(--ui-02), var(--ui-02), var(--ui-01));
			/* stylelint-enable */
		}
	}
}
</style>
