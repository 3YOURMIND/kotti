<template lang=md>
# Swtich


<div class="element-example">
  <KtSwitch v-model="checkbox1"activeMessage="Show Message" inactiveMessage="Close" />
  <div v-if="checkbox1"><h2>Hello World</h2></div>
</div>

```html 
<KtSwitch v-model="checkbox1"activeMessage="Show Message" inactiveMessage="Close" />
```

<div class="element-example" >
  <KtSwitch v-model="checkbox2" :right="true">
    Show message
  </KtSwitch>
  <div v-if="checkbox2">
    <h2>Hello World</h2>
  </div>
</div>

```html
<KtSwitch v-model="checkbox2" :right="true">
  Show message
</KtSwitch>
```


</template>

<script>
import KtSwitch from '../../../packages/kotti-swtich';

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
