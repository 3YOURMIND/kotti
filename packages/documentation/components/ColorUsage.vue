<template>
	<div>
		<h2>Color Usage</h2>
		<h3>Meaning</h3>
		<ul>
			<li>
				<b>Primary Blue:</b> A primary color/brand color, which delivers brand
				value.
			</li>
			<li><b>Green:</b> Success or progress, which gives positive feedback.</li>
			<li><b>Red:</b> signals attention or danger.</li>
			<li><b>Darkgrey:</b> neutral color.</li>
			<li><b>Lightgrey:</b> neutral color.</li>
		</ul>
		<h3>Dark text on light background</h3>
		<div class="example-wrapper">
			<div class="example-content light">
				<div style="color: #3d3d3d;">
					Default text <code>Darkgrey-500</code>
				</div>
				<div style="color: #575757;">
					Secondary text <code>Darkgrey-400</code>
				</div>
				<div style="color: #8a8a8a;">
					Disabled / hint text <code>Darkgrey-300</code>
				</div>
			</div>
		</div>
		<p>
			Depends on text meaning and hierarchy, there are three different types:
		</p>
		<ul>
			<li><b>Default text</b> should be <code>Darkgrey-500</code>.</li>
			<li>
				<b>Secondary text, which is lower in the visual hierarchy,</b> uses
				<code>Darkgrey-400</code>.
			</li>
			<li><b>Disabled / hint text</b> should be <code>Darkgrey-300</code>.</li>
		</ul>
		<h3>Light text on dark background</h3>
		<div class="example-wrapper">
			<div class="example-content dark">
				<div style="color: #f8f8f8;">
					Default text <code>LightGrey-300</code>
				</div>
				<div style="color: #dbdbdb;">
					Secondary text <code>Lightgrey-400</code>
				</div>
				<div style="color: #a8a8a8;">
					Disabled / hint text <code>Lightgrey-500</code>
				</div>
			</div>
		</div>
		<p>Similar to light text, there are three different types:</p>
		<ul>
			<li><b>Default text</b> should be <code>Lightgrey-300</code>.</li>
			<li><b>Secondary text</b> uses <code>Lightgrey-400</code>.</li>
			<li><b>Disabled / hint text</b> should be <code>Lightgrey-500</code>.</li>
		</ul>
		<h3>Light text on color background</h3>
		<div class="example-wrapper">
			<div class="example-content color">
				<div style="color: #ffffff;">
					Default text <code>White, Opacity: 100%</code>
				</div>
				<div style="color: #ffffff; opacity: 0.68;">
					Secondary text <code>White, Opacity: 68%</code>
				</div>
				<div style="color: #ffffff; opacity: 0.46;">
					Disabled / hint text <code>White, Opacity: 46%</code>
				</div>
			</div>
		</div>
		<p>Same as light text, there are three different types:</p>
		<ul>
			<li>
				<b>Default text</b> should be
				<code>white color with opacity 100%</code>.
			</li>
			<li>
				<b>Secondary text</b> uses <code>white color with opacity 68%</code>.
			</li>
			<li>
				<b>Disabled / hint text</b> should be
				<code>white color with opacity 46%</code>.
			</li>
		</ul>
		<h3>Icon color</h3>
		<div class="example-wrapper">
			<div class="example-content icon">
				<div style="background: #f8f8f8;">
					<i class="yoco" style="color: #8a8a8a;">file</i>
					<span> file_name.pdf</span>
				</div>
				<div style="color: #fff; background: #2c66c4;">
					<i class="yoco">announce</i> <span> Announce new icons.</span>
				</div>
				<div style="color: #2c66c4;">
					<i class="yoco">print</i> <span> Print invoice.</span>
				</div>
			</div>
		</div>
		<p>
			Depends on the meaning and visual hierarchy, icon should match the
			following rules:
		</p>
		<ul>
			<li>
				<b>If icon is supplementary to default text:</b> Icon color should be
				<code>Darkgrey-300</code>.
			</li>
			<li>
				<b>If icon has color background:</b> Icon color is <code>White</code>.
			</li>
			<li>
				<b>If text has color or status:</b> Icon color should math to its text.
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	name: 'ColorUsage',
}
</script>

<style lang="scss" scoped>
.example-wrapper {
	padding: 2rem 0;
	margin-bottom: 1rem;
	background: #f8f8f8;
}

.example-content {
	width: 90%;
	max-width: 480px;
	padding: 0.8rem;
	margin: 0 auto;

	div {
		padding: 0.8rem;
	}

	&.light {
		background: #fff;
		border: 1px solid #dbdbdb;
	}

	&.color {
		background: #2c66c4;
	}

	&.dark {
		background: #3d3d3d;
	}

	&.icon {
		padding: 0;
		background: #fff;
		border: 1px #dbdbdb solid;
	}
}
</style>
