<template>
	<div :class="objectClass">
		<label class="form-label" v-text="label" />
		<div
			v-if="!editMode"
			v-html="postParser(dangerouslyOverrideParser(representValue))"
			@click="editMode = true"
			:class="representTextClass"
		/>
		<div v-else>
			<component
				:is="inputComponent"
				v-bind="$attrs"
				:value="currentValue"
				v-text="currentValue"
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
import escape from 'lodash/escape'
import KtButton from '../../kotti-button'
import KtButtonGroup from '../../kotti-button-group'

const DEFAULT_POST_PARSER = _ => _
const newLineParser = t => t.replace(/\n/gm, '<br/>')

export default {
	name: 'KtInlineEdit',
	components: {
		KtButton,
		KtButtonGroup,
	},
	props: {
		dangerouslyOverrideParser: { default: escape, type: Function },
		postEscapeParser: { default: DEFAULT_POST_PARSER, type: Function },
		invalidMessage: { default: 'Click to edit', type: String },
		multiline: { deafult: false, type: Boolean },
		label: { default: null, types: [String, null] },
		value: { types: [String, Number] },
	},
	data() {
		return {
			editMode: false,
			currentValue: this.value || '',
			preValue: this.value || '',
		}
	},
	computed: {
		inputComponent() {
			return this.multiline ? 'textarea' : 'input'
		},
		postParser() {
			return this.multiline && this.postEscapeParser === DEFAULT_POST_PARSER
				? newLineParser
				: this.postEscapeParser
		},
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
		value: {
			handler: 'setCurrentValue',
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
