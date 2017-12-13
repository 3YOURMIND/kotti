<template>
  <div class="color">
    <h1>Colors</h1>
    <h2>Primay Color</h2>
    <div><p>Youi uses <code>Pirmary Blue</code> as main design color which also match to 3YOURMIND brand color. 
    We don't strongly against multiple colors used in one page, but should be limited to less than 20%.</p></div>
    <h2>Color Palettes</h2>
    <h3>Color name convention</h3>
    <div>
      <p>The colors in same palettes has same hue but diffrent saturation and lightness. Color start with primary color, 
        then fills in the spectrum to create a complete and usable palette. Each color name as 
        <code>ColorName-number</code>. <code>ColorName</code> represents the hue, and <code>number</code> represents the lightness.
        Smaller number means lighter, and greater number means darker. 
      </p>
    </div>
    <h3>
      Palettes
      <span class="tooltip c-hand" data-tooltip="Click color to copy">
      <i class="yoco">circle_question</i>
    </span></h3>
    <div class="columns">
      <color-palette class="column col-md-12 col-4" colorName="Pirmary Blue" :colors="primaryColor"/>
      <color-palette class="column col-md-12 col-4" colorName="Green" :colors="greenColor"/>
      <color-palette class="column col-md-12 col-4" colorName="Red" :colors="redColor"/>
      <color-palette class="column col-md-12 col-4" colorName="Dark Grey" :colors="darkGrey"/>
      <color-palette class="column col-md-12 col-4" colorName="Light Grey" :colors="lightGrey"/>
      
    </div>
    <h2>Color Usage</h2>
    <h3>Meaning</h3>
    <ul>
      <li><b>Primay Blue:</b> primay color, brand color, deliver brand value.</li>
      <li><b>Green:</b> success and process, postivie feedback.</li>
      <li><b>Red:</b> need attention, danger.</li>
      <li><b>Darkgrey:</b> neutral color</li>
      <li><b>Lightgrey:</b> neutral color.</li>
    </ul>
    <h3>State</h3>
    <table class="table table-striped table-hover">
      <tr>
      <th>Class</th>
      <th>Default</th>
      <th>Hover</th>
      <th>Disable / Hint</th>
      </tr>
      <tr>
        <td>Link</td>
        <td>Primary-500</td>
        <td>Primary-600</td>
        <td>Primary-500 with 20% opacity</td>
      </tr>
    </table>
    <table class="table">
            <tr>
      <th>Class</th>
      <th>Default</th>
      <th>Success</th>
      <th>Fail / Alert</th>
      </tr>
          <tr>
        <td>Hint Text</td>
        <td>LightGrey-500</td>
        <td>Green-600</td>
        <td>Red-500</td>
      </tr>
    </table>
    <h3>Dark text on light background</h3>
    <div class="columns">
    <div class="column col-6">
      Depends on text meaning and hierarchy, there are three different type:
      <ul>
        <li><b>Default text</b> should be <code>Darkgrey-500</code></li>
        <li><b>Secondary text, which is lower in the visual hierarchy,</b> 
        uses <code>Darkgrey-400</code>.</li>
        <li><b>Disabled / hint text</b> should be <code>Darkgrey-300</code>.</li>
      </ul>
    </div>
    <div class="column col-6">
      <div class="text-color light">
      <div style="color:#3D3D3D">Default text - Darkgrey-500</div>
      <div style="color:#575757">Seconday text - Darkgrey-400</div>
      <div style="color:#8A8A8A">Disabled / hint text - Darkgrey-300</div>
      </div>
    </div>
    </div>
    <h3>Light text on dark background</h3>
    <div class="columns">
    <div class="column col-6 col-md-12">Same as dark text, there are three different type:
    <ul>
      <li><b>Default text</b> should be <code>Lightgrey-300</code></li>
      <li><b>Secondary text, which is lower in the visual hierarchy,</b> 
      uses <code>Lightgrey-400</code>.</li>
      <li><b>Disabled / hint text</b> should be <code>Lightgrey-500</code>.</li>
    </ul>
    </div>
    <div class="column col-6 col-md-12">
      <div class="text-color dark">
      <div style="color:#F8F8F8">Default text - LightGrey-300</div>
      <div style="color:#DBDBDB">Seconday text - Lightgrey-400</div>
      <div style="color:#A8A8A8">Disabled / hint text - Lightgrey-500</div>
      </div>
    </div>
    </div>
    <h3>Icons and other elements</h3>
    <div>
      <p>Default icon color on light background is <code>DarkGrey-500</code>,
      and on dark background should be white <code>LightGrey-300</code>.
    </p> </div>
    <div class="example1">
      <i class="yoco">announce</i> This is icon on light background.
    </div>
    <div class="example2">
      <i class="yoco">announce</i> This is icon on dark background.
    </div>
    <div class="example3">
      <i class="yoco">announce</i> This is icon with action.
    </div>
    
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
        {name: 'Darkgrey-300', code: '#8A8A8A'},
        {name: 'Darkgrey-400', code: '#575757'},
        {name: 'Darkgrey-500', code: '#3D3D3D'}
      ],
      lightGrey: [
        {name: 'LightGrey-300', code: '#F8F8F8'},
        {name: 'LightGrey-400', code: '#DBDBDB'},
        {name: 'LightGrey-500', code: '#A8A8A8'}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.text-color{
  &.light {
    background: #f8f8f8;
  }
  &.dark {
    background: #3d3d3d;
  }
  padding: .8rem;
  line-height: 2rem;
}
.example1{
  background: #f8f8f8;
  color: #3d3d3d;
  padding: .8rem;
}
.example2{
  background: #2C66C4;
  color: #f8f8f8;
  padding: .8rem;
}
.example3{
  background: #f8f8f8;
  color: #2C66C4;
  padding: .8rem;
}
</style>
