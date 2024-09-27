<template>
	<ComponentInfo v-bind="{ component }" />

	H3 heading supports customize actions, and also can work as section toggles.

	<h2>Heading with Action</h2>

	<div class="element-example">
		<KtHeading
			text="Title with action"
			type="action"
			icon="announce"
			actionText="Click Me"
			@click="showAlert"
		/>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris auctor
			commodo leo, non malesuada ipsum volutpat sed. Fusce at nulla ipsum. Morbi
			sodales vel ipsum ullamcorper dictum.
		</p>
	</div>

	When heading type is `action`, the heading has `click` event for that action.

	<!-- prettier-ignore -->
	<MarkdownBlock>
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
</MarkdownBlock>

	<div class="element-example white">
		<KtHeading
			text="Title with toggle"
			type="toggle"
			toggleText="Open"
			toggleCloseText="Hide"
			:toggleStatus="toggle"
			@toggle="toggle = !toggle"
		>
			<div>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris auctor
				commodo leo, non malesuada ipsum volutpat sed. Fusce at nulla ipsum.
				Morbi sodales vel ipsum ullamcorper dictum.
			</div>
		</KtHeading>
	</div>

	<!-- prettier-ignore -->
	<MarkdownBlock>
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
</MarkdownBlock>
</template>

<script lang="ts">
import { KtHeading } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from 'vue'

import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsHeadings',
	components: {
		ComponentInfo,
		KtHeading,
	},
	setup() {
		return {
			component: KtHeading,
			toggle: ref(false),
			showAlert() {
				// eslint-disable-next-line no-alert
				window.alert('H3 Action Clicked')
			},
		}
	},
})
</script>
