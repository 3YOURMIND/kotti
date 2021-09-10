<template>
	<div class="color-palette">
		<div class="color-palette__title" v-text="colorName" />
		<div
			v-for="color in colors"
			:key="color.name"
			class="color-palette__block c-hand"
			:style="{ background: color.code, color: textColor(color.name) }"
			@click="copyColor(color.code)"
		>
			<div class="color-palette__name" v-text="color.name" />
			<div class="color-palette__code" v-text="color.code" />
		</div>
		<transition name="slide-fade">
			<div v-if="copySuccess" class="success-message">Copy successful</div>
		</transition>
	</div>
</template>

<script>
import { TimeConversion } from '@metatypes/units'

export default {
	name: 'ColorPalette',
	props: {
		colorName: String,
		colors: Array,
	},
	data() {
		return {
			copySuccess: false,
		}
	},
	methods: {
		copyColor(string) {
			const codeString = `${string}`
			this.$copyText(codeString).then(
				() => {
					this.copySuccess = true
					setTimeout(() => {
						this.copySuccess = false
					}, TimeConversion.MILLISECONDS_PER_SECOND)
				},
				() => {
					alert('failed')
				},
			)
		},
		textColor(colorName) {
			if (
				colorName === 'Lightgray-300' ||
				colorName === 'Lightgray-400' ||
				colorName === 'White-000' ||
				colorName === 'Yellow-300' ||
				colorName === 'Yellow-400'
			) {
				return '#3d3d3d'
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.color-palette {
	margin: 1rem 0;
}

.color-palette__title {
	font-size: 1em;
	line-height: 1.55em;
	color: #8f8f8f;
}

.color-palette__block {
	box-sizing: border-box;
	display: block;
	height: 2.4rem;
	padding: 0 0.8rem;
	margin: 0.1rem 0;
	font-size: 0.875em;
	color: #fff;

	&:hover .color-palette__code {
		display: inline;
	}
}

.color-palette__name {
	float: left;
	line-height: 2.4rem;
}

.color-palette__code {
	display: none;
	float: right;
	width: 50%;
	line-height: 2.4rem;
	text-align: right;
}

.slide-fade-enter-active {
	transition: all 0.3s ease;
}

.slide-fade-leave-active {
	transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
	opacity: 0;
	transform: translateX(100px);
}
</style>
