<template>
	<div class="kt-field-select-options">
		<div v-if="isLoading" class="kt-field-select-options__loading">
			<div class="loading" />
		</div>
		<div ref="optionsRef" class="kt-field-select-options__scrollable-content">
			<FieldSelectOptionsItem
				v-if="modifiedOptions.length === 0"
				dataTest="NO_DATA"
				isDisabled
				:label="translations.noDataText"
				@scrollTo="scrollTo"
			/>
			<template
				v-for="({ group, options }, groupIndex) in groupedOptions"
				:key="groupIndex"
			>
				<div
					v-if="group"
					class="kt-field-select-options__group-header"
					v-text="group"
				/>
				<div class="kt-field-select-options__options">
					<FieldSelectOptionsItem
						v-for="(option, index) in options"
						:key="`option-${index}`"
						class="kt-field-select-options__option"
						:dataTest="option.dataTest"
						:isDisabled="option.isDisabled"
						:isHovered="isHovered('option', index)"
						:isSelected="option.isSelected"
						:label="option.label"
						@click="() => selectOption(option)"
						@scrollTo="scrollTo"
					>
						<slot
							v-bind="{ index, option, select: () => selectOption(option) }"
							name="option"
						/>
					</FieldSelectOptionsItem>
				</div>
			</template>
		</div>
		<div
			v-if="modifiedActions.length > 0"
			class="kt-field-select-options__separator"
		/>
		<FieldSelectOptionsItem
			v-for="(action, index) in modifiedActions"
			:key="`action-${index}`"
			class="kt-field-select-options__action"
			:dataTest="action.dataTest"
			:isDisabled="action.isDisabled"
			:isHovered="isHovered('action', index)"
			:label="action.label"
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
import { UNGROUPED_KEY } from '../constants'
import { Shared } from '../types'

import FieldSelectOptionsItem from './OptionsItem.vue'

const propsSchema = z.object({
	actions: z.array(Shared.actionSchema),
	dataTestPrefix: z.string(),
	groups: z.array(Shared.groupSchema),
	isDisabled: z.boolean().default(false),
	isDropdownOpen: z.boolean().default(false),
	isLoading: z.boolean().default(false),
	isMultiple: z.boolean().default(false),
	isUnsorted: z.boolean().default(false),
	maximumSelectable: z.number().int().min(0),
	modelValue: z.array(Shared.valueSchema),
	options: z.array(Shared.optionSchema),
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

const normalizeId = (id: number | string | symbol) => {
	if (typeof id === 'symbol') {
		return id
	}

	return String(id)
}

export default defineComponent({
	name: 'FieldSelectOptions',
	components: {
		FieldSelectOptionsItem,
	},
	props: makeProps(propsSchema),
	emits: ['close', 'update:modelValue'],
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

		const groupLabels = computed(
			() =>
				new Map(props.groups.map(({ id, label }) => [normalizeId(id), label])),
		)

		const getGroupLabel = (
			groupId: Shared.Option['groupId'] | symbol,
		): string => {
			if (!groupId) return translations.value.ungroupedText

			return (
				groupLabels.value.get(normalizeId(groupId)) ??
				translations.value.ungroupedText
			)
		}

		const groupedOptions = computed<
			{ group: string | null; options: ModifiedOption[] }[]
		>(() => {
			const isLimitReached =
				props.isMultiple && props.modelValue.length >= props.maximumSelectable

			const mapper = (option: Shared.Option): ModifiedOption => {
				const isSelected = props.modelValue.includes(option.value)

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
			}

			const collator = new Intl.Collator(i18nContext.locale, {
				numeric: true,
				sensitivity: 'base',
			})
			const groups = []

			if (props.groups.length > 0) {
				const optionsByGroup = new Map<string | symbol, ModifiedOption[]>()

				for (const option of props.options) {
					const groupId = option.groupId
						? normalizeId(option.groupId)
						: UNGROUPED_KEY
					const groupOptions = optionsByGroup.get(groupId) ?? []

					optionsByGroup.set(groupId, [...groupOptions, mapper(option)])
				}

				groups.push(
					...[...props.groups.map(({ id }) => id), UNGROUPED_KEY]
						.filter(
							(id) => (optionsByGroup.get(normalizeId(id)) ?? []).length > 0,
						)
						.map((id) => ({
							group: getGroupLabel(id),
							options: props.isUnsorted
								? (optionsByGroup.get(normalizeId(id)) ?? [])
								: (optionsByGroup.get(normalizeId(id)) ?? []).sort((a, b) =>
										collator.compare(a.label, b.label),
									),
						})),
				)
			} else {
				groups.push({
					group: null,
					options: props.isUnsorted
						? props.options.map(mapper)
						: props.options
								.map(mapper)
								.sort((a, b) => collator.compare(a.label, b.label)),
				})
			}

			return groups
		})

		const modifiedOptions = computed(() =>
			groupedOptions.value.flatMap(({ options }) => options),
		)

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
					'update:modelValue',
					props.modelValue.includes(option.value)
						? props.modelValue.filter((v) => v !== option.value)
						: [...props.modelValue, option.value],
				)
			else emit('update:modelValue', [option.value])
		}

		const onAction = (action: z.output<typeof Shared.actionSchema>) => {
			if (action.isDisabled) return

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
			groupedOptions,
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
@import '../../kotti-field/mixins';

.kt-field-select-options {
	position: relative;

	// KtPopover padding reset
	margin: calc(-1 * var(--unit-2));

	> :last-child {
		margin-bottom: var(--unit-2);
	}

	&__action {
		padding: 6px;
		margin: 0 var(--unit-2);
		font-weight: 600;
		color: var(--interactive-01);
		border-radius: var(--unit-1);
	}

	&__group-header {
		display: flex;
		align-items: center;
		height: 22px;
		padding: var(--unit-1) var(--unit-2);
		margin: var(--unit-2) 0;
		font-size: 12px;
		font-weight: 500;
		line-height: 18px;
		color: var(--text-02);
		background-color: var(--ui-01);
	}

	&__loading {
		position: absolute;
		top: var(--unit-2);
		right: var(--unit-6);
	}

	&__option {
		margin: 0 var(--unit-2);
		border-radius: var(--unit-1);
	}

	&__scrollable-content {
		@include prettify-scrollbar;

		max-height: 40vh;
		overflow: auto;

		> :first-child {
			&.kt-field-select-options__group-header {
				margin-top: 0;
			}

			&:not(.kt-field-select-options__group-header) {
				margin-top: var(--unit-2);
			}
		}
	}

	&__separator {
		height: var(--unit-q);
		margin: var(--unit-1) 0;
		background-color: var(--ui-02);
	}
}
</style>
