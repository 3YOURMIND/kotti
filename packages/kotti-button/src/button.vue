<template>
	<button
		:class="mainClasses"
		@click="handleClick"
		:style="themeColor"
		@mouseover="isHover = true"
		@mouseleave="isHover = false"
	>
		<i
			v-if="loading"
			:class="loadingClass"
			:style="{ 'border-color': this.KtTheme.dangerColor }"
		/>
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
			default: '',
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
				brandColor: '#549410',
				dangerColor: '#f35353',
			},
		},
	},
	data() {
		return {
			isHover: { type: Boolean, default: false },
		}
	},
	computed: {
		mainClasses() {
			const classes = [this.type, this.objectClass]
			if (this.size === 'small') classes.push('sm')
			if (this.size === 'large') classes.push('lg')
			return classes
		},
		loadingClass() {
			return {
				inline: true,
				loading: true,
				white: this.type === 'primary',
			}
		},
		objectClass() {
			return {
				icon: this.icon,
				'icon-only': this.icon && !this.$slots.default,
			}
		},
		themeColor() {
			let themeColorObject = {}
			if (this.type === 'primary') {
				themeColorObject['color'] = color(this.KtTheme.brandColor).isLight
					? '#fff'
					: '#3d3d3d'
				themeColorObject['background-color'] = this.isHover
					? color(this.KtTheme.brandColor).darken(0.2)
					: this.KtTheme.brandColor
				themeColorObject['border-color'] = color(
					this.KtTheme.brandColor,
				).darken(0.2)
			}
			if (this.type === 'danger') {
				themeColorObject['background'] = this.isHover
					? this.KtTheme.dangerColor
					: null
				themeColorObject['border-color'] = this.isHover
					? this.KtTheme.dangerColor
					: null
				themeColorObject['color'] = this.isHover
					? '#fff'
					: this.KtTheme.dangerColor
			}
			if (this.type === 'secondary') {
				themeColorObject['border-color'] = color(
					this.KtTheme.brandColor,
				).darken(0.2)
				themeColorObject['color'] = this.KtTheme.brandColor
			}
			if (this.type === 'text') {
				themeColorObject['color'] = this.KtTheme.brandColor
			}
			return themeColorObject
		},
	},
	methods: {
		handleClick(evt) {
			this.$emit('click', evt)
		},
	},
}
</script>
