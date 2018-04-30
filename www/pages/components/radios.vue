<template>
<div>
  <kt-radio v-model="radio1" label="hello">Hello World</kt-radio>
  <kt-radio v-model="radio1" label="good">Good Morning</kt-radio>


  <KtRadioGroup label="Good Time">
    <kt-radio v-model="radio2" label="good">Good Morning</kt-radio>
    <kt-radio v-model="radio2" label="night">Good Night</kt-radio>
  </KtRadioGroup>
</div>
</template>


<script>
import KtRadio from '../../../packages/kotti-radio';
import KtRadioGroup from '../../../packages/kotti-radio-group';
export default {
	name: 'KtRadioDoc',
	components: {
		KtRadio,
		KtRadioGroup,
	},
	data() {
		return {
			radio1: 'hello',
			radio2: 'good',
		};
	},
};
</script>
