<template>
	<label class="form-checkbox">
		<input v-model="model" :name="name" :value="value" type="checkbox" />
		<i class="form-icon" />
		<slot v-if="$slots.default" />
		<span v-else v-text="label" />
	</label>
</template>

<script>
export default {
	name: 'KtCheckbox',
	props: {
		label: { types: [String] },
		name: { types: [String, Number] },
		value: { types: [Boolean] },
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
