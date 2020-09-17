<template lang="md">
# Icons

![npm-version](https://badge.fury.io/js/%403yourmind%2Fyoco.svg)

### TypeScript Usage

```typescript
// enum of icons and the associated ligature / svg name
import { Icon } "@3yourmind/yoco";

console.log(Icon.ANNOUNCE)
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

<script>
import { Yoco } from '@3yourmind/yoco'

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
			Yoco,
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
