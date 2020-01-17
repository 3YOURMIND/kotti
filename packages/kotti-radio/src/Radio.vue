<template>
	<label class="form-radio">
		<input v-model="model" :name="radioName" :value="value" type="radio" />
		<i class="form-icon" />
		<slot v-if="$slots.default" />
		<span v-else v-text="label" />
	</label>
</template>

<script>
export default {
	name: 'KtRadio',
	props: {
		label: { type: [String, Number, Boolean] },
		name: { type: [String, Number] },
		value: { type: [String, Number] },
	},
	computed: {
		model: {
			get() {
				if (this.isInGroup) return this.$parent.value
				return this.value
			},
			set(value) {
				if (this.isInGroup) this.$parent.$emit('input', value)
				this.$emit('input', value)
			},
		},
		radioName() {
			if (this.isInGroup) return this.$parent.name
			return this.name
		},
		isInGroup() {
			return this.$parent.$options.name === 'KtRadioGroup'
		},
	},
}
</script>
