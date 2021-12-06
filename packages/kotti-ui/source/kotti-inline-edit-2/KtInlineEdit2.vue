<template>
	<div :class="objectClass">
		<label class="form-label" v-text="label" />
		<div v-if="isEditing">
			<component
				:is="inputComponent"
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

		<div v-else>
			<div @click="isEditing = true" v-html="value" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

import { KtButton } from '../kotti-button'
import { KtButtonGroup } from '../kotti-button-group'
import { makeProps } from '../make-props'

import { KottiInlineEdit2 } from './types'

export default defineComponent({
	name: 'KtInlineEdit2',
	components: { KtButton, KtButtonGroup },
	props: makeProps(KottiInlineEdit2.propsSchema),
	setup(props) {
		const isEditing = ref<boolean>(false)
		const currentValue = ref<string>(props.value || '')
		const preValue = ref<string>(props.value || '')
		const inputComponent = computed(() =>
			props.isMultiLine ? 'textarea' : 'input',
		)

		const handleDismiss = function (event) {
			isEditing.value = false
			currentValue.value = preValue.value
			this.$emit('input', preValue.value)
			// Not sure it helps to send event with dismiss
			this.$emit('dismiss', event)
		}

		return {
			currentValue,
			isEditing,
			handleChange: function (event) {
				console.log('handleChange')
				this.$emit('change', event.target.value)
			},
			handleConfirm: function (event) {
				console.log('currentvalue', currentValue.value)
				isEditing.value = false
				preValue.value = currentValue.value
				this.$emit('confirm', event)
			},
			handleDismiss,
			handleInput: function (event) {
				console.log('handleInput')
				const value = event.target.value
				preValue.value = currentValue.value
				currentValue.value = value
				this.$emit('input', value)
			},
			inputComponent,
			objectClass: computed(() => {
				return {
					'inline-edit': true,
					'form-group': isEditing,
					'label-value': isEditing,
				}
			}),
		}
	},
})
</script>
