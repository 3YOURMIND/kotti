<template lang="md">
# TypeScript Usage

### TS Example

```typescript
// enum of icons and the associated ligature / svg name
import { Yoco } "@3yourmind/yoco";

console.log(Yoco.Icon.ANNOUNCE)
// 'announce'
```

### Vue Example

```html
<templateTag>
	<i class="yoco" v-text="Yoco.Icon.ANNOUNCE" />
</templateTag>

<script lang="ts">
	import { Yoco } from '@3yourmind/yoco'
	import { defineComponent } from '@vue/composition-api'

	export default defineComponent({
		name: 'Example',
		setup() {
			return {
				Yoco,
			}
		},
	})
</script>
```

### Details

`@3yourmind/yoco` exports an `enum` with all icons. The usage of the `enum` is preferable as it can be checked for correctness by TypeScript. In certain situations, it can also have autocompletion support.
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	name: 'DocumentationPageIconsTypeScript',
})
</script>

<style lang="scss" scoped>
img[alt='npm-version'] {
	display: block;
	width: 120px;
}
</style>
