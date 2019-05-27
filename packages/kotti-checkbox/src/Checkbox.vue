<template>
	<label class="form-checkbox">
		<input
			v-model="model"
			class="form-checkbox__input"
			type="checkbox"
			v-bind="$attrs"
			:required="required"
		/>
		<i class="form-icon" :style="iconColor" />
		<slot>
			<span v-if="hasLabel" class="form-checkbox__label" v-text="labelRep" />
		</slot>
	</label>
</template>
<script>
export default {
	name: 'KtCheckbox',
	props: {
		color: { default: null, type: String },
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
		iconColor() {
			return {
				backgroundColor: this.color ? this.color : 'none',
				borderColor: this.color ? this.color : 'none',
			}
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
