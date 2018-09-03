<template>
	<label class="form-radio">
		<input
			:name="name"
			:value="value"
			:id="value"
			v-model="parentValue"
			type="radio"
		/>
		<i class="form-icon" />
		<span :for="value">
			<slot/>
			<template>
				<span v-if="!$slots.default" v-text="label"  />
			</template>
		</span>
	</label>
</template>

<script>
export default {
	name: 'KtRadio',
	props: {
		label: [String, Number, Boolean],
		name: [String, Number],
		value: [String, Number],
	},
	computed: {
		parentValue: {
			get() {
				return this._radioGroup.value || ''
			},
			set(value) {
				if (this._radioGroup) {
					this._radioGroup.$emit('input', value)
				}
				this.$emit('input', value)
			},
		},
		radioName() {
			return this._radioGroup.name || this.name
		},
		_radioGroup() {
			let parent = this.$parent
			return parent.$options.name === 'KtRadioGroup' ? parent : false
		},
	},
}
</script>
