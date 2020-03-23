<template>
	<div :class="formClass">
		<label :class="formLabelClass" :for="labelForAttr" v-text="labelRep" />
		<div :class="inputGroupClass">
			<label class="input-group-addon" :for="labelForAttr" v-text="addonText" />
			<input
				:id="labelForAttr"
				v-bind="$attrs"
				:class="formInputClass"
				:placeholder="placeholder"
				:required="required"
				:type="type"
				:step="inputStep"
				:value="currentValue"
				@blur="handleBlur"
				@change="handleChange"
				@focus="handleFocus"
				@input="handleInput"
			/>
			<i
				ref="inputIcon"
				:class="iconClass"
				@mouseover="showDialog = true"
				@mouseleave="showDialog = false"
				v-text="icon"
			/>
			<div v-show="showDialog && hasDialog" :class="dialogClass">
				<slot name="dialog">{{ dialog }}</slot>
			</div>
		</div>
		<div v-if="validateText" class="form-validation-text">
			<span v-text="validateText" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtInput',
	props: {
		addonText: { default: '', type: String },
		dialog: { default: null, type: String },
		icon: { default: '', type: String },
		iconPosition: { default: 'left', type: String },
		isCompact: { default: false, type: Boolean },
		label: String,
		placeholder: String,
		required: { default: false, type: Boolean },
		step: { default: '1', type: String },
		type: { default: 'text', type: String },
		validate: { default: '', type: String },
		validateText: { default: '', type: String },
		labelFor: { default: null, type: String },
		value: { default: null, type: [String, Number, null] },
	},
	data() {
		return {
			currentValue: this.value === null ? '' : this.value,
			isFocused: false,
			showDialog: false,
		}
	},
	computed: {
		dialogClass() {
			const dialogPosition = `dialog--${this.iconPosition}`
			return ['dialog', dialogPosition]
		},
		formClass() {
			const validateClass = this.validate ? `is-${this.validate}` : ''
			return ['form-group', validateClass]
		},
		formInputClass() {
			return {
				'form-input': true,
				'form-input--compact': this.shouldBeCompact,
				'form-input--compact--focus': this.shouldBeCompact && this.isFocused,
			}
		},
		formLabelClass() {
			return {
				'form-label': true,
				'form-label--compact': this.shouldBeCompact,
				'form-label--compact--focus':
					this.shouldBeCompact && (this.isFocused || this.currentValue),
			}
		},
		hasDialog() {
			return this.dialog || this.$slots.dialog
		},
		iconClass() {
			return {
				'form-icon yoco': true,
				'c-hand': this.hasDialog,
			}
		},
		inputGroupClass() {
			return {
				'input-group': Boolean(this.addonText),
				[`has-icon-${this.iconPosition}`]: Boolean(this.icon),
			}
		},
		inputStep() {
			return this.type === 'number' ? this.step : null
		},
		labelForAttr() {
			return this.labelFor ? this.labelFor : `field-${this._uid}`
		},
		labelRep() {
			if (this.required) return `${this.label} *`
			return this.label
		},
		shouldBeCompact() {
			return this.isCompact && !this.addonText
		},
	},
	watch: {
		value: 'setCurrentValue',
	},
	methods: {
		handleBlur() {
			this.isFocused = false
		},
		handleChange(event) {
			this.$emit('change', event.target.value)
		},
		handleFocus() {
			this.isFocused = true
		},
		handleInput(event) {
			const { value } = event.target
			this.$emit('input', value)
			this.setCurrentValue(value)
		},
		setCurrentValue(value) {
			if (value === this.currentValue) return
			this.currentValue = value === null ? '' : value
		},
	},
}
</script>
<style lang="scss">
.form-input {
	position: relative;
	width: 100%;
	height: $control-size;
	padding: 0 $unit-2;
	line-height: $line-height;
	color: $darkgray-500;
	border: 1px solid $lightgray-400;
	border-radius: $border-radius;
	outline: none;
	-webkit-appearance: none;

	&:focus {
		@include control-shadow();
		border-color: $primary-500;
	}

	&:invalid {
		border: 1px solid $red-500;
		&:focus {
			@include control-shadow($red-500);
		}
		~ .form-icon {
			color: $red-500;
		}
	}
	&--compact {
		height: $control-size-lg;
		padding-top: 0.6rem;
		line-height: 0.8rem;
		&::placeholder {
			color: transparent;
		}
		&--focus::placeholder {
			color: $lightgray-500;
		}
	}
}
</style>
