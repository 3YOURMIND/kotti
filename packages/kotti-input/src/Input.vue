<template>
	<div :class="formClass">
		<label :class="formLabelClass" v-text="labelRep" />
		<div :class="inputGroupClass">
			<span class="input-group-addon" v-text="addonText" />
			<input
				v-bind="$attrs"
				:class="formInputClass"
				:placeholder="placeholder"
				:required="required"
				:type="type"
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
				@mouseover="showDialog=true"
				@mouseleave="showDialog=false"
			/>
			<div
				v-show="showDialog && hasDialog"
				:class="dialogClass"
			>
				<slot name="dialog">
					{{dialog}}
				</slot>
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
	data() {
		return {
			currentValue: this.value || '',
			isFocused: false,
			showDialog: false,
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
		isCompact: Boolean,
		label: String,
		placeholder: String,
		required: { default: false, type: Boolean },
		type: { type: String, default: 'text' },
		validate: { type: String, default: '' },
		validateText: { type: String, default: '' },
		value: [String, Number],
		dialog: { type: String, default: null },
	},
	computed: {
		labelRep() {
			if (this.required) return `${this.label} *`
			return this.label
		},
		inputGroupClass() {
			return {
				'input-group': Boolean(this.addonText),
				[`has-icon-${this.iconPosition}`]: Boolean(this.icon),
			}
		},
		iconClass() {
			return {
				'form-icon yoco': true,
				'c-hand': this.hasDialog,
			}
		},
		formInputClass() {
			return {
				'form-input': true,
				'form-input--compact': this.isCompact,
			}
		},
		formLabelClass() {
			return {
				'form-label': true,
				'form-label--compact': this.isCompact,
				'form-label--compact--focus':
					this.isCompact && (this.isFocused || this.currentValue),
			}
		},
		formClass() {
			const validateClass = this.validate ? `is-${this.validate}` : ''
			return ['form-group', validateClass]
		},
		dialogClass() {
			const dialogPosition = `dialog--${this.iconPosition}`
			return ['dialog', dialogPosition]
		},
		hasDialog() {
			if (this.dialog || this.$slots.dialog) {
				return true
			}
			return false
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
		handleFocus() {
			this.isFocused = true
		},
		handleBlur() {
			this.isFocused = false
		},
		handleChange(event) {
			this.$emit('change', event.target.value)
		},
	},
}
</script>
