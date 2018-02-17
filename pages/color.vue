<template>
  <div class="color">
    <h1>Colors</h1>
    <h2>Primay Color</h2>
    <div><p>Kotti uses <code>Primary Blue</code> as the main design color which also match the 3YOURMIND brand color.
    We don't strongly recommend against using multiple colors used in one page, but they  should be limited to less than 20%.</p></div>
    <h2>Color Palettes</h2>
    <h3>Name convention</h3>
    <div>
      <p>The colors in each palette have the same hue but diffrent saturation and lightness. Palettes start with a primary color,
        then continue in the spectrum to create a complete and usable set of colors. An example color name is
        <code>ColorName-number</code>. <code>ColorName</code> represents the hue, and <code>number</code> represents the lightness.
        A smaller number means lighter, and a greater number means darker.
      </p>
    </div>
    <h3>
      Palettes
      <span class="tooltip c-hand" data-tooltip="Click color to copy">
      <i class="yoco">circle_question</i>
    </span></h3>
    <div class="columns">
      <color-palette class="column col-md-12 col-4" colorName="Prirmary Blue" :colors="primaryColor"/>
      <color-palette class="column col-md-12 col-4" colorName="Green" :colors="greenColor"/>
      <color-palette class="column col-md-12 col-4" colorName="Red" :colors="redColor"/>
      <color-palette class="column col-md-12 col-4" colorName="Purple" :colors="purpleColor"/>
      <color-palette class="column col-md-12 col-4" colorName="Dark Grey" :colors="darkGrey"/>
      <color-palette class="column col-md-12 col-4" colorName="Light Grey" :colors="lightGrey"/>
    </div>

    <color-usage />


  </div>
</template>

<script>
import ColorUsage from '~/components/ColorUsage.vue'
import ColorPalette from '~/components/ColorPalette.vue'

export default {
  name: 'Color',
  components: {
    ColorPalette, ColorUsage
  },
  data () {
    return {
      primaryColor: [
        {name: 'Primary-300', code: '#AFC5E8'},
        {name: 'Primary-400', code: '#3173DE'},
        {name: 'Primary-500', code: '#2C66C4'},
        {name: 'Primary-600', code: '#2659AB'}
      ],
      greenColor: [
        {name: 'Green-300', code: '#C4E0A5'},
        {name: 'Green-400', code: '#71C716'},
        {name: 'Green-500', code: '#64AD13'},
        {name: 'Green-600', code: '#549410'}
      ],
      redColor: [
        {name: 'Red-300', code: '#F0A8A8'},
        {name: 'Red-400', code: '#F21D1D'},
        {name: 'Red-500', code: '#D91919'},
        {name: 'Red-600', code: '#BF1717'}
      ],
      purpleColor: [
        {name: 'Purple-300', code: '#B995CA'},
        {name: 'Purple-400', code: '#932DC2'},
        {name: 'Purple-500', code: '#6C218F'},
        {name: 'Purple-600', code: '#591B75'}
      ],
      darkGrey: [
        {name: 'Darkgrey-300', code: '#8A8A8A'},
        {name: 'Darkgrey-400', code: '#575757'},
        {name: 'Darkgrey-500', code: '#3D3D3D'},
        {name: 'Darkgrey-600', code: '#242424'}
      ],
      lightGrey: [
        {name: 'LightGrey-300', code: '#F8F8F8'},
        {name: 'LightGrey-400', code: '#DBDBDB'},
        {name: 'LightGrey-500', code: '#A8A8A8'},
        {name: 'LightGrey-600', code: '#5C5C5C'}
      ]
    }
  }
}
</script>

