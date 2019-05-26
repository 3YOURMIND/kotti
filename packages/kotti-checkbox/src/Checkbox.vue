<template>
	<label class="form-checkbox">
		<input
			class="form-checkbox__input"
			v-model="model"
			type="checkbox"
			v-bind="$attrs"
		/>
		<i class="form-icon" :style="iconColor" />
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
			return !(this.label === null || this.label === undefined)
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
