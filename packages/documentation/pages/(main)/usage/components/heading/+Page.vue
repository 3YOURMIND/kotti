<template>
	<ComponentInfo v-bind="{ component }" />

	<p>
		H3 heading supports customize actions, and also can work as section toggles.
	</p>

	<h2>Standard Use</h2>

	<CodePreview code='<KtHeading text="Normal Title" />' language="vue-html">
		<KtHeading actionText="Click Me" icon="calendar" text="Normal Title" />
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris auctor
			commodo leo, non malesuada ipsum volutpat sed. Fusce at nulla ipsum. Morbi
			sodales vel ipsum ullamcorper dictum.
		</p>
	</CodePreview>

	<h2>Heading with Action</h2>

	<p>
		When heading type is <code>action</code>, the heading has
		<code>click</code> event for that action.
	</p>

	<CodePreview
		code='
		<KtHeading
			text="Title with action"
			type="action"
			icon="announce"
			actionText="Click Me"
			@click="showAlert"
		/>
	'
		language="vue-html"
	>
		<KtHeading
			actionText="Click Me"
			icon="announce"
			text="Title with action"
			type="action"
			@click="showAlert"
		/>
	</CodePreview>

	<h2>Heading with Toggle</h2>
	<p>
		Set <code>type</code> to <code>toggle</code> make the heading has toggle
		function. You can change the <code>toggleStatus</code> dynamically by
		binding value to it.
	</p>

	<CodePreview
		code='
		<KtHeading
			text="Title with toggle"
			type="toggle"
			toggleText="Open"
			toggleCloseText="Hide"
			:toggleStatus="toggle"
			@toggle="toggle=!toggle"
		>
			<div>We hide this message :)</div>
		</KtHeading>'
		language="vue-html"
	>
		<KtHeading
			text="Title with toggle"
			:toggleStatus="toggle"
			toggleCloseText="Hide"
			toggleText="Open"
			type="toggle"
			@toggle="toggle = !toggle"
		>
			<div>We hide this message :)</div>
		</KtHeading>
	</CodePreview>
	<!-- prettier-ignore -->
	<MarkdownBlock>

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
import { defineComponent, ref } from 'vue'

import { KtHeading } from '@3yourmind/kotti-ui'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'
import { success } from '~/utilities/toaster'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsHeadings',
	components: {
		CodePreview,
		ComponentInfo,
		KtHeading,
	},
	setup() {
		return {
			component: KtHeading,
			showAlert() {
				success({ text: 'H3 Action Clicked' })
			},
			toggle: ref(false),
		}
	},
})
</script>
