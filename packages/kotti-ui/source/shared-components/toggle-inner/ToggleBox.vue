<template>
	<div class="kt-field-toggle-box">
		<svg
			fill="none"
			height="16"
			viewBox="0 0 16 16"
			width="16"
			xmlns="http://www.w3.org/2000/svg"
		>
			<rect
				class="kt-field-toggle-box__empty"
				height="15"
				rx="0.5"
				width="15"
				x="0.5"
				y="0.5"
			/>
			<path
				class="kt-field-toggle-box__indeterminate"
				d="M15 0H1C0.45 0 0 0.45 0 1V15C0 15.55 0.45 16 1 16H15C15.55 16 16 15.55 16 15V1C16 0.45 15.55 0 15 0ZM12 9H4C3.45 9 3 8.55 3 8C3 7.45 3.45 7 4 7H12C12.55 7 13 7.45 13 8C13 8.55 12.55 9 12 9Z"
			/>
			<path
				class="kt-field-toggle-box__check"
				d="M15 0H1C0.45 0 0 0.45 0 1V15C0 15.55 0.45 16 1 16H15C15.55 16 16 15.55 16 15V1C16 0.45 15.55 0 15 0ZM12.71 5.71L6.5 11.92L3.29 8.71C2.9 8.32 2.9 7.69 3.29 7.3C3.68 6.91 4.31 6.91 4.7 7.3L6.49 9.09L11.28 4.3C11.67 3.91 12.3 3.91 12.69 4.3C13.08 4.69 13.08 5.32 12.69 5.71H12.71Z"
			/>
		</svg>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'ToggleBox',
})
</script>

<style lang="scss">
@import '../../kotti-field/mixins';

@mixin toggle-colors($fill-color) {
	.kt-field-toggle-box__empty {
		stroke: $fill-color;
	}

	.kt-field-toggle-box__check,
	.kt-field-toggle-box__indeterminate {
		fill: $fill-color;
	}
}

.kt-field-toggle-box {
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
	width: 0.8rem;
	height: 0.8rem;
	background: var(--ui-background);
	border: 1px solid transparent;
	transition: border-color ease-in-out var(--transition-short);

	&__check,
	&__indetermiate {
		transition: all ease-in-out var(--transition-short);
	}

	&__inner {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: transparent;
		transition: all ease-in-out var(--transition-short);
	}

	&:focus {
		background-color: red;
	}
}

.kt-field-toggle-inner {
	&--is-off {
		.kt-field-toggle-box {
			@include toggle-colors(var(--text-05));

			&:hover {
				@include toggle-colors(var(--interactive-01-hover));
			}

			&:active {
				@include toggle-colors(var(--interactive-01-active));
			}

			&__check {
				opacity: 0;
				transform: scale(0);
			}

			&__indeterminate {
				display: none;
			}
		}
	}

	&--is-on {
		.kt-field-toggle-box {
			@include toggle-colors(var(--interactive-03));

			&:hover {
				@include toggle-colors(var(--interactive-01-hover));
			}

			&:active {
				@include toggle-colors(var(--interactive-01-active));
			}

			&__check {
				opacity: 1;
				transform: scale(1);
			}

			&__indeterminate {
				display: none;
			}
		}
	}

	&--is-indeterminate {
		.kt-field-toggle-box {
			@include toggle-colors(var(--interactive-03));

			&:hover {
				@include toggle-colors(var(--interactive-01-hover));
			}

			&:active {
				@include toggle-colors(var(--interactive-01-active));
			}

			&__check {
				display: none;
			}

			&__indeterminate {
				opacity: 1;
				transform: scale(1);
			}
		}
	}
}

.kt-field__wrapper {
	@include validations using ($type) {
		@if $type != empty {
			.kt-field-toggle-inner {
				&--is-indeterminate:not(.kt-field-toggle-inner--is-disabled) {
					.kt-field-toggle-box {
						@include toggle-colors(var(--support-#{$type}-light));

						&:hover {
							@include toggle-colors(var(--support-#{$type}-dark));
						}
					}
				}

				&--is-off:not(.kt-field-toggle-inner--is-disabled) {
					.kt-field-toggle-box {
						@include toggle-colors(transparent);

						&:hover {
							@include toggle-colors(transparent);
						}
					}
				}

				&--is-on:not(.kt-field-toggle-inner--is-disabled) {
					.kt-field-toggle-box {
						/* stylelint-disable */
						@include toggle-colors(var(--support-#{$type}));

						&:hover {
							@include toggle-colors(var(--support-#{$type}-dark));
						}
					}
				}
				/* stylelint-enable */
			}
		}
	}
}

.kt-field-toggle-inner--is-disabled {
	&.kt-field-toggle-inner {
		&--is-indeterminate .kt-field-toggle-box {
			@include toggle-colors(var(--text-05));
		}

		&--is-off .kt-field-toggle-box {
			@include toggle-colors(var(--text-05));

			background-color: var(--ui-01);
		}

		&--is-on .kt-field-toggle-box {
			@include toggle-colors(var(--text-05));
		}
	}
}
</style>
