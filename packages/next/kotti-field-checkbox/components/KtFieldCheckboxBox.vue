<template>
	<div :class="checkboxClass">
		<svg
			class="kt-field-checkbox__check"
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
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
	name: 'KtFieldCheckboxBox',
	props: {
		value: {
			required: true,
			type: Boolean,
		},
	},
	setup(props) {
		return {
			checkboxClass: computed(() => ({
				'kt-field-checkbox': true,
				'kt-field-checkbox--checked': props.value,
			})),
		}
	},
})
</script>

<style lang="scss">
@import '../../kotti-field/mixins';

@mixin checkbox-colors($check-stroke-color, $border-color, $shadow-main) {
	border-color: $border-color;
	box-shadow: var(--shadow-base), 0px 0px 0px 1px $shadow-main inset;

	.kt-field-checkbox__check {
		path {
			stroke: $check-stroke-color;
		}
	}
}

.kt-field-checkbox {
	display: inline-grid;
	place-items: center;
	width: 0.8rem;
	height: 0.8rem;
	margin-right: 0.4rem;
	margin-left: 0.1rem;
	background: var(--ui-background);
	border: 1px solid var(--ui-02);
	border-radius: var(--checkbox-border-radius);
	transition: border-color ease-in-out var(--transition-short);

	&__check {
		opacity: 0.2;
		transition: all ease-in-out var(--transition-short);
		transform: scale(0.2);
	}

	&--checked {
		@include checkbox-colors(
			var(--interactive-01),
			var(--interactive-01),
			var(--interactive-01)
		);

		.kt-field-checkbox {
			&__check {
				opacity: 1;
				transform: scale(1);
			}
		}
	}
}

.kt-field__wrapper {
	@include validations using ($type) {
		@if $type != no-validation {
			&:not(.kt-field__wrapper--disabled) {
				.kt-field-checkbox {
					/* stylelint-disable */
					@include checkbox-colors(
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
		&.kt-field__wrapper--no-validation {
			.kt-field-checkbox {
				@include checkbox-colors(
					var(--interactive-03),
					var(--interactive-03),
					var(--interactive-03)
				);
			}
		}
	}

	&--disabled {
		cursor: not-allowed;

		.kt-field-checkbox {
			@include checkbox-colors(var(--text-05), var(--ui-02), var(--ui-01));
		}
	}
}
</style>
