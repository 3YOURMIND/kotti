<template lang="md">
# Icons

<icon-font />

<h2>
	Preview
	<span class="tooltip c-hand" data-tooltip="Click icon to copy">
		<i class="yoco">circle_question</i>
	</span>
</h2>

Kotti uses custom icons — [Yoco](https://www.github.com/3yourmind/yoco)

![npm-version](https://badge.fury.io/js/%403yourmind%2Fyoco.svg)

<div class="columns">
	<yoco-preview
		:icon="liga"
		:key="liga"
		@click="copyLiga(liga)"
		class="column col-2 col-md-6"
		v-for="liga in iconLigas"
	/>
</div>

</template>

<script>
import IconFont from '~/components/IconFont.vue'
import YocoLiga from '~/assets/json/yocoString.json'
import YocoPreview from '~/components/YocoPreview.vue'

export default {
	name: 'Icons',
	components: {
		IconFont,
		YocoPreview,
	},
	data() {
		return {
			copySuccess: false,
			iconLigas: YocoLiga.data,
		}
	},
}
</script>

<style lang="scss" scoped>
img[alt='npm-version'] {
	width: 120px;
	display: block;
}
</style>
