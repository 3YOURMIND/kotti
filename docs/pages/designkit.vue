<template lang="md">
	# Design Kit

	## Sketch Library

	<div class="download-area">
		<img src="~/assets/img/design_kit_sketch.png" width="100%">
		<a href="https://github.com/3YOURMIND/kotti/tree/master/docs/assets/sketch" target="about_blank">
			<button class="primary">Download Kotti Design Kit</button>
		</a>
	</div>


	In order to organize the library easier and robust, we separate the Sketch Libary to different files:

	* **Kotti Button**: Button library
	* **Kotti Color**: Color palettes for icons
	* **Kotti Component**: Grouped reusable components
	* **Kotti Forms**: Dropdown, select box, etc.
	* **Kotti Icons**: Yoco icons in Kotti
	* **Kotti Input**: Input fields
	* **Kotti Layout**: Navbar, actionbar and workspace
	* **Kotti Text**: Typography and text styles

	<i class="yoco">circle_question</i> You can import Kotti Sketch Design library to your [Sketch Library](https://www.sketchapp.com/docs/libraries/).

</template>

<script>
export default {
	name: 'DesignKit',
	layout: 'fullpage',
}
</script>

<style lang="scss" scoped>
.download-area {
	text-align: center;
	background: #f8f8f8;
	padding-bottom: 2.4rem;
	margin: 0.8rem 0;
}
</style>
