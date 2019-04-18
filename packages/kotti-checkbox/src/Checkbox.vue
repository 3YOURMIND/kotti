<template>
	<label class="form-checkbox">
		<input
			class="form-checkbox__input"
			v-model="model"
			type="checkbox"
			v-bind="$attrs"
		/>
		<i class="form-icon" />
		<span class="form-checkbox__label">
			<slot>{{ label }}</slot>
		</span>
	</label>
</template>
<script>
export default {
	name: 'KtCheckbox',
	props: {
		label: { types: [String] },
		value: { default: false, type: Boolean },
	},
	computed: {
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
