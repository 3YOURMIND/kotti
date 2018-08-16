<template>
	<div :class="formGroupStyle">
		<div :class="decreaseButtonStyle" @click="decreaseNumber">
			<i class="yoco">minus</i>
		</div>
		<input
			class="kt-input-number__input"
			type="number"
			:step="step"
			v-model="currentValue"
			:max="max"
			:min="min"
			ref="inputNumber"
			@input="handleInput"
			@change="setValue"
		/>
		<div class="kt-input-number__max" v-text="max"/>
		<div :class="increaseButtonStyle" @click="increaseNumber">
			<i class="yoco">plus</i>
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtInputNumber',
	props: {
		max: { type: Number, default: null },
		min: { type: Number, default: null },
		step: { type: Number, default: 1 },
	},
	data() {
		return {
			currentValue: 0,
		}
	},
	computed: {
		formGroupStyle() {
			return {
				'form-group': true,
				'form-group--error':
					this.currentValue > this.max ||
					this.currentValue < this.min ||
					this.currentValue === '',
			}
		},
		increaseButtonStyle() {
			return {
				'kt-input-number__button': true,
				'kt-input-number__button--disabled': this.currentValue === this.max,
			}
		},
		decreaseButtonStyle() {
			return {
				'kt-input-number__button': true,
				'kt-input-number__button--disabled': this.currentValue === this.min,
			}
		},
	},
	methods: {
		increaseNumber() {
			this.$refs.inputNumber.stepUp(1)
			this.setValue()
		},
		decreaseNumber() {
			this.$refs.inputNumber.stepDown(1)
			this.setValue()
		},
		setValue() {
			this.$emit('input', this.$refs.inputNumber.value)
		},
	},
}
</script>


<style lang="scss" scoped>
.kt-input-number__input {
	width: auto;
	border: 0;
	width: 50%;
	text-align: right;
	color: #3d3d3d;
	padding-right: 0.1rem;
	&:focus {
		box-shadow: 0;
		outline: 0;
	}
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
}
.form-group {
	display: flex;
	width: auto;
	border-radius: 0.1rem;
	border: 1px solid #dbdbdb;
	&--error {
		border-color: #3d3d3d;
	}
}
.kt-input-number__max {
	line-height: 1.6rem;
	width: 50%;
	&::before {
		content: '/';
		padding-right: 0.2rem;
	}
}
.kt-input-number__button {
	border-radius: 0.1rem;
	flex: 0 0 1.6rem;
	width: 1.6rem;
	height: 1.6rem;
	text-align: center;
	line-height: 1.6rem;
	background: #f8f8f8;
	user-select: none;
	&:hover {
		cursor: pointer;
	}
	&--disabled {
		color: #fff;
	}
	&--disabled:hover {
		cursor: default;
	}
}
</style>
