<template lang="md">
<ComponentInfo title="Switch" :meta="meta" />

## Default

<div class="element-example" >
	<KtSwitch v-model="checkbox1" label="Show Message">
		Click me to switch
	</KtSwitch>
	<div v-if="checkbox1">
		<h2>Hello World</h2>
	</div>
</div>

Using `label` to define the upper text of switch.
Default slot is for customize template.

```html
<KtSwitch v-model="checkbox1" label="Show Message">
	Click me to switch
</KtSwitch>
<div v-if="checkbox1">
	<h2>Hello World</h2>
</div>
```
## Indicate Message

<div class="element-example">
	<KtSwitch v-model="checkbox2"
		activeMessage="Show Message"
		inactiveMessage="Close" />
	<div v-if="checkbox2"><h2>Hello World</h2></div>
</div>

`activeMessage` shows when switch value is true.
`inactiveMessage` behaves opposite.

```html
<KtSwitch v-model="checkbox1"
	activeMessage="Show Message"
	inactiveMessage="Close" />
<div v-if="checkbox1"><h2>Hello World</h2></div>
```

## Postion

<div class="element-example">
	<KtSwitch v-model="checkbox3" :right="true">
		Right Switch
	</KtSwitch>
</div>

By default switch button is located left side of the text,
using `right` to change the position.

```html
<KtSwitch v-model="checkbox3" :right="true">
	Right Switch
</KtSwitch>
```

## Usage

### Attributes

| Attribute       | Description                    | Type               | Accepted values | Default |
|:----------------|:-------------------------------|:-------------------|:----------------|:--------|
| activeMessage   | text when `value` is true      | `String`           | —               | —       |
| inactiveMessage | text when `value` is false     | `String`           | —               | —       |
| label           | add label to switch            | `String`, `Number` | —               | —       |
| right           | set switch button to the right | `Boolean`          | —               | `false` |
| value           | value of switch                | `Boolean`          | —               | —       |
</template>

<script lang="ts">
import { KtSwitch } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from '@vue/composition-api'

import ComponentInfo from '../../components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageComponentsSwitches',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			checkbox1: ref(false),
			checkbox2: ref(false),
			checkbox3: ref(false),
			meta: KtSwitch.meta,
		}
	},
})
</script>
