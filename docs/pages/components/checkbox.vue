<template lang="md">

# Radio

## Basic

<div class="element-example">
	<KtCheckbox :value="true" label="Good Morning" />
	<KtCheckbox :value="false">
		Good Night <a href="https://en.wikipedia.org/wiki/Good_Night">Link</a>
	</KtCheckbox>
	<h4>Value: {{radio1}}</h4>
</div>

</template>

<script>
export default {
	name: 'KtCheckboxDoc',
	data() {
		return {
			radio1: 'morning',
			radio2: 'option1',
			title: 'Test',
			options: [
				{
					label: 'Good Day',
					value: 'option1',
				},
				{
					label: 'Good Night',
					value: 'option2',
				},
				{
					label: 'Good Morning',
					value: 'option3',
				},
			],
		}
	},
}
</script>
