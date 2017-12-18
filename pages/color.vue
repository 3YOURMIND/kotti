<template>
  <div class="color">
    <h1>Colors</h1>
    <h2>Primay Color</h2>
    <div><p>Youi uses <code>Pirmary Blue</code> as main design color which also match to 3YOURMIND brand color. 
    We don't strongly against multiple colors used in one page, but should be limited to less than 20%.</p></div>
    <h2>Color Palettes</h2>
    <h3>Name convention</h3>
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
    <div class="state-link">
      <a>Default: This is an example link <code>Primary-500</code></a>
      <a class="hover">Hover: This is an example link <code>Primary-600</code></a>
      <a class="disabled">Disabled: This is an disabled link <code>Primary-500, opacity: .46</code></a>
    </div>
    <h3>Status</h3>
    <div class="columns">
      <div class="column col-4 state-hint">
        <input/>
        <span style="color: #64AD13">Success</span>
      </div>
       <div class="column col-4 state-hint">
        <input/>
        <span style="color: #8A8A8A">Default</span>
      </div>
       <div class="column col-4 state-hint">
        <input/>
        <span style="color: #D91919">Fail</span>
      </div>
    </div>
    <h3>Dark text on light background</h3>
    <div class="columns">
    <div class="column col-6 col-md-12">
      Depends on text meaning and hierarchy, there are three different type:
      <ul>
        <li><b>Default text</b> should be <code>Darkgrey-500</code></li>
        <li><b>Secondary text, which is lower in the visual hierarchy,</b> 
        uses <code>Darkgrey-400</code>.</li>
        <li><b>Disabled / hint text</b> should be <code>Darkgrey-300</code>.</li>
      </ul>
    </div>
    <div class="column col-6 col-md-12">
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
    <h3>Light text on color background</h3>
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
      <div class="text-color color">
      <div style="color:#FFFFFF">Default text - Whith Opacity 100%</div>
      <div style="color:#FFFFFF; opacity: .68">Seconday text - Whith Opacity 68%</div>
      <div style="color:#FFFFFF; opacity: .46">Disabled / hint text - Whith Opacity 46%</div>
      </div>
    </div>
    </div>
    <h3>Icons and other elements</h3>
    <div class="columns">
    <div class="column col-6 col-md-12">
      <p>Depends on the meaning and visual hierarchy, icon should match the following rules: </p>
      <ul>
      <li>If icon is <b>supplementary</b> to default text, 
        the icon color should be <code>Darkgrey-300</code>. (First example)
      </li>
      <li>If icon has color background, both icon and text color is <code>LightGrey-300</code> (Second example)</li> 
      <li>If text has color or status, mathc to its text. (Thrid example)</li>
      </ul>
    </div>
    <div class="column col-6 col-md-12">
      <div class="icon-color light">
        <i class="yoco" style="color:#8A8A8A">file</i> file_name.pdf
      </div>
      <div class="icon-color color">
        <i class="yoco">announce</i> Announce new icons.
      </div>
      <div class="icon-color dark">
        <i class="yoco">print</i> Print invoice.
      </div>
    </div>
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
.state-link {
  line-height: 2rem;
  display: block;
  width: 100%;
  font-weight: bold;
  padding: .8rem;
  background: #f8f8f8;
  a {
    color: #2C66C4;
    display: block;
  }
  .hover {
    color: #2659AB;
  }
  .disabled {
    opacity: .46;
  }
}
.state-hint {
  padding: .8rem;
  background: #f8f8f8;
  font-size: 0.875em;
  text-transform: uppercase;
  input {
    width: 100%;
  }
  span {
    display: block;
    padding: .2rem 0;
    font-weight: 600;
  }
}
.text-color{
  &.light {
    background: #f8f8f8;
  }
  &.color {
    background: #2C66C4;
  }
  &.dark {
    background: #3d3d3d;
  }
  padding: .8rem;
  line-height: 2rem;
}
.icon-color {
  padding: .8rem;
  &.light {
    background: #f8f8f8;
    color: #3d3d3d;
  }
  &.color {
    background: #2C66C4;
    color: #f8f8f8;
  }
  &.dark {
    background: #ffffff;
    color: #2C66C4;
  }
}
</style>
