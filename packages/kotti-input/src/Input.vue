<template>
	<div :class="formClass">
		<label :class="formLabelClass" v-text="labelRep" :for="labelForAttr" />
		<div :class="inputGroupClass">
			<label class="input-group-addon" v-text="addonText" :for="labelForAttr" />
			<input
				v-bind="$attrs"
				:class="formInputClass"
				:id="labelForAttr"
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
				:class="iconClass"
				v-text="icon"
				ref="inputIcon"
				@mouseover="showDialog = true"
				@mouseleave="showDialog = false"
			/>
			<div v-show="showDialog && hasDialog" :class="dialogClass">
				<slot name="dialog">{{ dialog }}</slot>
			</div>
		</div>
		<div class="form-validation-text" v-if="validateText">
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
		labelFor: { default: null },
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
