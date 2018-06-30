<template lang=md>

# Radio

<div class="element-example white">
	<KtRadio v-model="radio1" label="morning">Good Morning</KtRadio>
	<KtRadio v-model="radio1" label="night">Good Night</KtRadio>
</div>

```html
<KtRadio v-model="radio1" label="morning">Good Morning</KtRadio>
<KtRadio v-model="radio1" label="night">Good Night</KtRadio>
```


<div class="element-example">
	<KtRadioGroup label="Good Time">
		<KtRadio v-model="radio2" label="morning">Good Morning</KtRadio>
		<KtRadio v-model="radio2" label="night">Good Night</KtRadio>
	</KtRadioGroup>
</div>

```html
<KtRadioGroup label="Good Time">
	<KtRadio v-model="radio2" label="morning">Good Morning</KtRadio>
	<KtRadio v-model="radio2" label="night">Good Night</KtRadio>
</KtRadioGroup>
```

</template>


<script>
import KtRadio from '../../../packages/kotti-radio'
import KtRadioGroup from '../../../packages/kotti-radio-group'

export default {
	name: 'KtRadioDoc',
	components: {
		KtRadio,
		KtRadioGroup,
	},
	data() {
		return {
			radio1: 'morning',
			radio2: 'morning',
		}
	},
}
</script>
