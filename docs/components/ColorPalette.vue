<template>
	<div class="color-palette">
		<div class="color-palette__title" v-text="colorName" />
		<div
			v-for="color in colors"
			:key="color.name"
			:style="{ background: color.code, color: textColor(color.name) }"
			@click="copyColor(color.code)"
			class="color-palette__block c-hand"
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
					}, 1000)
				},
				() => {
					alert('failed')
				},
			)
		},
		textColor(colorName) {
			if (
				colorName === 'Lightgrey-300' ||
				colorName === 'Lightgrey-400' ||
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
	color: #8f8f8f;
	line-height: 1.55em;
}

.color-palette__block {
	box-sizing: border-box;
	height: 2.4rem;
	font-size: 0.875em;
	padding: 0 0.8rem;
	color: #fff;
	margin: 0.1rem 0;
	display: block;

	&:hover .color-palette__code {
		display: inline;
	}
}

.color-palette__name {
	line-height: 2.4rem;
	float: left;
}

.color-palette__code {
	text-align: right;
	line-height: 2.4rem;
	width: 50%;
	float: right;
	display: none;
}

.slide-fade-enter-active {
	transition: all 0.3s ease;
}

.slide-fade-leave-active {
	transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
	transform: translateX(100px);
	opacity: 0;
}
</style>
