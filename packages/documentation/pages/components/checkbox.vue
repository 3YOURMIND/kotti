<template lang="md">
<ComponentInfo title="Checkbox" :meta="meta" />

## Basic usage

The `KtCheckbox` component requires the `v-model` and `label` properties. Other arguments (e.g. `name`) get directly passed to the `<input>` element.

```html
<div class="element-example">
	<KtCheckbox v-model="value1" label="Will you give everything up for kotti?" />
</div>
```

<div class="element-example">
	<KtCheckbox v-model="value1" label="Will you give everything up for kotti?" />
	<h4>Value: {{value1}}</h4>
</div>

We can also specify the label as a default scope:

```html
<div class="element-example">
	<KtCheckbox v-model="value2">
		I agree to the <a href="https://3yourmind.com">Terms of usage</a>
	</KtCheckbox>
</div>
```
<div class="element-example">
	<KtCheckbox v-model="value2">
		I agree to the <a href="https://3yourmind.com">Terms of usage</a>
	</KtCheckbox>
	<h4>Value: {{value2}}</h4>
</div>

Example of using the required field:

<div class="element-example">
	<KtCheckbox v-model="value3" required label="i am required"/>
	<h4>Value: {{value3}}</h4>
</div>


## Properties

| Attribute | Description                  | Type      | Accepted values | Default |
|:----------|:-----------------------------|:----------|:----------------|:--------|
| `label`   | label input field            | `String`  | —               | —       |
| `name`    | name attribute for the field | `String`  | —               | —       |
| `value`   | value                        | `Boolean` | [true, false]   | false   |
| `required`| required                     | `Boolean` | [true, false]   | false   |
</template>

<script lang="ts">
import { KtCheckbox } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from '@vue/composition-api'

import ComponentInfo from '../../components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageComponentsCheckbox',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			meta: KtCheckbox.meta,
			value1: ref(true),
			value2: ref(false),
			value3: ref(undefined),
		}
	},
})
</script>
