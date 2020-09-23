<template lang="md">
<ComponentInfo title="Icons" :meta="meta" />

![npm-version](https://badge.fury.io/js/%403yourmind%2Fyoco.svg)

### TypeScript Usage

```typescript
// enum of icons and the associated ligature / svg name
import { Yoco } "@3yourmind/yoco";

console.log(Yoco.Icon.ANNOUNCE)
// 'announce'
```

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

<icon-font />

</template>

<script lang="ts">
import { Kotti } from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'
import { defineComponent, ref } from '@vue/composition-api'

import ComponentInfo from '../../components/ComponentInfo.vue'

import IconFont from '~/components/IconFont.vue'
import YocoPreview from '~/components/YocoPreview.vue'

export default defineComponent({
	name: 'DocumentationPageFundationsIcons',
	components: {
		ComponentInfo,
		IconFont,
		YocoPreview,
	},
	setup() {
		const meta: Kotti.Meta = {
			addedVersion: null,
			deprecated: null,
			typeScript: {
				namespace: 'Yoco.Icon',
			},
		}

		return {
			copySuccess: ref(false),
			meta,
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
