<template>
	<label :class="labelClass">
		<input
			class="form-checkbox__input"
			v-model="model"
			type="checkbox"
			v-bind="$attrs"
		/>
		<i class="form-icon" :style="iconColor"/>
		<slot>
			<span v-if="hasLabel" class="form-checkbox__label" v-text="label" />
		</slot>
	</label>
</template>
<script>
export default {
	name: 'KtCheckbox',
	props: {
		label: { default: null, type: String },
		color: { default: null, type: String },
		value: { default: false, type: Boolean },
	},
	computed: {
	    hasLabel() {
			return !(this.label===null || this.label === undefined)
		},
		labelClass() {
			return color ? 'form-checkbox-color' : 'form-checkbox'
		},
		iconColor() {
			return {
				'background-color': color ? color : 'none',
				'border-color': color ? color : 'none'
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
