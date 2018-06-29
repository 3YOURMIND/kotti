<template>
	<div :class="formClass">
		<label class="form-label" v-text="label" />
		<div :class="inputGroupClass">
			<span class="input-group-addon" v-text="addonText" />
			<input
				v-bind="$attrs"
				:placeholder="placeholder"
				:type="type"
				:value="currentValue"
				@change="handleChange"
				@input="handleInput"
				class="form-input"
			/>
			<i class="form-icon yoco" v-text="icon" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtInput',
	data() {
		return {
			currentValue: this.value || '',
		}
	},
	watch: {
		value(val, oldValue) {
			this.setCurrentValue(val)
		},
	},
	props: {
		addonText: { type: String, default: '' },
		icon: { type: String, default: '' },
		iconPosition: { type: String, default: 'left' },
		label: String,
		placeholder: String,
		type: { type: String, default: 'text' },
		validate: { type: String, default: '' },
		value: [String, Number],
	},
	computed: {
		inputGroupClass() {
			return {
				'input-group': Boolean(this.addonText),
				[`has-icon-${this.iconPosition}`]: Boolean(this.icon),
			}
		},
		formClass() {
			const validateClass = `is-${this.validate}`
			return ['form-group', validateClass]
		},
	},
	methods: {
		setCurrentValue(value) {
			if (value === this.currentValue) return
			this.currentValue = value
		},
		handleInput(event) {
			const value = event.target.value
			this.$emit('input', value)
			this.setCurrentValue(value)
		},
		handleChange(event) {
			this.$emit('change', event.target.value)
		},
	},
}
</script>
