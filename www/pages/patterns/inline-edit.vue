<template lang="md">
# Inline Edit

## Basic
<div class="element-example white">
	<KtInlineEdit
		label="Picture Title"
		placeholder="Give a title"
		invalidMessage="Click to change the title"
		v-model="value1"
		@confirm="showAlert('Confirmed Function')"
		@dismiss="showAlert('Dismissed Function')"
		class="mb-16px"
	/>
	<img src="https://picsum.photos/800/200"/>
</div>

```html
<KtInlineEdit
	label="Picture Title"
	placeholder="this holder"
	invalidMessage="Click to change the title"
	v-model="value1"
	@confirm="showAlert('Confirmed Function')"
	@dismiss="showAlert('Dismissed Function')"
	class="mb-16px"
/>
<img src="https://picsum.photos/800/200"/>
```

## Usage

### Attribuites

| Attribute        | Description                      | Type      | Accepted values | Default           |
|:-----------------|:---------------------------------|:----------|:----------------|:------------------|
| `invalidMessage` | message                          | `String`  | —               | `"Click to edit"` |
| `label`          | label text                       | `String`  | —               | —                 |
| `value`          | value of message and input value | `v-model` | —               | —                 |

### Input Events

| Event Name | Description                       | Parameters       |
|:-----------|:----------------------------------|:-----------------|
| `change`   | triggers when input value changes | `(event: Event)` |

### Button Events

| Event Name | Description                          | Parameters       |
|:-----------|:-------------------------------------|:-----------------|
| `confirm`  | triggers when confirm button clicked | `(event: Event)` |
| `dismiss`  | triggers when dismiss button clicked | `(event: Event)` |
</template>

<script>
export default {
	name: 'KtInlineEditDoc',
	data() {
		return {
			value1: '',
		}
	},
	methods: {
		showAlert(msg) {
			window.alert(msg)
		},
	},
}
</script>
