<template lang="md">
<ComponentInfo v-bind="{ component }" />

An animated accordion for hiding content on click. The accordion is fully controlled.

```html
<KtAccordion
	:isClosed="isFirstAccordionClosed"
	@update:isClosed="(newVal) => (isFirstAccordionClosed = newVal)"
	title="Accordion"
>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus
	vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh
	vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo.
	Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus
	tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui
	ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis
	eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.
</KtAccordion>
```

<div class="element-example">
	<KtAccordion dataTest="documentation-accordion" :isClosed="isFirstAccordionClosed" @update:isClosed="(newVal) => isFirstAccordionClosed = newVal" title="Accordion">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.
	</KtAccordion>
</div>

## Using icons

We can use `yoco` icons as well:

```html
<KtAccordion
	icon="edit"
	:isClosed="isSecondAccordionClosed"
	@update:isClosed="(newVal) => (isSecondAccordionClosed = newVal)"
	title="Accordion with icon"
>
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus
	vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh
	vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo.
	Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus
	tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui
	ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis
	eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.
</KtAccordion>
```

<div class="element-example">
	<KtAccordion dataTest="documentation-accordion-icon" icon="edit" :isClosed="isSecondAccordionClosed" @update:isClosed="(newVal) => isSecondAccordionClosed = newVal" title="Accordion with icon">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.
	</KtAccordion>
</div>

## Since the component is fully controlled, custom open/close logic can be easily set up.

```html
<KtButton
	label="Toggle Accordion"
	@click="() => (isThirdAccordionClosed = !isThirdAccordionClosed)"
/>
<KtAccordion :isClosed="isThirdAccordionClosed" title="Openable block :)">
	Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus
	vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh
	vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo.
	Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus
	tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui
	ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis
	eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.
</KtAccordion>
```

<div class="element-example">
	<KtButton label="Toggle Accordion" @click="() => isThirdAccordionClosed = !isThirdAccordionClosed" />
	<KtAccordion dataTest="documentation-accordion-remote" :isClosed="isThirdAccordionClosed" title="Openable block :)">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique purus vel felis posuere, quis posuere enim consequat. Cras vel metus non nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et nisl.
	</KtAccordion>
</div>
</template>

<script lang="ts">
import { KtAccordion, KtButton } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from 'vue'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsAccordion',
	components: {
		ComponentInfo,
		KtAccordion,
		KtButton,
	},
	setup() {
		return {
			component: KtAccordion,
			isFirstAccordionClosed: ref(false),
			isSecondAccordionClosed: ref(false),
			isThirdAccordionClosed: ref(false),
		}
	},
})
</script>
