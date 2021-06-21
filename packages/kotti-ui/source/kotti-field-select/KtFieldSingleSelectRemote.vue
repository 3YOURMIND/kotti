<template>
	<div>
		<div ref="tippyTriggerRef">
			<KtField
				v-bind="{ field }"
				class="kt-field-select kt-field-select--single-remote"
				:getEmptyValue="() => null"
				:helpTextSlot="$slots.helpText"
			>
				<input
					v-bind="inputProps"
					@blur="handleInputBlur"
					@click="handleInputClick"
					@focus="handleInputFocus"
					@input="updateQuery"
				/>

				<template v-slot:actionIcon="{ classes, handleClear, showClear }">
					<ActionIconNext
						v-bind="{
							classes,
							handleClear,
							isDropdownOpen,
							showClear,
						}"
					/>
				</template>
			</KtField>
		</div>

		<div ref="tippyContentRef" class="kt-field-select--single-remote__tippy">
			<IconTextItem
				v-for="(option, index) in modifiedOptions"
				:key="index"
				:isDisabled="option.isDisabled"
				:isSelected="option.isSelected"
				:label="option.label"
				@click.stop="() => selectOption(option)"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { useTippy } from '@3yourmind/vue-use-tippy'
import { computed, defineComponent, ref, watch } from '@vue/composition-api'
import { castArray } from 'lodash'
import { roundArrow } from 'tippy.js'

import { KtField } from '../kotti-field'
import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'
import { useForceUpdate } from '../kotti-field/hooks'
import IconTextItem from '../kotti-popover/components/IconTextItem.vue'
import { useTranslationNamespace } from '../kotti-translation/hooks'

import ActionIconNext from './components/ActionIconNext.vue'
import {
	KOTTI_FIELD_REMOTE_SINGLE_SELECT_PROPS,
	KOTTI_FIELD_REMOTE_SELECT_SUPPORTS,
} from './constants'
import { KottiFieldSingleSelectRemote } from './types'
import { sameWidth } from './utils/tippy-utils'

const ARROW_HEIGHT = 7
const NO_DATA = Symbol('NO_DATA')
const UPDATE_QUERY = 'update:query'

const isTippy = (element: Element, tippy: Element | null): boolean => {
	if (tippy === null) return false

	let currentElement = element

	while (currentElement) {
		if (currentElement.isSameNode(tippy)) return true
		currentElement = currentElement?.parentElement
	}

	return false
}

const isEqualValue = (
	currentValue: KottiFieldSingleSelectRemote.Value,
	newValue: KottiFieldSingleSelectRemote.Value,
) => currentValue === newValue

type ModifiedOptions = Array<
	KottiFieldSingleSelectRemote.Props['options'][number] & {
		isSelected: boolean
	}
>

export default defineComponent({
	name: 'KtFieldSingleSelectRemote',
	components: {
		ActionIconNext,
		IconTextItem,
		KtField,
	},
	props: {
		...KOTTI_FIELD_PROPS,
		...KOTTI_FIELD_REMOTE_SINGLE_SELECT_PROPS,
		query: { default: null, type: String },
		value: { default: null, type: [Number, String, Boolean] },
	},
	setup(props: KottiFieldSingleSelectRemote.Props, { emit }) {
		const field = useField<KottiFieldSingleSelectRemote.Value>({
			emit,
			isCorrectDataType: (value): value is KottiFieldSingleSelectRemote.Value =>
				['boolean', 'number', 'string', 'symbol'].includes(typeof value) ||
				value === null,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_REMOTE_SELECT_SUPPORTS,
		})
		const translations = useTranslationNamespace('KtFieldSelects')

		const tippyTriggerRef = ref<Element | null>(null)
		const tippyContentRef = ref<Element | null>(null)

		// track in a ref because the tippy state doesn’t immediately update
		const isDropdownOpen = ref(false)

		const { tippy } = useTippy(
			tippyTriggerRef,
			computed(() => ({
				appendTo: () => document.body,
				arrow: roundArrow,
				content: tippyContentRef.value,
				// hides the tippy if we click-away from the tippy
				hideOnClick: true,
				interactive: true,
				maxWidth: 'none',
				offset: [0, ARROW_HEIGHT],
				onShow: () => {
					isDropdownOpen.value = true
				},
				onHide: () => {
					isDropdownOpen.value = false
				},
				placement: 'bottom',
				popperOptions: {
					modifiers: [sameWidth],
				},
				theme: 'light-border',
				trigger: 'manual',
			})),
		)

		const isInputFocused = ref(false)
		const selectedLabel = computed((): string | null => {
			if (field.currentValue === null) return null
			return (
				props.options.find((option) => option.value === field.currentValue)
					?.label ?? null
			)
		})

		const { forceUpdateKey, forceUpdate } = useForceUpdate()

		const setIsDropdownOpen = (showTippy: boolean) => {
			if (!tippy.value) return

			const tippys = castArray(tippy.value)

			for (const tippy of tippys) {
				if (showTippy) tippy.show()
				else tippy.hide()
			}
		}

		const isUserInteracting = computed(
			() => isInputFocused.value || isDropdownOpen.value,
		)
		watch(isUserInteracting, (newValue) => {
			if (!newValue) emit(UPDATE_QUERY, null)
		})

		return {
			field,
			handleInputBlur: (event: { relatedTarget: HTMLElement }) => {
				const blurToElement = event.relatedTarget
				if (!isTippy(blurToElement, tippyContentRef.value)) {
					setIsDropdownOpen(false)
				}

				isInputFocused.value = false
			},
			handleInputClick: () => {
				// always show the dropdown if the input was clicked
				setIsDropdownOpen(true)
			},
			handleInputFocus: () => {
				// always show the dropdown if the input was focused
				setIsDropdownOpen(true)

				isInputFocused.value = true
			},
			inputProps: computed(() => ({
				class: ['kt-field-select--single-remote__wrapper'],
				forceUpdateKey: forceUpdateKey.value,
				placeholder: props.placeholder ?? undefined,
				size: 1,
				type: 'text',
				value: (() => {
					if (isUserInteracting.value) return props.query ?? undefined

					return selectedLabel.value ?? undefined
				})(),
			})),
			isDropdownOpen,
			modifiedOptions: computed<ModifiedOptions>(() =>
				props.options.length > 0
					? props.options.map((option) => ({
							...option,
							isDisabled: field.isDisabled ?? false,
							isSelected: isEqualValue(field.currentValue, option.value),
					  }))
					: [
							{
								label: translations.value.noDataText,
								isDisabled: true,
								isSelected: false,
								value: NO_DATA,
							},
					  ],
			),
			tippyTriggerRef,
			tippyContentRef,
			selectOption: (
				option: KottiFieldSingleSelectRemote.Props['options'][number],
			) => {
				// ignore disabled options
				if (option.isDisabled) return

				// optimization: no need to change the value if it’s already set
				if (!isEqualValue(field.currentValue, option.value))
					field.setValue(option.value)

				// close the tippy instance whenever a selection is made
				setIsDropdownOpen(false)

				// when a selection is made, intentionally reset the query
				// so that the api-call (for example) can already trigger
				// and load the non-filtered options
				emit(UPDATE_QUERY, null)
			},
			updateQuery: (event: { target: HTMLInputElement }) => {
				const newValue = event.target.value

				emit(UPDATE_QUERY, newValue === '' ? null : newValue)

				forceUpdate()
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-field-select--single-remote {
	&__wrapper {
		display: flex;
		width: 100%;
		padding: 0;
		margin: 0;
		line-height: 1.6;
		border: 0;
	}

	&__tippy {
		max-height: 40vh;
		/*
		  undo padding from theme,
		  alternatively fork theme and remove the left/right padding
		*/
		margin-right: -9px;
		margin-left: -9px;
		overflow-y: auto;
	}
}
</style>
