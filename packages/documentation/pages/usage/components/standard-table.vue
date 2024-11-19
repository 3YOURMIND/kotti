<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<KtStandardTable id="example-local-data" title="Local Pagination">
			<template #header-actions>
				<KtButton label="Some Action" />
			</template>
			<template #controls-actions>
				<KtButton label="Some Action" />
			</template>
			<template #info-actions>
				<KtButton label="Some Action" />
			</template>
		</KtStandardTable>

		<br /><br />

		<KtStandardTable
			id="example-remote-data"
			title="Remote Pagination"
			@update:dataFetchDependencies="fetchData"
		>
			<template #header-actions>
				<KtButton label="Some Action" />
			</template>
			<template #controls-actions>
				<KtButton label="Some Action" />
			</template>
			<template #info-actions>
				<KtButton label="Some Action" />
			</template>
		</KtStandardTable>
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

		const filters = ref<Kotti.StandardTable.Filter[]>([
			{
				dataTest: 'boolean-filter',
				id: 'booleanFilter',
				isPopupFilter: true,
				label: 'Boolean filter',
				slotLabels: ['No', 'Yes'],
				type: Kotti.StandardTable.FilterType.BOOLEAN,
			},
			{
				dataTest: 'single-select-filter',
				id: 'singleSelectFilter',
				isPopupFilter: false,
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
				isPopupFilter: false,
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
				isPopupFilter: false,
				label: 'Data range filter',
				type: Kotti.StandardTable.FilterType.DATE_RANGE,
			},
			{
				dataTest: 'number-range-filter',
				decimalPlaces: 2,
				id: 'numberRangeFilter',
				isPopupFilter: false,
				label: 'Number range filter',
				type: Kotti.StandardTable.FilterType.NUMBER_RANGE,
				unit: 'Kg',
			},
		])

		return {
			component: KtStandardTable,
			fetchData: async (
				args: Kotti.StandardTable.Events.UpdateDataFetchDependencies,
			) => {
				isLoadingRecipes.value = true

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
			localStandardTableHook: useKottiStandardTable<TodoRow>(
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
			),
			remoteStandardTableHook: useKottiStandardTable<RecipeRow>(
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
			),
		}
	},
})
</script>
