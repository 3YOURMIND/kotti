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
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Yellow"
				:colors="yellowColor"
			/>
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Purple"
				:colors="purpleColor"
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
			<ColorPalette
				class="column col-md-12 col-4"
				colorName="Neutrals"
				:colors="neutrals"
			/>
		</div>
		<ColorUsage />
	</div>
</template>

<script>
import ColorPalette from '~/components/ColorPalette.vue'
import ColorUsage from '~/components/ColorUsage.vue'

export default {
	name: 'Color',
	components: {
		ColorPalette,
		ColorUsage,
	},
	data() {
		return {
			primaryColor: [
				{ name: 'Primary-300', code: '#AFC5E8' },
				{ name: 'Primary-400', code: '#3173DE' },
				{ name: 'Primary-500', code: '#2C66C4' },
				{ name: 'Primary-600', code: '#2659AB' },
			],
			greenColor: [
				{ name: 'Green-300', code: '#C4E0A5' },
				{ name: 'Green-400', code: '#71C716' },
				{ name: 'Green-500', code: '#64AD13' },
				{ name: 'Green-600', code: '#549410' },
			],
			redColor: [
				{ name: 'Red-300', code: '#F0A8A8' },
				{ name: 'Red-400', code: '#F21D1D' },
				{ name: 'Red-500', code: '#D91919' },
				{ name: 'Red-600', code: '#BF1717' },
			],
			orangeColor: [
				{ name: 'Orange-300', code: '#FFAE66' },
				{ name: 'Orange-400', code: '#FF9333' },
				{ name: 'Orange-500', code: '#FF7800' },
				{ name: 'Orange-600', code: '#D37D30' },
			],
			purpleColor: [
				{ name: 'Purple-300', code: '#B995CA' },
				{ name: 'Purple-400', code: '#932DC2' },
				{ name: 'Purple-500', code: '#6C218F' },
				{ name: 'Purple-600', code: '#591B75' },
			],
			darkGray: [
				{ name: 'Darkgray-300', code: '#8A8A8A' },
				{ name: 'Darkgray-400', code: '#575757' },
				{ name: 'Darkgray-500', code: '#3D3D3D' },
				{ name: 'Darkgray-600', code: '#242424' },
			],
			lightGray: [
				{ name: 'Lightgray-300', code: '#F8F8F8' },
				{ name: 'Lightgray-400', code: '#DBDBDB' },
				{ name: 'Lightgray-500', code: '#A8A8A8' },
				{ name: 'Lightgray-600', code: '#5C5C5C' },
			],
			neutrals: [
				{ name: 'White-000', code: '#FFFFFF' },
				{ name: 'Black-000', code: '#000000' },
			],
			yellowColor: [
				{ name: 'Yellow-300', code: '#FFF9C0' },
				{ name: 'Yellow-400', code: '#FFF490' },
				{ name: 'Yellow-500', code: '#FFE60D' },
				{ name: 'Yellow-600', code: '#DFC903' },
			],
		}
	},
}
</script>
