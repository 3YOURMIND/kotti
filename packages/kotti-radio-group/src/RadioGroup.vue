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
		value: {
			type: [String, Number],
			default: null,
		},
		label: {
			type: [String, Number],
			default: null,
		},
		name: {
			type: [String, Number],
			required: true,
		},
		listStyle: {
			type: Boolean,
			default: false,
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
.form-group--list-options {
	.form-radio {
		display: block;
	}
}
</style>
