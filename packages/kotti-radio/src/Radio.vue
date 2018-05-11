<template>
	<label class="form-radio">
		<input
			type="radio"
			:name="name"
			:value="label"
			v-model="model"
			@change="handleInput"
		/>
		<i class="form-icon" />
		<span>
			<slot />
			<template v-if="!$slots.default">{{ label }}</template>
		</span>
	</label>
</template>

<script>
export default {
	name: 'KtRadio',
	props: {
		name: [String, Number],
		value: [String, Number, Boolean],
		label: [String, Number, Boolean],
	},
	computed: {
		model: {
			get() {
				return this.value;
			},
			set(val) {
				return;
			},
		},
	},
	methods: {
		handleInput(event) {
			let val = event.target.value;
			this.$emit('input', val);
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
