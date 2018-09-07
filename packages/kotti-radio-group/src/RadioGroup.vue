<template>
<div :class="formRadioStyle">
	<label class="form-label" v-text="label" />
	<slot />
</div>

</template>

<script>
export default {
	name: 'KtRadioGroup',
	props: {
		label: {
			default: null,
			types: [String, Number, null],
		},
		listStyle: {
			default: false,
			type: Boolean,
		},
		name: {
			required: true,
			types: [String, Number],
		},
		value: {
			default: null,
			types: [String, Number, null],
		},
	},
	computed: {
		formRadioStyle() {
			return {
				'form-group': true,
				'form-group--list-options': this.listStyle,
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.form-group--list-options .form-radio {
	display: block;
}
</style>
