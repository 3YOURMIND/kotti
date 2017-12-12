<template>
  <div class="color">
    <h1>Colors</h1>
    <h2>Primay Color</h2>
    <div><p>Youi uses <code>Pirmary Blue</code> as main design color which also match to 3YOURMIND brand color. 
    We don't against different color in one page, but should be limited to 10%.</p></div>
    <h2>Color Palettes and Usage </h2>
    <h3>Color name convention</h3>
    <div>
      <p>The colors in same palettes has same hue but diffrent saturation and lightness. Color start with primary color, 
        then fills in the spectrum to create a complete and usable palette. Each color name as 
        <code>ColorName-number</code>. <code>ColorName</code> represents the hue, and <code>number</code> represents the lightness.
        Smaller number means lighter, and greater number means darker. 
      </p>
    </div>
    <h3>
      Color Palettes
      <span class="tooltip float-right c-hand" data-tooltip="Click color to copy">
      <i class="yoco">circle_question</i>
    </span></h3>
    <div class="columns">
      <color-palette class="column col-md-12 col-4" colorName="Pirmary Blue" :colors="primaryColor"/>
      <color-palette class="column col-md-12 col-4" colorName="Green" :colors="greenColor"/>
      <color-palette class="column col-md-12 col-4" colorName="Dark Grey" :colors="darkGrey"/>
      <color-palette class="column col-md-12 col-4" colorName="Light Grey" :colors="lightGrey"/>
      <color-palette class="column col-md-12 col-4" colorName="Red" :colors="redColor"/>
    </div>
    <h3>Usage</h3>
    <ul>
      <li><b>Primay-500:</b> it's used as primary button color, section-header, icon buttons.</li>
      <li><b>Green-500:</b> it represent success message.</li>
      <li><b>Red-500:</b> it uses as danger message.</li>
      <li><b>Darkgrey-500:</b> it uses as default text color.</li>
      <li><b>Lightgrey-500:</b> it uses as addtional / supplementary text color.</li>
    </ul>
    
  </div>
</template>

<script>
import ColorPalette from '~/components/ColorPalette.vue'

export default {
  components: {
    ColorPalette
  },
  data () {
    return {
      primaryColor: [
        {name: 'Primay-400', code: '#3173DE'},
        {name: 'Primay-500', code: '#2C66C4'},
        {name: 'Primay-600', code: '#2659AB'}
      ],
      greenColor: [
        {name: 'Green-400', code: '#71C716'},
        {name: 'Green-500', code: '#64AD13'},
        {name: 'Green-600', code: '#549410'}
      ],
      redColor: [
        {name: 'Red-400', code: '#F21D1D'},
        {name: 'Red-500', code: '#D91919'},
        {name: 'Red-600', code: '#BF1717'}
      ],
      darkGrey: [
        {name: 'Darkgrey-400', code: '#575757'},
        {name: 'Darkgrey-500', code: '#3D3D3D'},
        {name: 'Darkgrey-600', code: '#242424'}
      ],
      lightGrey: [
        {name: 'LightGrey-400', code: '#A8A8A8'},
        {name: 'LightGrey-500', code: '#8F8F8F'},
        {name: 'LightGrey-600', code: '#757575'}
      ]
    }
  }
}
</script>
