<template>
	<div ref="optionsRef" class="kt-field-select-options">
		<div v-if="isLoading" class="kt-field-select-options__loading">
			<div class="loading" />
		</div>
		<FieldSelectOptionsItem
			v-if="modifiedOptions.length === 0"
			dataTest="NO_DATA"
			isDisabled
			:label="translations.noDataText"
			type="option"
			@scrollTo="scrollTo"
		/>
		<FieldSelectOptionsItem
			v-for="(option, index) in modifiedOptions"
			:key="`option-${index}`"
			:dataTest="option.dataTest"
			:isDisabled="option.isDisabled"
			:isHovered="isHovered('option', index)"
			:isSelected="option.isSelected"
			:label="option.label"
			type="option"
			@click="() => selectOption(option)"
			@scrollTo="scrollTo"
		>
			<slot
				v-bind="{ index, option, select: () => selectOption(option) }"
				name="option"
			/>
		</FieldSelectOptionsItem>
		<div
			v-if="modifiedActions.length > 0"
			class="kt-field-select-options__separator"
		/>
		<FieldSelectOptionsItem
			v-for="(action, index) in modifiedActions"
			:key="`action-${index}`"
			:dataTest="action.dataTest"
			:isHovered="isHovered('action', index)"
			:label="action.label"
			type="action"
			@click="() => onAction(action)"
			@scrollTo="scrollTo"
		/>
	</div>
</template>

<script lang="ts">
import camelCase from 'lodash/camelCase.js'
import {
	computed,
	defineComponent,
	onBeforeMount,
	onUnmounted,
	ref,
	watch,
} from 'vue'
import { z } from 'zod'

import { useI18nContext } from '../../kotti-i18n/hooks'
import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { makeProps } from '../../make-props'
import { Shared } from '../types'

import FieldSelectOptionsItem from './OptionsItem.vue'

const propsSchema = z.object({
	actions: z.array(Shared.actionSchema),
	dataTestPrefix: z.string(),
	isDisabled: z.boolean().default(false),
	isDropdownOpen: z.boolean().default(false),
	isLoading: z.boolean().default(false),
	isMultiple: z.boolean().default(false),
	isUnsorted: z.boolean().default(false),
	maximumSelectable: z.number().int().min(0),
	options: z.array(Shared.optionSchema),
	value: z.array(Shared.valueSchema),
})

type ModifiedAction = z.output<
	(typeof propsSchema)['shape']['actions']
>[number] & {
	dataTest: string
}

type ModifiedOption = z.output<
	(typeof propsSchema)['shape']['options']
>[number] & {
	isSelected: boolean
}

const mod = (number: number, divisor: number) =>
	((number % divisor) + divisor) % divisor

export default defineComponent({
	name: 'FieldSelectOptions',
	components: {
		FieldSelectOptionsItem,
	},
	props: makeProps(propsSchema),
	emits: ['close', 'input'],
	setup(props, { emit }) {
		const i18nContext = useI18nContext()
		const translations = useTranslationNamespace('KtFieldSelects')

		const optionsRef = ref<HTMLDivElement | null>(null)

		const modifiedActions = computed(
			(): Array<ModifiedAction> =>
				props.actions.map((action) => ({
					...action,
					dataTest:
						action.dataTest ??
						`${props.dataTestPrefix}.${camelCase(action.label)}`,
				})),
		)

		const modifiedOptions = computed(() => {
			const isLimitReached =
				props.isMultiple && props.value.length >= props.maximumSelectable

			const modifiedOptions: ModifiedOption[] = props.options.map((option) => {
				const isSelected = props.value.includes(option.value)

				return {
					...option,
					dataTest:
						option.dataTest ??
						`${props.dataTestPrefix}.${String(option.value)}`,
					isDisabled:
						props.isDisabled ||
						// eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing -- '??' is not the right choice to handle booleans
						option.isDisabled ||
						(isLimitReached && !isSelected),
					isSelected,
				}
			})

			if (props.isUnsorted) return modifiedOptions

			const collator = new Intl.Collator(i18nContext.locale, {
				numeric: true,
				sensitivity: 'base',
			})

			return modifiedOptions.sort((a, b) => collator.compare(a.label, b.label))
		})

		const hoveredIndex = ref(0)
		const resetHoveredIndex = () => (hoveredIndex.value = 0)

		watch(
			() => props.isDropdownOpen,
			(isOpen) => {
				if (!isOpen) resetHoveredIndex()
			},
			{ flush: 'post' },
		)

		const itemCount = computed(
			() => modifiedOptions.value.length + modifiedActions.value.length,
		)

		watch(
			itemCount,
			(newValue, oldValue) => {
				if (newValue !== oldValue) resetHoveredIndex()
			},
			{ flush: 'post' },
		)

		const selectOption = (option: ModifiedOption) => {
			if (option.isDisabled) return

			if (props.isMultiple)
				emit(
					'input',
					props.value.includes(option.value)
						? props.value.filter((v) => v !== option.value)
						: [...props.value, option.value],
				)
			else emit('input', [option.value])
		}

		const onAction = (action: z.output<typeof Shared.actionSchema>) => {
			emit('close')

			action.onClick()
		}

		const listener = (event: KeyboardEvent) => {
			if (!props.isDropdownOpen) return

			switch (event.key) {
				case 'ArrowDown': {
					hoveredIndex.value = mod(hoveredIndex.value + 1, itemCount.value)
					return
				}

				case 'ArrowUp': {
					hoveredIndex.value = mod(hoveredIndex.value - 1, itemCount.value)
					return
				}

				case 'Enter': {
					const index = hoveredIndex.value
					const optionsLength = modifiedOptions.value.length

					if (index < 0) return

					if (index < optionsLength) {
						selectOption(modifiedOptions.value[index] as ModifiedOption)
						return
					}

					onAction(
						modifiedActions.value[index - optionsLength] as ModifiedAction,
					)
					return
				}
			}
		}

		onBeforeMount(() => {
			window.addEventListener('keydown', listener)
		})

		onUnmounted(() => {
			window.removeEventListener('keydown', listener)
		})

		return {
			isHovered: (type: 'action' | 'option', index: number) => {
				const optionsCount = props.options.length

				switch (type) {
					case 'action':
						return index === hoveredIndex.value - optionsCount

					case 'option':
						return index === hoveredIndex.value

					default:
						throw new Error(`Options.vue: unrecognized type “${String(type)}”`)
				}
			},
			modifiedActions,
			modifiedOptions,
			onAction,
			optionsRef,
			scrollTo: (optionDistanceToOptionsTop: number) => {
				if (optionsRef.value === null)
					throw new Error('Unexpected Unbound optionsRef: null')

				optionsRef.value.scrollTo({ top: optionDistanceToOptionsTop })
			},
			selectOption,
			translations,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-field/mixins.scss';

.kt-field-select-options {
	position: relative;

	@include prettify-scrollbar;

	max-height: 40vh;

	/*
	  undo padding from theme,
	  alternatively fork theme and remove the left/right padding
	*/
	margin-right: -9px;
	margin-left: -9px;
	overflow: auto;

	&__loading {
		position: absolute;
		top: var(--unit-2);
		right: var(--unit-6);
	}

	&__separator {
		height: var(--unit-q);
		margin: var(--unit-1) 0;
		background-color: var(--gray-20);
	}
}
</style>
