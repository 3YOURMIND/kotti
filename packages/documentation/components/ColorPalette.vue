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
	</div>
</template>

<script lang="ts">
import copy from 'copy-to-clipboard'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'

import { error, success } from '~/utilities/toaster'

export default defineComponent({
	name: 'ColorPalette',
	props: {
		colorName: { required: true, type: String },
		colors: {
			required: true,
			type: Array as PropType<Array<{ code: string; name: string }>>,
		},
	},
	setup() {
		return {
			copyColor: (codeString: string) => {
				const wasSuccessful = copy(codeString)
				if (wasSuccessful) {
					success({
						text: `Copied color "${codeString}"`,
					})
				} else {
					error({
						text: 'There was a failure when copying to clipboard',
					})
				}
			},
			textColor: (colorName: string) => {
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
		}
	},
})
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
