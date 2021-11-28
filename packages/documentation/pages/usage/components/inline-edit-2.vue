<template lang="md">
<ComponentInfo v-bind="{ component }" />

## Basic

<div class="element-example white">
 <KtInlineEdit2
	label="Instructions"
	:value="value1"
	@input="(e)=> value1=e"
	@confirm="handleConfirmValue1"
	@cancel="handleCancelValue1"
/>
</div>

## Multiline

<div class="element-example white">
	<KtInlineEdit2
		isMultiLine
		label="Instructions"
		placeholder="Edit instructions"
		:value="value2"
		@input="(e)=> value2=e"
	/>
</div>

## Usage

### Attributes

| Attribute       | Description                  |        Type        | Default                   |
| :-------------- | :--------------------------- | :----------------: | ------------------------- | --- |
| `editableValue` | value while editing          |  `[String, null]`  | `null`                    |     |
| `isMultiLine`   | allow input enter multilines |     `Boolean`      | `false`                   |
| `label`         | label text                   |      `String`      | `null`                    |
| `placeholder`   | value to display             |      `String`      | depends on locale         |
| `size`          | value to display             | `Kotti.Field.Size` | `Kotti.Field.Size.MEDIUM` |

### Input Events

| Event Name             | Description                         | Parameters                                     |
| :--------------------- | :---------------------------------- | :--------------------------------------------- |
| `cancel`               | triggers when you click-away        | -                                              |
| `confirm`              | triggers when click on check button | -                                              |
| `update:editableValue` | triggers while user is editing      | `Kotti.InlineEdit2.Events.UpdateEditableValue` |
</template>

<script lang="ts">
import { KtInlineEdit2 } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsInlineEdit2',
	components: {
		ComponentInfo,
	},
	setup() {
		const value1 = ref('value1')

		return {
			handleConfirmValue1: () => {
				// eslint-disable-next-line no-console
				console.log('confirm', value1.value)
			},
			handleCancelValue1: () => {
				// eslint-disable-next-line no-console
				console.log('cancel', value1.value)
			},
			value1,
			value2: ref('value2'),
			component: KtInlineEdit2,
		}
	},
})
</script>
