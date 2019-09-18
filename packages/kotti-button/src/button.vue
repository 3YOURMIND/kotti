<template>
	<component
		:is="element"
		:class="mainClasses"
		:style="themeColor"
		@click="handleClick"
		@mouseover="isHover = true"
		@mouseleave="isHover = false"
		role="button"
	>
		<i v-if="loading" class="kt-circle-loading" :style="loadingStyle" />
		<i v-else-if="icon" class="yoco" v-text="icon" />
		<span v-if="hasSlot"> <slot /> </span> <span v-else v-text="label" />
	</component>
</template>

<script>
import color from 'color'

export default {
	name: 'KtButton',
	props: {
		icon: { default: '', type: String },
		element: { type: String, default: 'button' },
		label: { default: null, type: String },
		loading: { default: false, type: Boolean },
		size: { default: null, type: String },
		type: { default: null, type: String },
	},
	inject: {
		KtTheme: {
			default: {
				brandColor: '#2c66c4',
				dangerColor: '#d91919',
			},
		},
	},
	data() {
		return {
			isHover: false,
		}
	},
	computed: {
		hasSlot() {
			return Boolean(this.$slots.default)
		},
		loadingStyle() {
			const circleColor =
				this.type === 'primary' ? '#ffffff' : this.KtTheme.brandColor
			return {
				'border-left-color': circleColor,
				'border-bottom-color': circleColor,
			}
		},
		mainClasses() {
			const classes = ['kt-btn', this.type, this.objectClass]
			if (this.size === 'small') classes.push('sm')
			if (this.size === 'large') classes.push('lg')
			return classes
		},
		objectClass() {
			return {
				icon: this.icon,
				'icon-only': this.icon && !this.$slots.default && !this.label,
			}
		},
		themeColor() {
			switch (this.type) {
				case 'primary':
					return {
						color: color(this.KtTheme.brandColor).isDark()
							? '#ffffff'
							: '#3d3d3d',
						'background-color': this.hoverColor(this.KtTheme.brandColor),
						'border-color': color(this.KtTheme.brandColor).darken(0.24),
					}

				case 'danger':
					return {
						color: this.isHover ? '#ffffff' : this.KtTheme.dangerColor,
						'background-color': this.isHover ? this.KtTheme.dangerColor : null,
						'border-color': this.isHover ? this.KtTheme.dangerColor : null,
					}

				case 'secondary':
					return {
						color: this.hoverColor(this.KtTheme.brandColor),
						'border-color': this.hoverColor(this.KtTheme.brandColor),
					}

				case 'text':
					return { color: this.hoverColor(this.KtTheme.brandColor) }

				default:
					return { color: this.hoverColor(this.KtTheme.brandColor) }
			}
		},
	},
	methods: {
		handleClick(event) {
			this.$emit('click', event)
		},
		hoverColor(orginalColor) {
			return this.isHover ? color(orginalColor).darken(0.24) : orginalColor
		},
	},
}
</script>
<style lang="scss">
$default-button-height: $unit-8;
$large-button-height: $unit-9;
$small-button-height: $unit-6;

.kt-btn {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-align: center;

	height: $default-button-height;
	padding: 0 1em;

	background: $lightgray-300;
	color: $primary-600;
	font-weight: 600;
	outline: none;
	user-select: none;

	border: 1px solid $lightgray-400;
	border-radius: $border-radius;
	&.tooltip::after {
		font-size: $font-size-sm;
		text-transform: none;
	}

	&:hover {
		color: $primary-600;
		cursor: pointer;
	}
}

.kt-btn.sm {
	height: $small-button-height;
}

.kt-btn.lg {
	height: $large-button-height;
}

.kt-btn.primary {
	background: $primary-500;
	color: #ffffff;
	border: 1px solid $primary-600;

	&:hover {
		background: $primary-400;
	}
}

.kt-btn.secondary {
	border: 1px solid $primary-500;
	background: #fff;
	color: $primary-500;
	font-weight: 600;

	&:hover {
		color: $primary-400;
		border: 1px solid $primary-400;
		background: $lightgray-300;
	}
}

.kt-btn.text {
	color: $primary-500;
	font-weight: 600;
	background: transparent;
	border-color: transparent;
	&:hover {
		background: $lightgray-300;
	}
}

.kt-btn.danger {
	background: #f8f8f8;
	color: $red-500;
	font-weight: 600;

	&:hover {
		color: #ffffff;
		background: $red-400;
	}
}

.kt-btn.icon i {
	font-size: 1rem;
	margin-right: 0.2rem;
}

.kt-btn.icon-only {
	padding: 0 0.3rem;
	i {
		margin-right: 0;
	}
}

.kt-btn.disabled,
.kt-btn:disabled {
	opacity: 0.46;
	pointer-events: none;
}

.kt-btn.bottom {
	min-width: 10rem;
	margin-top: $unit-8;
}
</style>
