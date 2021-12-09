<template>
	<div :class="objectClass">
		<label class="form-label" v-text="label" />
		<div v-if="isEditing">
			<component
				:is="inputComponent"
				v-bind="$attrs"
				class="form-input"
				type="text"
				:value="currentValue"
				@change="handleChange"
				@input="handleInput"
				v-text="currentValue"
			/>
			<KtButtonGroup class="inline-edit__edit-buttons">
				<KtButton icon="close" @click="handleDismiss" />
				<KtButton icon="check" @click="handleConfirm" />
			</KtButtonGroup>
		</div>
		<div
			v-else
			:class="representedValueClass"
			@click="isEditing = true"
			v-html="representedValue"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

import { KtButton } from '../kotti-button'
import { KtButtonGroup } from '../kotti-button-group'
import { makeProps } from '../make-props'

import { DEFAULT_POST_PARSER } from './types'
import { KottiInlineEdit2 } from './types'

export default defineComponent({
	name: 'KtInlineEdit2',
	components: { KtButton, KtButtonGroup },
	props: makeProps(KottiInlineEdit2.propsSchema),
	setup(props) {
		const isEditing = ref<boolean>(false)
		const currentValue = ref<string>(props.value || '')
		const preValue = ref<string>(props.value || '')
		const newLineParser = (t) => t.replace(/\n/gm, '<br/>')
		const postParser = computed(() => {
			return props.isMultiLine && props.postEscapeParser === DEFAULT_POST_PARSER
				? newLineParser
				: props.postEscapeParser
		})
		return {
			currentValue,
			handleChange: function (event) {
				this.$emit('change', event.target.value)
			},
			handleConfirm: function () {
				isEditing.value = false
				preValue.value = currentValue.value
				this.$emit('confirm', currentValue.value)
			},
			handleDismiss: function () {
				isEditing.value = false
				currentValue.value = preValue.value
				this.$emit('input', preValue.value)
				this.$emit('dismiss', event)
			},
			handleInput: function (event) {
				const value = event.target.value
				currentValue.value = value
				this.$emit('input', value)
			},
			isEditing,
			inputComponent: computed(() =>
				props.isMultiLine ? 'textarea' : 'input',
			),
			objectClass: computed(() => {
				return {
					'inline-edit': true,
					'label-value': !isEditing.value,
				}
			}),
			representedValue: computed(() =>
				postParser.value(
					props.dangerouslyOverrideParser(
						currentValue.value ? currentValue.value : props.placeholder,
					),
				),
			),
			representedValueClass: computed(() => {
				return {
					'default editable': true,
					'editable--empty': !currentValue.value,
				}
			}),
		}
	},
})
</script>
