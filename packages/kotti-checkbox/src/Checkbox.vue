<template>
	<label class="form-checkbox">
		<input
			class="form-checkbox__input"
			v-model="model"
			type="checkbox"
			v-bind="$attrs"
		/>
		<i class="form-icon" />
		<slot>
			<span v-if="noLabel" class="form-checkbox__label" v-text="label" />
		</slot>
	</label>
</template>
<script>
export default {
	name: 'KtCheckbox',
	props: {
		label: { default: null, type: String },
		value: { default: false, type: Boolean },
	},
	computed: {
	        noLabel() {
			return this.label===null || this.label === undefined
		},
		model: {
			get() {
				return this.value
			},
			set(value) {
				this.$emit('input', value)
			},
		},
	},
}
</script>
