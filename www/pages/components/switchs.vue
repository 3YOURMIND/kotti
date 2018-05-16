<template lang=md>
# Swtich

Using swtich to change the value between `ture` or `false` quickly. 
Since switch only has two values, using radio or select when values are more than two.

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
		Right Swtich
	</KtSwitch>
</div>

By default swicth button is located left side of the text, 
using `right` to change the position. 

```html
<KtSwitch v-model="checkbox3" :right="true">
	Right Switch
</KtSwitch>
```

## Usage

### Attributes

| Attribute | Description | Type | Accepted values | Default |
| ---- | ---- | ---- | ---- | ---- |
| label | add label to switch | `String`, `Number` | - | - |
| right | set switch button to the right | `Boolean` | - | `false` |
| value | value of switch | `Boolean` | - | - |
| activeMessage | text when `value` is true | `String` | - | - |
| inactiveMessage | text when `value` is false | `String`| - | - |
 
</template>

<script>
import KtSwitch from '../../../packages/kotti-switch';

export default {
	name: 'KtSwitchDoc',
	components: {
		KtSwitch,
	},
	data() {
		return {
			checkbox1: false,
			checkbox2: false,
		};
	},
};
</script>
