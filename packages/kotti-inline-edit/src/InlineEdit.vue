<template>
	<div :class="objectClass">
		<label class="form-label" v-text="label" />
		<div
			v-if="!editMode"
			v-text="representValue"
			@click="editMode=true"
			:class="representTextClass"
		/>
		<div v-else>
			<input
				v-bind="$attrs"
				:value="currentValue"
				@change="handleChange"
				@input="handleInput"
				class="form-input"
				type="text"
			/>
			<KtButtonGroup shadow class="inline-edit__edit-buttons">
				<KtButton icon="close" @click="handleDismiss" />
				<KtButton icon="check" @click="handleConfirm" />
			</KtButtonGroup>
		</div>
	</div>
</template>

<script>
import KtButton from '../../kotti-button'
import KtButtonGroup from '../../kotti-button-group'

export default {
	name: 'KtInlineEdit',
	components: {
		KtButton,
		KtButtonGroup,
	},
	props: {
		value: [String, Number],
		invalidMessage: { type: String, default: 'Click to edit' },
		label: { type: String, default: null },
	},
	data() {
		return {
			editMode: false,
			currentValue: this.value || '',
			preValue: this.value || '',
		}
	},
	computed: {
		objectClass() {
			return {
				'inline-edit': true,
				'form-group': this.editMode,
				'label-value': !this.editMode,
			}
		},
		representValue() {
			return this.currentValue ? this.currentValue : this.invalidMessage
		},
		representTextClass() {
			return {
				'default editable': true,
				'editable--empty': !this.currentValue,
			}
		},
	},
	watch: {
		value(val, oldValue) {
			this.setCurrentValue(val)
		},
	},
	methods: {
		handleConfirm(event) {
			this.editMode = false
			this.preValue = this.currentValue
			this.$emit('confirm', event)
		},
		handleDismiss(event) {
			this.editMode = false
			this.setCurrentValue(this.preValue)
			this.$emit('input', this.preValue)
			this.$emit('dismiss', event)
		},
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
