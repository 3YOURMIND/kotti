<template>
  <div>
    <h2 id="fonticons">Font Icons</h2>
    <p>Font icons used as visual supplement for text. It can help user to understand the context and balence the design.</p>
    <h3 id="gridandkeylines">Grid and Keylines</h3>
    <p>All icons should be designed in
      <code>24px * 24px</code> artboard, with margin
      <code>2px</code>. The design space is limited within
      <code>20px * 20px</code>.</p>
    <p>The fundation of icons are: circle, rectangles, and squares. Which should be follow the keyline as pciture. </p>
     <img src="~/assets/img/icon_keyline.png"/>
    <h3 id="radius">Radius</h3>
    <p>Adding radius on icons can make icons have the same style and distinct from other icons. There are 3 differet radius.</p>
    <ol>
      <li>90 degree Angles must have a 1px radius.</li>
      <li>Open shaped stroke edge must be curved using a 0.5px radius.</li>
      <li>Inner junctions should never have a radius.</li>
    </ol>
    <img src="~/assets/img/icon_radius.png"/>
    <h3 id="strokes">Strokes</h3>
    <p>The width of strokes should be 2px. Unless inside stores need to be optical corrected. </p>
    <h3 id="opticalcorrections">Optical corrections</h3>
    <h3 id="color">Color</h3>
    <p>Font icon should be monocolour, set color icon to
      <code>#000000</code> on the white background.</p>
  </div>
</template>

<script>
export default {
  name: 'IconFont'
}
</script>
