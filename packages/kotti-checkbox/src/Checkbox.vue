<template>
	<label class="form-checkbox">
		<input
			class="form-checkbox__input"
			v-model="model"
			type="checkbox"
			v-bind="$attrs"
			:required="required"
		/>
		<i class="form-icon" />
		<slot>
			<span v-if="hasLabel" class="form-checkbox__label" v-text="labelRep" />
		</slot>
	</label>
</template>
<script>
export default {
	name: 'KtCheckbox',
	props: {
		label: { default: null, type: String },
		required: { default: false, type: Boolean },
		value: { default: false, type: Boolean },
	},
	computed: {
		hasLabel() {
			return this.label && this.label.length
		},
		labelRep() {
			return this.required ? `${this.label} *` : this.label
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
