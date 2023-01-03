<template>
	<div ref="optionsRef" class="options">
		<div v-if="isLoading" class="options__loading">
			<div class="loading" />
		</div>
		<OptionsItem
			v-if="modifiedOptions.length === 0"
			dataTest="NO_DATA"
			isDisabled
			:label="translations.noDataText"
			type="option"
			@scrollTo="scrollTo"
		/>
		<OptionsItem
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
		</OptionsItem>

		<div v-if="actions.length" class="options__separator" />
		<OptionsItem
			v-for="(action, index) in actions"
			:key="`action-${index}`"
			:isHovered="isHovered('action', index)"
			:label="action.label"
			type="action"
			@click="() => onAction(action)"
			@scrollTo="scrollTo"
		/>
	</div>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	onBeforeMount,
	onUnmounted,
	ref,
	watch,
} from '@vue/composition-api'
import { z } from 'zod'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { makeProps } from '../../make-props'

import OptionsItem from './OptionsItem.vue'

const propsSchema = z.object({
	actions: z.array(KottiMenu.actionSchema),
	dataTestPrefix: z.string(),
	isDisabled: z.boolean().default(false),
	isDropdownOpen: z.boolean().default(false),
	isLoading: z.boolean().default(false),
	isUnsorted: z.boolean().default(false),
	options: z.array(KottiMenu.optionSchema),
})

type ModifiedOption = z.output<
	typeof propsSchema['shape']['options']
>[number] & {
	isSelected: boolean
}

const mod = (number: number, divisor: number) =>
	((number % divisor) + divisor) % divisor

export default defineComponent({
	name: 'FieldSelectOptions',
	components: {
		OptionsItem,
	},
	props: makeProps(propsSchema),
	setup(props: z.output<typeof propsSchema>, { emit }) {
		const translations = useTranslationNamespace('KtFieldSelects')

		const optionsRef = ref<HTMLDivElement | null>(null)

		const modifiedOptions = computed(() => {
			const isLimitReached =
				props.isMultiple && props.value.length >= props.maximumSelectable

			const modifiedOptions: ModifiedOption[] = props.options.map((option) => {
				const isSelected = props.value.includes(option.value)

				return {
					...option,
					dataTest:
						option.dataTest ?? `${props.dataTestPrefix}.${option.value}`,
					isDisabled:
						props.isDisabled ||
						option.isDisabled ||
						(isLimitReached && !isSelected),
					isSelected,
				}
			})

			if (props.isUnsorted) return modifiedOptions

			return modifiedOptions.sort((a, b) => a.label.localeCompare(b.label))
		})

		const hoveredIndex = ref(0)
		const resetHoveredIndex = () => (hoveredIndex.value = 0)

		watch(
			() => props.isDropdownOpen,
			(isOpen) => {
				if (!isOpen) resetHoveredIndex()
			},
		)

		const itemCount = computed(
			() => modifiedOptions.value.length + props.actions.length,
		)

		watch(itemCount, (newValue, oldValue) => {
			if (newValue !== oldValue) resetHoveredIndex()
		})

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

					if (index < optionsLength)
						return selectOption(modifiedOptions.value[index])

					return onAction(props.actions[index - optionsLength])
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
						throw new Error(`Options.vue: unrecognized type “${type}”`)
				}
			},
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

.options {
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
