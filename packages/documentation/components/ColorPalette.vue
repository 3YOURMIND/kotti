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
					colorName === 'primary-05' ||
					colorName === 'primary-10' ||
					colorName === 'primary-20' ||
					colorName === 'primary-30'
				)
					return '#2B4E8D'
				if (
					colorName === 'red-05' ||
					colorName === 'red-10' ||
					colorName === 'red-20' ||
					colorName === 'red-30'
				)
					return '#9D1717'
				if (
					colorName === 'green-05' ||
					colorName === 'green-10' ||
					colorName === 'green-20' ||
					colorName === 'green-30'
				)
					return '#19670F'
				if (
					colorName === 'yellow-05' ||
					colorName === 'yellow-10' ||
					colorName === 'yellow-20' ||
					colorName === 'yellow-30' ||
					colorName === 'yellow-40'
				)
					return '#88560B'
				if (
					colorName === 'purple-05' ||
					colorName === 'purple-10' ||
					colorName === 'purple-20' ||
					colorName === 'purple-30'
				)
					return '#613078'
				if (
					colorName === 'mint-05' ||
					colorName === 'mint-10' ||
					colorName === 'mint-20' ||
					colorName === 'mint-30' ||
					colorName === 'mint-40'
				)
					return '#08675F'
				if (
					colorName === 'orange-05' ||
					colorName === 'orange-10' ||
					colorName === 'orange-20' ||
					colorName === 'orange-30'
				)
					return '#9D360F'
				if (
					colorName === 'violet-05' ||
					colorName === 'violet-10' ||
					colorName === 'violet-20' ||
					colorName === 'violet-30' ||
					colorName === 'violet-40'
				)
					return '#8C2858'
				if (
					colorName === 'gray-05' ||
					colorName === 'gray-10' ||
					colorName === 'gray-20' ||
					colorName === 'gray-30'
				)
					return '#3A3A3A'
				if (
					colorName === 'slate-05' ||
					colorName === 'slate-10' ||
					colorName === 'slate-20' ||
					colorName === 'slate-30'
				)
					return '#3C3D50'
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
