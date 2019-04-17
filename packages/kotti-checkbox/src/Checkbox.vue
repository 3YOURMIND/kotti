<template>
	<label class="form-checkbox">
		<input
			class="form-checkbox__input"
			v-model="model"
			:name="name"
			type="checkbox"
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
		name: { types: [String] },
		value: { types: [Boolean] },
		initialValue: { types: [Boolean] },
	},
	computed: {
		model: {
			get() {
				let value
				if (typeof this.value === 'boolean') {
					value = this.value
				} else {
					value = this.initialValue
				}
				return value
			},
			set(value) {
				this.$emit('input', value)
			},
		},
	},
}
</script>
