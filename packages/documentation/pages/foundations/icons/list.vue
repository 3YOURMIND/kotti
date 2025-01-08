<template lang="md">
<ComponentInfo v-bind="{ component }" />

[![npm-version](https://badge.fury.io/js/%403yourmind%2Fyoco.svg)](https://www.npmjs.com/package/@3yourmind/yoco)

### List of Icons

<div class="columns">
	<YocoPreview
		v-for="[key, value] in Object.entries(Yoco.Icon)"
		class="column col-2 col-md-6"
		:key="value"
		:enum="key"
		:icon="value"
		@click="copyLiga(value)"
	/>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { Kotti } from '@3yourmind/kotti-ui'
import { Yoco, yocoIconSchema } from '@3yourmind/yoco'

import ComponentInfo from '~/components/ComponentInfo.vue'
import YocoPreview from '~/components/YocoPreview.vue'

export default defineComponent({
	name: 'DocumentationPageFoundationsIconsList',
	components: {
		ComponentInfo,
		YocoPreview,
	},
	setup() {
		const component: { meta: Kotti.Meta; name: string } = {
			meta: {
				addedVersion: null,
				deprecated: null,
				designs: {
					type: Kotti.MetaDesignType.FIGMA,
					url: 'https://www.figma.com/file/h37hGvsaYJBkjBldtc6Xcp/Yoco-icons',
				},
				slots: {},
				typeScript: {
					namespace: 'Yoco.Icon',
					schema: yocoIconSchema,
				},
			},
			name: 'Icons',
		}

		return {
			component,
			copySuccess: ref(false),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
img[alt='npm-version'] {
	display: block;
	width: 120px;
}
</style>
