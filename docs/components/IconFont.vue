<template>
	<div>
		<h2 id="fonticons">Font Icons</h2>
		<p>
			Font icons are used as visual supplement for text. They can help the user to
			understand the context and balence the design.
		</p>
		<h3 id="gridandkeylines">Grid and Keylines</h3>
		<p>
			All icons should be designed in a
			<code>24px * 24px</code> artboard, with a margin of
			<code>2px</code>. The design space is limited to within
			<code>20px * 20px</code>.
		</p>
		<p>
			The foundation of icons are circles, rectangles and squares. They should
			follow the keyline shown in the picture.
		</p>
		<img src="~/assets/img/icon_keyline.png" />
		<h3 id="radius">Radius</h3>
		<p>
			Adding radius on icons helps give the icons a consistent style and still distinct
			from other icons. There are 3 differet radii.
		</p>
		<ol>
			<li>90 degree angles must have a 1px radius.</li>
			<li>Open shaped stroke edges must be curved using a 0.5px radius.</li>
			<li>Inner junctions should never have a radius.</li>
		</ol>
		<img src="~/assets/img/icon_radius.png" />
		<h3 id="strokes">Strokes</h3>
		<p>
			The width of strokes should be 2px.
		</p>
		<h3 id="color">Color</h3>
		<p>
			Font icon should be monocolor, and the icon color set to
			<code>#000000</code> on the white background.
		</p>
	</div>
</template>

<script>
export default {
	name: 'IconFont',
}
</script>
