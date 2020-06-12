<template>
	<label class="form-radio">
		<input v-model="model" :name="radioName" type="radio" :value="value" />
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
<style lang="scss">
:root {
	--radio-color: var(--interactive-01);
}
.form-radio {
	.form-icon {
		border-radius: 50%;
	}

	input {
		&:focus + .form-icon {
			border-color: var(--radio-color);
		}
		&:checked + .form-icon {
			background-color: var(--radio-color);
			border-color: var(--radio-color);
			&::before {
				position: absolute;
				top: 50%;
				left: 50%;
				width: 4px;
				height: 4px;
				content: '';
				background: #fff;
				border-radius: 50%;
				transform: translate(-50%, -50%);
			}
		}
	}
}
</style>
