<template>
	<KtPopover
		v-if="categories && categories.length > 0"
		:isDisabled="isLoading"
		size="md"
		trigger="click"
	>
		<KtButton
			data-test="table-column-edit-button"
			:disabled="isLoading"
			:icon="Yoco.Icon.CHEVRON_DOWN"
			:isLoading="isLoading"
			:label="translations.editColumns"
		/>
		<template #content>
			<div class="table-columns">
				<!-- TODO: make translatable -->
				<div class="table-columns__subheader" v-text="'Selected Columns'" />
				<div
					@dragend="handleDragEnd"
					@dragleave="handleDragLeave"
					@drop="handleDrop"
				>
					<MenuOptionItem
						v-for="option in selectedOptions"
						:key="option.key"
						class="table-columns__menu-item"
						:draggable="canChangeColumnOrder"
						@dragenter.prevent
						@dragleave.prevent
						@dragover.prevent="(e) => handleDragOver(e, option.key)"
						@dragstart="(e) => handleDragStart(e, option.key)"
					>
						<KtFieldToggle
							class="table-columns__menu-toggle"
							isOptional
							:modelValue="true"
							@update:modelValue="removeOption(option.key)"
						>
							<span v-text="option.label" />
						</KtFieldToggle>
						<span class="table-columns__drag-indicator">
							<i class="yoco narrow">dots_vertical</i>
							<i class="yoco">dots_vertical</i>
						</span>
					</MenuOptionItem>
				</div>

				<template v-for="(category, index) in cleanedCategories" :key="index">
					<div class="table-columns__subheader" v-text="category.label" />

					<MenuOptionItem
						v-for="option in category.options"
						:key="option.key"
						class="table-columns__menu-item"
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
			</div>

			<!-- FIXME: ideally this button shoud not be behind the fold -->
			<div class="table-columns__footer">
				<!-- <KtButton
					data-test="table-column-show-all-button"
					:disabled="isShowAllDisabled"
					:label="translations.showAll"
					type="text"
					@click="$emit('showAll')"
				/> -->
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
	},
	props: makeProps(KottiColumnSelector.propsSchema),
	emits: {
		showAll: () => true,
		// eslint-disable-next-line @typescript-eslint/naming-convention
		'update:selection': (_selection: string[]) => true,
	},
	setup(props, { emit }) {
		const i18nContext = useI18nContext()
		const selectedOptions = ref<KottiColumnSelector.Option[]>([])

		const draggedColumnId = ref<string | null>(null)
		const targetColumnId = ref<string | null>(null)

		const optionKeyMap = computed(
			() =>
				new Map(
					props.categories
						.flatMap((cat) => cat.options)
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
						options: category.options
							.filter(({ key }) => !props.selection.includes(key))
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
			removeOption: (optionKey: string) => {
				emit(
					'update:selection',
					props.selection.filter((key) => key !== optionKey),
				)
			},
			selectedOptions,
			translations: useTranslationNamespace('KtStandardTable'),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.table-columns {
	display: flex;
	flex-direction: column;
	max-height: 35vh;
	overflow-y: auto;

	&__menu-item {
		display: flex;
		justify-content: space-between;
		padding: var(--unit-1) var(--unit-2);

		:deep(.kt-field__header--is-suffix) {
			display: none;
		}

		:deep(.kt-field-toggle),
		:deep(.kt-field-toggle-inner) {
			width: 100%;
		}
	}

	&__menu-toggle {
		margin: 0;
	}

	&__subheader {
		padding-inline: var(--unit-2);
		font-size: var(--unit-3);
		color: var(--text-02);
		background-color: var(--ui-01);
	}

	&__drag-indicator {
		cursor: grab;

		.yoco {
			user-select: none;
		}

		.yoco.narrow {
			// bring the dots closer to each other
			letter-spacing: -8px;
		}
	}

	&__footer {
		text-align: end;
	}
}
</style>
