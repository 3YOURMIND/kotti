<template lang="md">
<ComponentInfo v-bind="{ component }" />

H3 heading supports customize actions, and also can work as section toggles.

## Heading with Action

<div class="element-example">
	<KtHeading text="Title with action"
	type="action"
	icon="announce"
	actionText="Click Me"
	@click="showAlert" />
	<p>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		Mauris auctor commodo leo, non malesuada ipsum volutpat sed. Fusce at nulla ipsum.
		Morbi sodales vel ipsum ullamcorper dictum.
	</p>
</div>

When heading type is `action`, the heading has `click` event for that action.

```html
<KtHeading
	text="Title with action"
	type="action"
	icon="announce"
	actionText="Click Me"
	@click="showAlert"
/>
```

## Heading with Toggle

<div class="element-example white">
	<KtHeading text="Title with toggle"
		type="toggle"
		toggleText="Open"
		toggleCloseText="Hide"
		:toggleStatus="toggle"
		@toggle="toggle=!toggle">
		<div>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.
			Mauris auctor commodo leo, non malesuada ipsum volutpat sed. Fusce at nulla ipsum.
			Morbi sodales vel ipsum ullamcorper dictum.
		</div>
	</KtHeading>
</div>

Set `type` to `toggle` make the heading has toggle function.
You can change the `toggleStatus` dynamically by binding value to it.

```html
<KtHeading
	text="Title with toggle"
	type="toggle"
	toggleText="Open"
	toggleCloseText="Hide"
	:toggleStatus="toggle"
	@toggle="toggle=!toggle"
>
	<div>We hide this message :)</div>
</KtHeading>
```

## Usage

### Attributes

| Attribute         | Description             | Type      | Accepted Values             | Default   |
| :---------------- | :---------------------- | :-------- | :-------------------------- | :-------- |
| `type`            | heading types           | `String`  | `action`,`default`,`toggle` | `default` |
| `icon`            | icon before action text | `String`  | string from `yoco`          | —         |
| `actionText`      | text for action         | `String`  | —                           | —         |
| `toggleStatus`    | status of toggle        | `Boolean` | —                           | `false`   |
| `toogleText`      | text for open toggle    | `String`  | —                           | —         |
| `toogleCloseText` | text for close toggle   | `String`  | —                           | —         |

### Events

| Event Name | Description                        | Parameters       |
| :--------- | :--------------------------------- | :--------------- |
| `toggle`   | trigger when toggle button clicked | `(event: Event)` |
| `click`    | trigger when action button clicked | `(event: Event)` |
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { KtHeading } from '@3yourmind/kotti-ui'

import ComponentInfo from '~/components/ComponentInfo.vue'
import { info } from '~/utilities/toaster'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsHeadings',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtHeading,
			toggle: ref(false),
			showAlert() {
				info({ text: 'H3 Action Clicked' })
			},
		}
	},
})
</script>
