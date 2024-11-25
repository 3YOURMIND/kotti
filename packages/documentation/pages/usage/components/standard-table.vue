<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<KtStandardTable id="example-local-data" title="Title" />

		<br /><br />

		<KtI18nContext :locale="settings.locale">
			<KtStandardTable
				id="example-remote-data"
				:options="options"
				:title="settings.title"
				@update:dataFetchDependencies="fetchData"
			>
				<template v-if="settings.slots.headerActionsSlot" #header-actions>
					<KtButton label="Some Action" />
				</template>
				<template v-if="settings.slots.controlsActionsSlot" #controls-actions>
					<KtButton label="Some Action" />
				</template>
				<template v-if="settings.slots.infoActionsSlot" #info-actions>
					<KtButton label="Some Action" />
				</template>
				<template v-if="settings.slots.tableSlot" #table>
					CUSTOM CONTENT
				</template>
			</KtStandardTable>
		</KtI18nContext>

		<br />

		<KtForm v-model="settings" size="small">
			<div class="wrapper">
				<div>
					<h4>Settings</h4>
					<KtFieldSingleSelect
						formKey="locale"
						helpText="Can be set via KtI18nContext"
						hideClear
						label="Language"
						leftIcon="global"
						:options="[
							{ label: 'German (de-DE)', value: 'de-DE' },
							{ label: 'English (en-US)', value: 'en-US' },
							{ label: 'Spanish (es-ES)', value: 'es-ES' },
							{ label: 'French (fr-FR)', value: 'fr-FR' },
							{ label: 'Japanese (ja-JP)', value: 'ja-JP' },
						]"
					/>
					<KtFieldToggleGroup
						formKey="booleanFlags"
						helpText="Can be set via hideControls prop"
						isOptional
						label="Boolean Flags"
						:options="[
							{ key: 'hideColumns', label: 'Hide columns' },
							{ key: 'hideFilters', label: 'Hide filters' },
							{ key: 'hideSearch', label: 'Hide search' },
						]"
						type="switch"
					/>
					<KtFieldToggle
						formKey="showInlineFilters"
						helpText="Must set via filter definition: `displayInline: true`"
						isOptional
						label="Use inline filters"
						type="switch"
					/>
					<KtFieldToggleGroup
						formKey="slots"
						isOptional
						label="Slots"
						:options="[
							{ key: 'headerActionsSlot', label: 'Use header actions slot' },
							{
								key: 'controlsActionsSlot',
								label: 'Use controls actions slot',
							},
							{ key: 'infoActionsSlot', label: 'Use info actions slot' },
							{ key: 'tableSlot', label: 'Use table slot' },
						]"
						type="switch"
					/>
					<KtFieldSingleSelect
						formKey="columnsPopoverSize"
						helpText="Can be set via popoversSize prop"
						hideClear
						isOptional
						label="Columns popover size"
						:options="sizeOptions"
					/>
					<KtFieldSingleSelect
						formKey="filtersPopoverSize"
						helpText="Can be set via popoversSize prop"
						hideClear
						isOptional
						label="Filters popover size"
						:options="sizeOptions"
					/>
				</div>
				<div>
					<h4>Texts</h4>
					<KtFieldText formKey="title" isOptional label="title" />
					<KtFieldText
						formKey="searchPlaceholder"
						isOptional
						label="searchPlaceholder"
					/>
				</div>
			</div>
		</KtForm>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import {
	KtButton,
	KtStandardTable,
	useKottiStandardTable,
} from '@3yourmind/kotti-ui'
import { Kotti } from '@3yourmind/kotti-ui'

import ComponentInfo from '~/components/ComponentInfo.vue'

import { todos } from './data/standard-table'

type TodoRow = {
	completed: boolean
	id: number
	todo: string
	userId: number
}
type RecipeRow = {
	cookTimeMinutes: number
	cuisine: string
	difficulty: string
	id: number
	ingredients: string[]
	instructions: string[]
	name: string
	prepTimeMinutes: number
	rating: number
}

export default defineComponent({
	name: 'DocumentationPageUsageComponentsStandardTable',
	components: {
		ComponentInfo,
		KtButton,
		KtStandardTable,
	},
	setup() {
		const isLoadingRecipes = ref(false)

		const todosColumns = ref<Kotti.Table.Column<TodoRow>[]>([
			{
				display: { decimalPlaces: 0, type: 'numerical' },
				getData: (row: TodoRow) => row.id,
				id: 'id',
				isSortable: true,
				label: 'ID',
			},
			{
				display: { type: 'text' },
				getData: (row: TodoRow) => row.todo,
				id: 'todo',
				isSortable: true,
				label: 'Todo',
			},
			{
				display: { type: 'boolean' },
				getData: (row: TodoRow) => row.completed,
				id: 'completed',
				isSortable: true,
				label: 'Completed',
			},
			{
				display: { decimalPlaces: 0, type: 'numerical' },
				getData: (row: TodoRow) => row.userId,
				id: 'userId',
				isSortable: true,
				label: 'User ID',
			},
		])
		const todosData = ref<TodoRow[]>(todos)

		const recipesColumns = ref<Kotti.Table.Column<RecipeRow>[]>([
			{
				display: { decimalPlaces: 0, type: 'numerical' },
				getData: (row: RecipeRow) => row.id,
				id: 'id',
				isSortable: true,
				label: 'ID',
			},
			{
				display: { type: 'text' },
				getData: (row: RecipeRow) => row.name,
				id: 'name',
				isSortable: true,
				label: 'Name',
			},
			{
				display: { type: 'text' },
				getData: (row: RecipeRow) => row.ingredients.join('; '),
				id: 'ingredients',
				isSortable: true,
				label: 'Ingredients',
			},
			{
				display: { decimalPlaces: 0, type: 'numerical' },
				getData: (row: RecipeRow) => row.prepTimeMinutes,
				id: 'prepTimeMinutes',
				isSortable: true,
				label: 'Prep time minutes',
			},
			{
				display: { decimalPlaces: 0, type: 'numerical' },
				getData: (row: RecipeRow) => row.cookTimeMinutes,
				id: 'cookTimeMinutes',
				isSortable: true,
				label: 'Cook time minutes',
			},
			{
				display: { type: 'text' },
				getData: (row: RecipeRow) => row.difficulty,
				id: 'difficulty',
				isSortable: true,
				label: 'Difficulty',
			},
			{
				display: { type: 'text' },
				getData: (row: RecipeRow) => row.cuisine,
				id: 'cuisine',
				isSortable: true,
				label: 'Cuisine',
			},
			{
				display: { decimalPlaces: 0, type: 'numerical' },
				getData: (row: RecipeRow) => row.rating,
				id: 'rating',
				isSortable: true,
				label: 'Rating',
			},
		])
		const recipesData = ref<RecipeRow[]>([])
		const recipesRowCount = ref(0)

		const settings = ref<{
			booleanFlags: {
				hideColumns: Kotti.FieldToggle.Value
				hideFilters: Kotti.FieldToggle.Value
				hideSearch: Kotti.FieldToggle.Value
			}
			columnsPopoverSize: Kotti.FieldSingleSelect.Value
			filtersPopoverSize: Kotti.FieldSingleSelect.Value
			locale: Kotti.I18n.SupportedLanguages
			searchPlaceholder?: Kotti.FieldText.Value
			showInlineFilters: Kotti.FieldToggle.Value
			slots: {
				controlsActionsSlot: Kotti.FieldToggle.Value
				headerActionsSlot: Kotti.FieldToggle.Value
				infoActionsSlot: Kotti.FieldToggle.Value
				tableSlot: Kotti.FieldToggle.Value
			}
			title: Kotti.FieldText.Value
		}>({
			booleanFlags: {
				hideColumns: false,
				hideFilters: false,
				hideSearch: false,
			},
			columnsPopoverSize: Kotti.Popover.Size.MEDIUM,
			filtersPopoverSize: Kotti.Popover.Size.MEDIUM,
			locale: 'en-US',
			searchPlaceholder: undefined,
			showInlineFilters: false,
			slots: {
				controlsActionsSlot: false,
				headerActionsSlot: false,
				infoActionsSlot: false,
				tableSlot: false,
			},
			title: 'Title',
		})

		const filters = computed<Kotti.StandardTable.Filter[]>(() => [
			{
				dataTest: 'boolean-filter',
				id: 'booleanFilter',
				label: 'Boolean filter',
				slotLabels: ['No', 'Yes'],
				type: Kotti.StandardTable.FilterType.BOOLEAN,
			},
			{
				dataTest: 'single-select-filter',
				id: 'singleSelectFilter',
				isUnsorted: true,
				label: 'Single select filter',
				options: [
					{
						dataTest: 'opt-1',
						isDisabled: false,
						label: 'Option 1',
						value: 101,
					},
					{
						dataTest: 'opt-2',
						isDisabled: false,
						label: 'Option 2',
						value: 102,
					},
					{
						dataTest: 'opt-3',
						isDisabled: false,
						label: 'Option 3',
						value: 103,
					},
				],
				type: Kotti.StandardTable.FilterType.SINGLE_SELECT,
			},
			{
				dataTest: 'multi-select-filter',
				id: 'multiSelectFilter',
				isUnsorted: true,
				label: 'Multi select filter',
				options: [
					{
						dataTest: 'opt-1',
						isDisabled: false,
						label: 'Option 1',
						value: 101,
					},
					{
						dataTest: 'opt-2',
						isDisabled: false,
						label: 'Option 2',
						value: 102,
					},
					{
						dataTest: 'opt-3',
						isDisabled: false,
						label: 'Option 3',
						value: 103,
					},
				],
				type: Kotti.StandardTable.FilterType.MULTI_SELECT,
			},
			{
				dataTest: 'date-range-filter',
				id: 'dateRangeFilter',
				label: 'Date range filter',
				type: Kotti.StandardTable.FilterType.DATE_RANGE,
			},
			{
				dataTest: 'number-range-filter',
				decimalPlaces: 2,
				id: 'numberRangeFilter',
				label: 'Number range filter',
				type: Kotti.StandardTable.FilterType.NUMBER_RANGE,
				unit: 'Kg',
			},
			...(settings.value.showInlineFilters
				? [
						{
							dataTest: 'single-select-filter-inline',
							displayInline: true,
							id: 'singleSelectFilterInline',
							isUnsorted: true,
							label: 'Single select filter Inline',
							options: [
								{
									dataTest: 'opt-1',
									isDisabled: false,
									label: 'Option 1',
									value: 101,
								},
								{
									dataTest: 'opt-2',
									isDisabled: false,
									label: 'Option 2',
									value: 102,
								},
								{
									dataTest: 'opt-3',
									isDisabled: false,
									label: 'Option 3',
									value: 103,
								},
							],
							type: Kotti.StandardTable.FilterType.SINGLE_SELECT,
						},
					]
				: []),
		])

		useKottiStandardTable<TodoRow>(
			computed(() => ({
				columns: todosColumns.value,
				data: todosData.value,
				id: 'example-local-data',
				pagination: {
					pageSize: 5,
					// eslint-disable-next-line no-magic-numbers
					pageSizeOptions: [5, 10, 15, 20],
					type: Kotti.StandardTable.PaginationType.LOCAL,
				},
			})),
		)

		useKottiStandardTable<RecipeRow>(
			computed(() => ({
				columns: recipesColumns.value,
				data: recipesData.value,
				filters: filters.value,
				id: 'example-remote-data',
				isLoading: isLoadingRecipes.value,
				pagination: {
					pageSize: 5,
					// eslint-disable-next-line no-magic-numbers
					pageSizeOptions: [5, 10, 15, 30, 50, 100],
					rowCount: recipesRowCount.value,
					type: Kotti.StandardTable.PaginationType.REMOTE,
				},
			})),
		)

		return {
			component: KtStandardTable,
			fetchData: async (
				args: Kotti.StandardTable.Events.UpdateDataFetchDependencies,
			) => {
				isLoadingRecipes.value = true

				// eslint-disable-next-line no-console
				console.log('🚀 ~ docs ~ standard-table ~ fetchData:', { ...args })

				const { pagination } = args
				const { pageIndex, pageSize } = pagination
				const skip = pageSize * pageIndex
				const url = `https://dummyjson.com/recipes?limit=${pageSize}&skip=${skip}`

				type Response = {
					limit: number
					recipes: RecipeRow[]
					skip: number
					total: number
				}

				try {
					const response = await fetch(url)

					if (!response.ok) {
						throw new Error(`Response status: ${response.status}`)
					}

					const { recipes, total }: Response = await response.json()

					recipesData.value = recipes
					recipesRowCount.value = total

					isLoadingRecipes.value = false
				} catch (error: unknown) {
					// eslint-disable-next-line no-console
					console.error((error as { message: string }).message)
					throw error
				}
			},
			isLoadingRecipes,
			options: computed(() => ({
				hideControls: {
					columns: settings.value.booleanFlags.hideColumns,
					filters: settings.value.booleanFlags.hideFilters,
					search: settings.value.booleanFlags.hideSearch,
				},
				popoversSize: {
					columns: settings.value.columnsPopoverSize,
					filters: settings.value.filtersPopoverSize,
				},
				searchPlaceholder: settings.value.searchPlaceholder,
			})),
			settings,
			sizeOptions: computed((): Kotti.FieldSingleSelect.Props['options'] =>
				Object.entries(Kotti.Popover.Size).map(([key, value]) => ({
					label: `Kotti.Popover.Size.${key} (${value})`,
					value,
				})),
			),
		}
	},
})
</script>

<style src="../../../styles/form-fields.scss" lang="scss" scoped />
