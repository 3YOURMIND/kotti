<template lang="md">
<ComponentInfo v-bind="{ component }" />

An animated accordion for hiding content on click.

```html
<KtAccordion title="Accordion">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus
	vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh
	vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo.
	Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus
	tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui
	ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis
	eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.
</KtAccordion>
```

<KtAccordion title="Accordion">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.
</KtAccordion>

## Using icons

We can use `yoco` icons as well:

```html
<KtAccordion icon="edit" title="Accordion with icon">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus
	vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh
	vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo.
	Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus
	tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui
	ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis
	eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.
</KtAccordion>
```

<KtAccordion icon="edit" title="Accordion with icon">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.
</KtAccordion>

## Closed by default

```html
<KtAccordion :isClosed="true" title="Openable block :)">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus
	vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh
	vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo.
	Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus
	tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui
	ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis
	eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.
</KtAccordion>
```

<KtAccordion :isClosed="true" title="Openable block :)">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.
</KtAccordion>
</template>

<script lang="ts">
import { KtAccordion } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsAccordion',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtAccordion,
		}
	},
})
</script>
