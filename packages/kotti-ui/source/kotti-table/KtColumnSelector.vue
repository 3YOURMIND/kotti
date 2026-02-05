<template>
	<KtPopover
		v-if="categories && categories.length > 0"
		:isDisabled="isDisabled || isLoading"
		:size="size"
		trigger="click"
		@hide="handlePopoverHide"
	>
		<KtButton
			:data-test="dataTest ? `${dataTest}-button` : 'kt-column-selector-button'"
			:disabled="isDisabled || isLoading"
			:icon="Yoco.Icon.CHEVRON_DOWN"
			iconPosition="right"
			:isLoading="isLoading"
			:label="label ?? translations.columns"
		/>
		<template #content>
			<div class="kt-column-selector">
				<div class="kt-column-selector__header">
					<SearchInput
						v-if="canSearchColumn"
						v-model="searchQuery"
						:dataTest="
							dataTest
								? `${dataTest}-search-input`
								: 'kt-column-selector-search-input'
						"
						:isLoading="isLoading"
						:placeholder="translations.searchColumn"
						size="small"
					/>
				</div>

				<ScrollableContainer class="kt-column-selector__content">
					<div
						v-if="selectedOptions.length > 0"
						class="kt-column-selector__category-header"
						v-text="translations.visibleColumns"
					/>
					<div
						@dragend="handleDragEnd"
						@dragleave="handleDragLeave"
						@drop="handleDrop"
					>
						<MenuOptionItem
							v-for="option in selectedOptions"
							:key="option.key"
							class="kt-column-selector__category-item"
							:draggable="canChangeColumnOrder"
							@dragenter.prevent
							@dragleave.prevent
							@dragover.prevent="(e) => handleDragOver(e, option.key)"
							@dragstart="(e) => handleDragStart(e, option.key)"
						>
							<KtFieldToggle
								class="kt-column-selector__category-item-toggle"
								isOptional
								:modelValue="true"
								@update:modelValue="removeOption(option.key)"
							>
								<span v-text="option.label" />
							</KtFieldToggle>
							<span
								v-if="canChangeColumnOrder"
								class="kt-column-selector__category-item-drag-handle"
							>
								<i class="yoco narrow">dots_vertical</i>
								<i class="yoco">dots_vertical</i>
							</span>
						</MenuOptionItem>
					</div>

					<template v-for="(category, index) in cleanedCategories" :key="index">
						<div
							class="kt-column-selector__category-header"
							v-text="category.label"
						/>

						<MenuOptionItem
							v-for="option in category.options"
							:key="option.key"
							class="kt-column-selector__category-item"
						>
							<KtFieldToggle
								isOptional
								:modelValue="false"
								@update:modelValue="addOption(option.key)"
							>
								<span v-text="option.label" />
							</KtFieldToggle>
						</MenuOptionItem>
					</template>
				</ScrollableContainer>

				<div v-if="$slots.footer" class="kt-column-selector__footer">
					<slot name="footer" />
				</div>
			</div>
		</template>
	</KtPopover>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import KtButton from '../kotti-button/KtButton.vue'
import KtFieldToggle from '../kotti-field-toggle/KtFieldToggle.vue'
import { useI18nContext, useTranslationNamespace } from '../kotti-i18n/hooks'
import KtPopover from '../kotti-popover/KtPopover.vue'
import { makeProps } from '../make-props'
import MenuOptionItem from '../shared-components/menu-option/MenuOptionItem.vue'
import ScrollableContainer from '../shared-components/ScrollableContainer.vue'

import SearchInput from './components/SearchInput.vue'
import { KottiColumnSelector } from './types'

const TRANSFER_TYPE = 'application/move-column'
const isColumnMoveDataTransfer = (event: DragEvent): boolean => {
	return event.dataTransfer?.types.includes(TRANSFER_TYPE) ?? false
}

export default defineComponent({
	name: 'KtColumnSelector',
	components: {
		KtButton,
		KtFieldToggle,
		KtPopover,
		MenuOptionItem,
		ScrollableContainer,
		SearchInput,
	},
	props: makeProps(KottiColumnSelector.propsSchema),
	emits: {
		showAll: () => true,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'update:selection': (_selection: string[]) => true,
	},
	setup(props, { emit }) {
		const i18nContext = useI18nContext()
		const translations = useTranslationNamespace('KtColumnSelector')

		const searchQuery = ref<string | null>(null)
		const selectedOptions = ref<KottiColumnSelector.Option[]>([])

		const draggedColumnId = ref<string | null>(null)
		const targetColumnId = ref<string | null>(null)

		const optionKeyMap = computed(
			() =>
				new Map(
					props.categories
						.flatMap((category) => category.options)
						.map((option) => [option.key, option.label]),
				),
		)

		watch(
			() => props.selection,
			(selection) => {
				selectedOptions.value = []
				const errors: string[] = []

				for (const optionKey of selection) {
					const label = optionKeyMap.value.get(optionKey)

					if (label === undefined) {
						errors.push(optionKey)
					} else {
						selectedOptions.value.push({ key: optionKey, label })
					}
				}

				if (errors.length > 0) {
					// Sync and report if props.selection included keys that are not found
					// any option within props.categories
					emit(
						'update:selection',
						selectedOptions.value.map(({ key }) => key),
					)
					// eslint-disable-next-line no-console
					console.error(
						`KtColumnSelector: Removed unknown selections: ${errors.join(', ')}`,
					)
				}
			},
			{ immediate: true },
		)

		return {
			addOption: (optionKey: string) => {
				emit('update:selection', [...props.selection, optionKey])
			},
			cleanedCategories: computed(() => {
				const collator = new Intl.Collator(i18nContext.locale, {
					numeric: true,
					sensitivity: 'base',
				})

				return props.categories
					.map((category) => ({
						...category,
						label: category.label ?? translations.value.availableColumns,
						options: category.options
							.filter(
								({ key, label }) =>
									!props.selection.includes(key) &&
									(!searchQuery.value ||
										label
											.toLowerCase()
											.includes(searchQuery.value.toLowerCase())),
							)
							.sort((a, b) => collator.compare(a.label, b.label)),
					}))
					.filter((category) => category.options.length > 0)
			}),
			handleDragEnd: () => {
				draggedColumnId.value = null
				targetColumnId.value = null
			},
			handleDragLeave: () => {
				targetColumnId.value = null
			},
			handleDragOver: (event: DragEvent, columnKey: string) => {
				if (!isColumnMoveDataTransfer(event)) return
				targetColumnId.value = columnKey
			},
			handleDragStart: (event: DragEvent, columnKey: string) => {
				event.dataTransfer?.setData(TRANSFER_TYPE, '')
				draggedColumnId.value = columnKey
			},
			handleDrop: () => {
				if (draggedColumnId.value === null || targetColumnId.value === null)
					return
				const fromIndex = props.selection.indexOf(draggedColumnId.value)
				const toIndex = props.selection.indexOf(targetColumnId.value)

				const newOrder = [...props.selection]
				const extract = newOrder.splice(fromIndex, 1)
				newOrder.splice(toIndex, 0, ...extract)
				emit('update:selection', newOrder)
			},
			handlePopoverHide: () => {
				searchQuery.value = null
			},
			removeOption: (optionKey: string) => {
				emit(
					'update:selection',
					props.selection.filter((key) => key !== optionKey),
				)
			},
			searchQuery,
			selectedOptions: computed(() =>
				selectedOptions.value.filter(({ label }) =>
					searchQuery.value
						? label.toLowerCase().includes(searchQuery.value.toLowerCase())
						: true,
				),
			),
			translations,
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-column-selector {
	// KtPopover padding reset
	margin: calc(-1 * var(--unit-2));

	&__content {
		display: flex;
		flex-direction: column;
		max-height: 40vh;

		:deep(.scrollable-container__content) {
			padding: 0;
		}
	}

	&__footer {
		padding: var(--unit-2);
		text-align: end;
	}

	&__header {
		padding: var(--unit-2);
	}

	&__category-header {
		display: flex;
		align-items: center;
		height: 22px;
		padding: var(--unit-1) var(--unit-2);
		font-size: 12px;
		font-weight: 500;
		line-height: 18px;
		color: var(--text-02);
		background-color: var(--ui-01);
	}

	&__category-item {
		display: flex;
		justify-content: space-between;
		padding: var(--unit-2) var(--unit-3);

		:deep(.kt-field__header--is-suffix) {
			display: none;
		}

		:deep(.kt-field-toggle),
		:deep(.kt-field-toggle-inner) {
			width: 100%;
		}
	}

	&__category-item-drag-handle {
		cursor: grab;

		.yoco {
			user-select: none;
		}

		.yoco.narrow {
			// bring the dots closer to each other
			letter-spacing: -8px;
		}
	}

	&__category-item-toggle {
		margin: 0;
	}
}
</style>
