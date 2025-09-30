<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<KtStandardTable tableId="example-local-data" title="Title" />

		<br /><br />

		<KtI18nContext :locale="settings.locale">
			<KtStandardTable
				tableId="example-remote-data"
				:title="settings.title"
				@update:fetchData="fetchData"
			>
				<template v-if="settings.slots.headerActionsSlot" #header-actions>
					<KtButton label="Header Action" />
				</template>
				<template v-if="settings.slots.controlsActionsSlot" #control-actions>
					<KtButton label="Control Action" />
				</template>
				<template
					v-if="settings.slots.appliedFilterActionsSlot"
					#applied-filter-actions
				>
					<KtButton label="Applied Filter Action" />
				</template>
				<template
					v-if="settings.slots.tableSlot"
					#table="{ isLoading, tableId }"
				>
					{{ JSON.stringify({ isLoading, tableId }) }}
					<KtTable v-bind="{ isLoading, tableId }">
						<template #expanded-row="{ row }">
							{{ JSON.stringify(row) }}
						</template>
					</KtTable>
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
							{ label: 'Ukranian (uk-UA)', value: 'uk-UA' },
						]"
					/>
					<KtFieldToggleGroup
						formKey="hideControls"
						helpText="Can be set via hideControls prop"
						isOptional
						label="Hide Controls"
						:options="[
							{ key: 'columns', label: 'Hide columns' },
							{ key: 'filters', label: 'Hide filters' },
							{ key: 'search', label: 'Hide search' },
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
							{
								key: 'appliedFilterActionsSlot',
								label: 'Use applied filter actions slot',
							},
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
	getDisplay,
	KtButton,
	KtStandardTable,
	useKottiStandardTable,
} from '@3yourmind/kotti-ui'
import { Kotti } from '@3yourmind/kotti-ui'

import ComponentInfo from '~/components/ComponentInfo.vue'
import { todos } from '~/data/standard-table'
import { info } from '~/utilities/toaster'

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

type Response = {
	limit: number
	recipes: RecipeRow[]
	skip: number
	total: number
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
		const booleanDisplay = getDisplay({ mode: 'text', type: 'boolean' })
		const integerDisplay = getDisplay({ type: 'integer' })
		const textDisplay = getDisplay({ type: 'text' })

		const todosColumns = ref<Kotti.Table.Column<TodoRow>[]>([
			{
				display: integerDisplay,
				getData: (row: TodoRow) => row.id,
				id: 'id',
				isSortable: true,
				label: 'ID',
			},
			{
				display: textDisplay,
				getData: (row: TodoRow) => row.todo,
				id: 'todo',
				isSortable: true,
				label: 'Todo',
			},
			{
				display: booleanDisplay,
				getData: (row: TodoRow) => row.completed,
				id: 'completed',
				isSortable: true,
				label: 'Completed',
			},
			{
				display: integerDisplay,
				getData: (row: TodoRow) => row.userId,
				id: 'userId',
				isSortable: true,
				label: 'User ID',
			},
		])
		const todosData = ref<TodoRow[]>(todos)

		const recipesColumns = ref<Kotti.Table.Column<RecipeRow>[]>([
			{
				display: integerDisplay,
				getData: (row: RecipeRow) => row.id,
				id: 'id',
				isSortable: true,
				label: 'ID',
			},
			{
				display: textDisplay,
				getData: (row: RecipeRow) => row.name,
				id: 'name',
				isSortable: true,
				label: 'Name',
			},
			{
				display: textDisplay,
				getData: (row: RecipeRow) => row.ingredients.join('; '),
				id: 'ingredients',
				isSortable: true,
				label: 'Ingredients',
			},
			{
				display: integerDisplay,
				getData: (row: RecipeRow) => row.prepTimeMinutes,
				id: 'prepTimeMinutes',
				isSortable: true,
				label: 'Prep time minutes',
			},
			{
				display: integerDisplay,
				getData: (row: RecipeRow) => row.cookTimeMinutes,
				id: 'cookTimeMinutes',
				isSortable: true,
				label: 'Cook time minutes',
			},
			{
				display: textDisplay,
				getData: (row: RecipeRow) => row.difficulty,
				id: 'difficulty',
				isSortable: true,
				label: 'Difficulty',
			},
			{
				display: textDisplay,
				getData: (row: RecipeRow) => row.cuisine,
				id: 'cuisine',
				isSortable: true,
				label: 'Cuisine',
			},
			{
				display: integerDisplay,
				getData: (row: RecipeRow) => row.rating,
				id: 'rating',
				isSortable: true,
				label: 'Rating',
			},
		])
		const recipesData = ref<RecipeRow[]>([])
		const recipesRowCount = ref<number | null>(null)

		const settings = ref<{
			columnsPopoverSize: Kotti.Popover.Size
			filtersPopoverSize: Kotti.Popover.Size
			hideControls: {
				columns: boolean
				filters: boolean
				search: boolean
			}
			locale: Kotti.I18n.SupportedLanguages
			searchPlaceholder: Kotti.FieldText.Value
			showInlineFilters: Kotti.FieldToggle.Value
			slots: {
				appliedFilterActionsSlot: Kotti.FieldToggle.Value
				controlsActionsSlot: Kotti.FieldToggle.Value
				headerActionsSlot: Kotti.FieldToggle.Value
				tableSlot: Kotti.FieldToggle.Value
			}
			title: Kotti.FieldText.Value
		}>({
			columnsPopoverSize: Kotti.Popover.Size.MEDIUM,
			filtersPopoverSize: Kotti.Popover.Size.MEDIUM,
			hideControls: {
				columns: false,
				filters: false,
				search: false,
			},
			locale: 'en-US',
			searchPlaceholder: null,
			showInlineFilters: false,
			slots: {
				appliedFilterActionsSlot: false,
				controlsActionsSlot: false,
				headerActionsSlot: false,
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
				displayInline: settings.value.showInlineFilters ?? false,
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
		])

		useKottiStandardTable(
			computed(() => ({
				id: 'example-local-data',
				paginationOptions: {
					pageSize: 5,
					// eslint-disable-next-line no-magic-numbers
					pageSizeOptions: [5, 10, 15, 20],
					type: 'local',
				},
				selectMode: 'single-page',
				storageAdapter: null,
				table: {
					columns: todosColumns.value,
					data: todosData.value,
					getRowBehavior: ({ row }: { row: TodoRow }) => ({
						click: {
							component: null,
							onClick: () => {
								info({
									text: row.todo,
								})
							},
						},
						id: String(row.id),
					}),
					hasDragAndDrop: true,
				},
			})),
		)

		const recipeTable = useKottiStandardTable(
			computed(() => ({
				filters: filters.value,
				id: 'example-remote-data',
				isLoading: isLoadingRecipes.value,
				options: {
					hideControls: settings.value.hideControls,
					popoversSize: {
						columns: settings.value.columnsPopoverSize,
						filters: settings.value.filtersPopoverSize,
					},
					searchPlaceholder: settings.value.searchPlaceholder ?? undefined,
				},
				paginationOptions: {
					pageSize: 5,
					// eslint-disable-next-line no-magic-numbers
					pageSizeOptions: [5, 10, 15, 30, 50, 100],
					rowCount: recipesRowCount.value,
					type: 'remote',
				},
				selectMode: 'global',
				storageAdapter: null,
				table: {
					columns: recipesColumns.value,
					data: recipesData.value,
					expandMode: settings.value.slots.tableSlot ? 'single' : undefined,
					getRowBehavior: ({ row }: { row: RecipeRow }) => ({
						click: {
							component: null,
							onClick: () => {
								info({
									text: row.name,
								})
							},
						},
						id: String(row.id),
					}),
					hasDragAndDrop: true,
				},
			})),
		)

		const fetchData = async (
			args: Kotti.StandardTable.Events.UpdateFetchData,
		) => {
			isLoadingRecipes.value = true

			// eslint-disable-next-line no-console
			console.log('🚀 ~ docs ~ standard-table ~ fetchData:', { ...args })

			const { pagination } = args
			const { pageIndex, pageSize } = pagination
			const skip = pageSize * pageIndex
			const url = `https://dummyjson.com/recipes?limit=${pageSize}&skip=${skip}`

			try {
				const response = await fetch(url)

				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`)
				}

				const { recipes }: Response = await response.json()

				recipesData.value = recipes
				if (recipesData.value.length < pageSize) {
					recipesRowCount.value = pageIndex * pageSize
					recipeTable.api.pagination.value.pageIndex = 0
					void fetchData({
						...args,
						pagination: recipeTable.api.pagination.value,
					})
				}
				isLoadingRecipes.value = false
			} catch (error: unknown) {
				// eslint-disable-next-line no-console
				console.error((error as { message: string }).message)
				throw error
			}
		}

		return {
			component: KtStandardTable,
			fetchData,
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
