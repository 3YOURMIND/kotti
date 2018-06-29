<template>
	<label class="form-radio">
		<input
			:name="name"
			:value="label"
			@change="handleInput"
			type="radio"
			v-model="model"
		/>
		<i class="form-icon" />
		<span>
			<slot/>
			<template v-if="!$slots.default" v-text="label"></template>
		</span>
	</label>
</template>

<script>
export default {
	name: 'KtRadio',
	props: {
		label: [String, Number, Boolean],
		name: [String, Number],
		value: [String, Number, Boolean],
	},
	computed: {
		model: {
			get() {
				return this.value
			},
			set(val) {
				return
			},
		},
	},
	methods: {
		handleInput(event) {
			this.$emit('input', event.target.value)
		},
	},
}
</script>
