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
				colorName="Prirmary Blue"
				:colors="primaryColor"
			/>
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Green"
				:colors="greenColor"
			/>
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Red"
				:colors="redColor"
			/>
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Orange"
				:colors="orangeColor"
			/>
		</div>
		<div class="columns">
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Dark Gray"
				:colors="darkGray"
			/>
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Light Gray"
				:colors="lightGray"
			/>
		</div>
		<ColorUsage />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import ColorPalette from './ColorPalette.vue'
import ColorUsage from './ColorUsage.vue'

export default defineComponent({
	name: 'DocumenationPageFoundationsColorsList',
	components: {
		ColorPalette,
		ColorUsage,
	},
	setup() {
		return {
			darkGray: [
				{ code: '#8A8A8A', name: 'Darkgray-300' },
				{ code: '#575757', name: 'Darkgray-400' },
				{ code: '#3D3D3D', name: 'Darkgray-500' },
			],
			greenColor: [{ code: '#64AD13', name: 'Green-500' }],
			lightGray: [
				{ code: '#F8F8F8', name: 'Lightgray-300' },
				{ code: '#DBDBDB', name: 'Lightgray-400' },
				{ code: '#A8A8A8', name: 'Lightgray-500' },
			],
			orangeColor: [{ code: '#FF7800', name: 'Orange-500' }],
			primaryColor: [
				{ code: '#3173DE', name: 'Primary-400' },
				{ code: '#2C66C4', name: 'Primary-500' },
				{ code: '#2659AB', name: 'Primary-600' },
			],
			redColor: [
				{ code: '#F21D1D', name: 'Red-400' },
				{ code: '#D91919', name: 'Red-500' },
			],
		}
	},
})
</script>
