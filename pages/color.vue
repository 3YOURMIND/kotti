<template>
  <div class="color">
    <h1>Colors</h1>
    <p>We using </p>
    <h2>Color Palettes</h2>
    <div class="columns">
      <color-palette class="column col-md-12 col-4" colorName="Primary Blue" :colors="primaryColor"/>
      <color-palette class="column col-md-12 col-4" colorName="Green" :colors="greenColor"/>
      <color-palette class="column col-md-12 col-4" colorName="Dark Grey" :colors="darkGrey"/>
      <color-palette class="column col-md-12 col-4" colorName="Light Grey" :colors="lightGrey"/>
      <color-palette class="column col-md-12 col-4" colorName="Red" :colors="redColor"/>
    </div>
  </div>
</template>

<script>
import ColorPalette from '~/components/color/ColorPalette.vue'

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
