<template>
	<div>
		<slot
			v-bind="slotFunctions"
			name="header"
			:values="cloneDeep(valuesList)"
		/>
		<FormControllerListItem
			v-for="(values, index) in valuesList"
			:key="index"
			:context="context"
			:formKey="formKey"
			:index="index"
			:values="values"
			@setValue="setValue({ ...$event, index })"
		>
			<slot
				:addAfter="addAfter(index)"
				:addBefore="addBefore(index)"
				:deleteSelf="() => deleteSelf(index)"
				:index="index"
				name="default"
				:setValues="setValuesIndex(index)"
				:values="cloneDeep(values)"
			/>
		</FormControllerListItem>
		<slot
			v-bind="slotFunctions"
			name="footer"
			:values="cloneDeep(valuesList)"
		/>
	</div>
</template>

<script lang="ts">
import cloneDeep from 'lodash/cloneDeep.js'
import { computed, defineComponent, inject } from 'vue'

import { KT_FORM_CONTEXT } from '../kotti-form/constants'
import type { KottiForm } from '../kotti-form/types'

import FormControllerListItem from './components/FormControllerListItem.vue'
import type { KottiFormControllerListItem } from './types'

type Entry = KottiFormControllerListItem.Props['values']

export default defineComponent({
	name: 'KtFormControllerList',
	components: { FormControllerListItem },
	props: {
		formKey: { required: true, type: String },
	},
	setup(props) {
		const context = inject<KottiForm.Context | null>(KT_FORM_CONTEXT, null)
		if (context === null)
			throw new Error('KtFormControllerList: Could Not Find KtFormContext')

		const valuesList = computed<Entry[]>(() => {
			const result = context.values.value[props.formKey]

			if (!Array.isArray(result))
				throw new Error(
					`KtFormControllerList: Unexpected Data Type ${typeof result}. Expected Array`,
				)

			return result
		})

		return {
			/**
			 * Adds a new valuesList entry after the given index
			 */
			addAfter: (index: number) => (newRow: Entry) => {
				context.setValue(props.formKey, [
					...valuesList.value.slice(0, index + 1),
					newRow,
					...valuesList.value.slice(index + 1, valuesList.value.length),
				])
			},
			/**
			 * Adds a new valuesList entry before the given index
			 */
			addBefore: (index: number) => (newRow: Entry) => {
				context.setValue(props.formKey, [
					...valuesList.value.slice(0, index),
					newRow,
					...valuesList.value.slice(index, valuesList.value.length),
				])
			},
			/**
			 * Makes sure that consumers cannot accidentally modify the internal state
			 */
			cloneDeep,
			context,
			/**
			 * Deletes the given index from the valuesList
			 */
			deleteSelf: (index: number) => {
				context.setValue(
					props.formKey,
					valuesList.value.filter((_, i) => (i === index ? false : true)),
				)
			},
			/**
			 * Updates a single formKey in a valuesList entry
			 */
			setValue: ({
				formKey,
				index,
				newValue,
			}: {
				formKey: string
				index: number
				newValue: unknown
			}) => {
				context.setValue(
					props.formKey,
					valuesList.value.map((oldValue, i) =>
						i === index ? { ...oldValue, [formKey]: newValue } : oldValue,
					),
				)
			},
			/**
			 * Replaces an entire valuesListEntry with new data
			 */
			setValuesIndex: (index: number) => (newValue: Entry) => {
				context.setValue(
					props.formKey,
					valuesList.value.map((oldValue, i) =>
						i === index ? newValue : oldValue,
					),
				)
			},
			/**
			 * Functions that are exposed to the footer and header slots
			 * these should manipulate the entire array, instead of individual items
			 */
			slotFunctions: {
				/**
				 * Adds a new valuesList entry to the end of the entire list
				 */
				addAfter: (newRow: Entry) => {
					context.setValue(props.formKey, [...valuesList.value, newRow])
				},
				/**
				 * Adds a new valuesList entry to the beginning of the entire list
				 */
				addBefore: (newRow: Entry) => {
					context.setValue(props.formKey, [newRow, ...valuesList.value])
				},
				/**
				 * Replaces the entire valuesList with a new one
				 */
				setValues: (newValuesList: Entry[]) => {
					context.setValue(props.formKey, newValuesList)
				},
			},
			valuesList,
		}
	},
})
</script>
