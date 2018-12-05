<template>
	<button
		:class="mainClasses"
		:style="themeColor"
		@click="handleClick"
		@mouseover="isHover = true"
		@mouseleave="isHover = false"
	>
		<i v-if="loading" class="kt-circle-loading" :style="loadingStyle" />
		<i v-else-if="icon" class="yoco" v-text="icon" />
		<span v-if="hasSlot"> <slot /> </span> <span v-else v-text="label" />
	</button>
</template>

<script>
import color from 'color'

export default {
	name: 'KtButton',
	props: {
		icon: { default: '', type: String },
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
			const classes = [this.type, this.objectClass]
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
