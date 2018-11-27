<template>
	<button
		:class="mainClasses"
		:style="themeColor"
		@click="handleClick"
		@mouseover="isHover = true"
		@mouseleave="isHover = false"
	>
		<i v-if="loading" class="kt-circle-loading" :style="loadingStyle" />
		<i v-else class="yoco" v-text="icon" /> <span> <slot /> </span>
	</button>
</template>

<script>
import color from 'color'

export default {
	name: 'KtButton',
	props: {
		type: {
			type: String,
			default: null,
		},
		icon: {
			type: String,
			default: '',
		},
		loading: {
			type: Boolean,
			default: false,
		},
		size: {
			type: String,
			default: null,
		},
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
		mainClasses() {
			const classes = [this.type, this.objectClass]
			if (this.size === 'small') classes.push('sm')
			if (this.size === 'large') classes.push('lg')
			return classes
		},
		objectClass() {
			return {
				icon: this.icon,
				'icon-only': this.icon && !this.$slots.default,
			}
		},
		loadingStyle() {
			const circleColor =
				this.type === 'primary' ? '#ffffff' : this.KtTheme.brandColor
			return {
				'border-left-color': circleColor,
				'border-bottom-color': circleColor,
			}
		},
		themeColor() {
			let themeColorObject = {}
			if (this.type === 'primary') {
				themeColorObject['color'] = color(this.KtTheme.brandColor).isDark()
					? '#ffffff'
					: '#3d3d3d'
				themeColorObject['background-color'] = this.hoverColor(
					this.KtTheme.brandColor,
				)
				themeColorObject['border-color'] = color(
					this.KtTheme.brandColor,
				).darken(0.24)
			}
			if (this.type === 'danger') {
				themeColorObject['background-color'] = this.isHover
					? this.KtTheme.dangerColor
					: null
				themeColorObject['border-color'] = this.isHover
					? this.KtTheme.dangerColor
					: null
				themeColorObject['color'] = this.isHover
					? '#ffffff'
					: this.KtTheme.dangerColor
			}
			if (this.type === 'secondary') {
				themeColorObject['border-color'] = this.hoverColor(
					this.KtTheme.brandColor,
				)
				themeColorObject['color'] = this.hoverColor(this.KtTheme.brandColor)
			}
			if (this.type === 'text') {
				themeColorObject['color'] = this.hoverColor(this.KtTheme.brandColor)
			}
			if (this.type === null || this.type === 'default') {
				themeColorObject['color'] = this.hoverColor(this.KtTheme.brandColor)
			}
			return themeColorObject
		},
	},
	methods: {
		handleClick(evt) {
			this.$emit('click', evt)
		},
		hoverColor(orginalColor) {
			return this.isHover ? color(orginalColor).darken(0.24) : orginalColor
		},
	},
}
</script>
