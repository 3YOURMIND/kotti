<template lang="md">
# Icons

<h2>
	Preview
	<span class="tooltip c-hand" data-tooltip="Click icon to copy">
		<i class="yoco">circle_question</i>
	</span>
</h2>

Kotti uses custom icons — [Yoco](https://www.github.com/3yourmind/yoco)

![npm-version](https://badge.fury.io/js/%403yourmind%2Fyoco.svg)

<div class="columns">
	<YocoPreview
		v-for="liga in iconLigas"
		:key="liga"
		:icon="liga"
		class="column col-2 col-md-6"
		@click="copyLiga(liga)"
	/>
</div>

<icon-font />

</template>

<script>
import data from '@3yourmind/kotti-ui/source/next/data.json'

import IconFont from '~/components/IconFont.vue'
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
			iconLigas: data.yocoIcons,
		}
	},
}
</script>

<style lang="scss" scoped>
img[alt='npm-version'] {
	display: block;
	width: 120px;
}
</style>
