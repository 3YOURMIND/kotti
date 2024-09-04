<template>
	<KtField
		v-bind="{ field }"
		class="kt-field-date"
		debounceLabelClick
		:getEmptyValue="() => null"
		:helpTextSlot="$slots.helpText"
	>
		<template #container>
			<div ref="inputContainerRef" class="kt-field__input-container">
				<VueDatePicker
					ref="datePickerRef"
					:actionRow="{
						showPreview: false,
					}"
					:enableTimePicker="false"
					:modelValue="field.currentValue"
					modelType="yyyy-MM-dd"
					:presetDates="shortcuts"
					:ui="{
						calendar: 'date-picker__calendar',
						menu: 'date-picker__menu',
					}"
					@internalModelChange="handleInternalModelChange"
					@update:modelValue="onUpdateModelValue"
				>
					<template #trigger>
						<input
							class="kt-field-text__wrapper"
							v-bind="inputProps"
							@blur="onBlur"
							@focus="onFocus"
							@input="onInput"
						/>
					</template>

					<template #action-buttons>
						<div class="date-picker__action-buttons">
							<KtButton
								:label="translations.cancelButton"
								size="small"
								type="secondary"
								@click="onCloseMenu"
							/>
							<KtButton
								:disabled="isConfirmDisabled"
								:label="translations.confirmButton"
								size="small"
								type="primary"
								@click="onSelectDate"
							/>
						</div>
					</template>
				</VueDatePicker>
			</div>
		</template>
	</KtField>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import { computed, defineComponent, ref } from 'vue'
import type { InputHTMLAttributes } from '@vue/runtime-dom'
import VueDatePicker from '@vuepic/vue-datepicker'
import type { DatePickerInstance } from '@vuepic/vue-datepicker'

import { KtButton } from '../kotti-button'
import { KtField } from '../kotti-field'
import { useField } from '../kotti-field/hooks'
import { useI18nContext, useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'

import { KOTTI_FIELD_DATE_SUPPORTS } from './constants'
import { KottiFieldDate } from './types'
import FieldTime from './FieldTime.vue'

export default defineComponent({
	name: 'KtFieldDate',
	components: {
		FieldTime,
		KtButton,
		KtField,
		VueDatePicker,
	},
	props: makeProps(KottiFieldDate.propsSchema),
	setup(props, { emit }) {
		const field = useField<KottiFieldDate.Value>({
			emit,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_DATE_SUPPORTS,
		})

		const i18NContext = useI18nContext()
		const translations = useTranslationNamespace('KtFieldDateShared')

		// const elDateRef = ref<ElDateWithInternalAPI | null>(null)
		const datePickerRef = ref<DatePickerInstance | null>(null)
		const inputContainerRef = ref<Element | null>(null)
		const internalDateValue = ref<Date | null>()

		const isEditing = ref(false)

		// TODO (?)
		// const isInPopover = inject(KT_IS_IN_POPOVER, false)

		return {
			datePickerRef,
			field,
			handleInternalModelChange: (date: Date) => {
				internalDateValue.value = date
			},
			handleClickOutside: () => {},
			inputProps: computed(
				(): InputHTMLAttributes & {
					class: string[]
					// forceUpdateKey: number
				} => {
					const value = (() => {
						if (isEditing.value) return field.currentValue ?? ''

						if (internalDateValue.value)
							return dayjs(internalDateValue.value).format('YYYY-MM-DD')

						return ''
					})()

					return {
						...field.inputProps,
						class: ['kt-field-text__wrapper'],
						// forceUpdateKey: forceUpdateKey.value,
						type: 'text',
						size: 1,
						value,
						placeholder: props.placeholder ?? undefined,
					}
				},
			),
			inputContainerRef,
			isConfirmDisabled: computed(() => internalDateValue.value === null),
			locale: computed(() => i18NContext.locale),
			onUpdateModelValue: (value: KottiFieldDate.Value) => {
				if (!field.isDisabled && !field.isLoading) field.setValue(value)
			},
			onSelectDate: (value: string | null) => {
				datePickerRef.value?.selectDate?.(value)
			},
			timeDisplay: computed(() => {
				if (internalDateValue.value == null) return null

				return dayjs(internalDateValue.value).format('HH:mm')
			}),
			timePickerProps: computed(() => {
				const date = dayjs(field.currentValue)

				return {
					years: date.get('years'),
					months: date.get('months'),
					days: date.get('days'),
				}
			}),
			translations,
			onCloseMenu: () => {
				datePickerRef.value?.closeMenu?.()
			},
			onInput: (event: InputEvent) => {
				const inputString = (event.target as HTMLInputElement).value as string
				const date = dayjs(inputString)
				field.setValue(inputString)

				if (!date.isValid()) return

				datePickerRef.value.updateInternalModelValue(date.toDate())
			},
			onBlur: () => {
				isEditing.value = false

				if (internalDateValue.value === null) {
					field.setValue(null)
					return
				}

				const date = dayjs(internalDateValue.value)
				if (!date.isValid()) return

				const result = date.format('YYYY-MM-DD')
				field.setValue(result)
			},
			onFocus: () => {
				isEditing.value = true
			},
		}
	},
})
</script>

<style lang="scss">
@import 'styles';
</style>
