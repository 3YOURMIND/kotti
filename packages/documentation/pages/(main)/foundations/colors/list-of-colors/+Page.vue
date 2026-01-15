<template>
	<div class="color">
		<h1>Colors</h1>
		<h2>Primary Color</h2>
		<div>
			<p>
				Kotti uses <code>Primary Blue</code> as the main design color which also
				match the 3YOURMIND brand color. We don't recommend against using
				multiple colors in one page, but they should be limited to less than
				20%.
			</p>
		</div>
		<h2>Color Palettes</h2>
		<h3>Naming convention</h3>
		<div>
			<p>
				The colors in each palette have the same hue but different saturation
				and lightness. Palettes start with a primary color, then continue in the
				spectrum to create a complete and usable set of colors. An example color
				name is <code>ColorName-number</code>. <code>ColorName</code> represents
				the hue, and <code>number</code> represents the lightness. A smaller
				number means lighter, and a greater number means darker.
			</p>
		</div>
		<h3>Palettes</h3>
		<div class="columns">
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Primary Blue"
				:colors="primaryColors"
			/>
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Red"
				:colors="redColors"
			/>
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Green"
				:colors="greenColors"
			/>
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Yellow"
				:colors="yellowColors"
			/>
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Violet"
				:colors="violetColors"
			/>
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Mint"
				:colors="mintColors"
			/>
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Purple"
				:colors="purpleColors"
			/>
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Orange"
				:colors="orangeColors"
			/>
		</div>
		<div class="columns">
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Gray"
				:colors="grayColors"
			/>
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Slate"
				:colors="slateColors"
			/>
		</div>
		<ColorUsage />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { baseColorsFactory } from '@3yourmind/kotti-ui/tokens'

import ColorPalette from './ColorPalette.vue'
import ColorUsage from './ColorUsage.vue'

export default defineComponent({
	name: 'DocumenationPageFoundationsColorsList',
	components: {
		ColorPalette,
		ColorUsage,
	},
	data() {
		const extractTokens = (prefix) =>
			baseColorsFactory.array
				.filter((color) => color.name.startsWith(prefix))
				.map(({ name, value }) => ({ code: value, name }))

		return {
			grayColors: extractTokens('gray'),
			greenColors: extractTokens('green'),
			mintColors: extractTokens('mint'),
			orangeColors: extractTokens('orange'),
			primaryColors: extractTokens('primary'),
			purpleColors: extractTokens('purple'),
			redColors: extractTokens('red'),
			slateColors: extractTokens('slate'),
			violetColors: extractTokens('violet'),
			yellowColors: extractTokens('yellow'),
		}
	},
})
</script>
