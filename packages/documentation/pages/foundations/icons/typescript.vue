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
<i class="yoco" v-text="Yoco.Icon.ANNOUNCE" />
```

```ts
import { Yoco } from '@3yourmind/yoco'
import { defineComponent } from 'vue'

export default defineComponent({
	name: 'Example',
	setup() {
		return {
			Yoco,
		}
	},
})
```

### Details

`@3yourmind/yoco` exports an `enum` with all icons. The usage of the `enum` is preferable as it can be checked for correctness by TypeScript. In certain situations, it can also have autocompletion support.
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
