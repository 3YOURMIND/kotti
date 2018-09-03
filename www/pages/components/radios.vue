<template lang=md>

# Radio

## Basic

<div class="element-example">
	<KtRadioGroup label="Good Time" name="group1" v-model="radio1">
		<KtRadio value="morning" label="Good Morning" />
		<KtRadio value="night">
			Good Night <a href="https://en.wikipedia.org/wiki/Good_Night">Link</a>
		</KtRadio>
	</KtRadioGroup>
	<h4>Value: {{radio1}}</h4>
</div>

Radio group require `name` to group the radio buttons. The value of radio group can be assgined via `v-model`.

You can customize radio button template inside `KtRadio` component, or just give `label` variable.

```html
<KtRadioGroup label="Good Time" name="group1" v-model="radio1">
	<KtRadio value="morning" label="Good Morning"></KtRadio>
	<KtRadio value="night">
		Good Night <a href="https://en.wikipedia.org/wiki/Good_Night">Link</a>
	</KtRadio>
</KtRadioGroup>
```

## List Style

<div class="element-example white">
	<KtRadioGroup :label="title" name="Group3" v-model="radio2" listStyle>
		<KtRadio
			v-for="option in options"
			:key="option.value"
			:label="option.label"
			:value="option.value"
		/>
	</KtRadioGroup>
	<h4>Value: {{radio2}}</h4>
</div>

Radio button support list style by setting `listStyle` to `true`;

```html
<KtRadioGroup :label="title" name="Group3" v-model="radio3" listStyle>
	<KtRadio
		v-for="option in options"
		:key="option.value"
		:label="option.label"
		:value="option.value"
	/>
</KtRadioGroup>
```

```json
options: [{
	value: 'option1',
	label: 'Good Day'
},
{
	value: 'option2',
	label: 'Good Night'
},
{
	value: 'option3',
	label: 'Good Morning'
}]
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
			radio2: 'option1',
			title: 'Test',
			options: [
				{
					value: 'option1',
					label: 'Good Day',
				},
				{
					value: 'option2',
					label: 'Good Night',
				},
				{
					value: 'option3',
					label: 'Good Morning',
				},
			],
		}
	},
}
</script>
