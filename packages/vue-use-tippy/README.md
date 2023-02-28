# `@3yourmind/vue-use-tippy`

> Vue hook for `tippy.js`

## Usage

```typescript
import { useTippy } from '@3yourmind/vue-use-tippy'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
	setup() {
		const contentRef = ref(null)

		useTippy(
			helpTextTriggerRef,
			computed(() => ({
				appendTo: () => document.body,
				content: contentRef,
				interactive: true,
				theme: 'light-border',
			})),
		)

		return {
			contentRef,
		}
	},
})
```

## Options

See <https://atomiks.github.io/tippyjs/v6/all-props/> for supported options
