<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<KtFieldToggleGroup
			v-model="booleanFlags"
			isOptional
			:options="toggleGroupOptions"
			type="switch"
		/>
		<KtFieldSingleSelect
			v-model="clickBehavior"
			label="Row Click Behavior"
			:options="[
				{
					label: 'expand',
					value: 'expand',
				},
				{
					label: 'track row clicks',
					value: 'simple-event',
				},
				{
					label: 'go to google',
					value: 'link',
				},
				{
					label: 'Custom component',
					value: 'component',
				},
			]"
		/>
		<KtValueLabel
			v-if="clickBehavior === 'simple-event'"
			label="Row clicks"
			:value="counter"
		/>

		<!-- TODO: should not reuse `id` -->
		<KtTable class="mb-4" :isLoading="booleanFlags.isLoading" tableId="example">
			<template #actions> I am a nice action </template>
			<template #mycolumnid> costum content </template>
			<template
				v-if="booleanFlags.isEmpty && booleanFlags.showEmptySlot"
				#empty
			>
				<img
					src="https://usagif.com/wp-content/uploads/2021/4fh5wi/pepefrg-33.gif"
				/>
			</template>
			<template
				v-if="booleanFlags.isLoading && booleanFlags.showLoadingSlot"
				#loading
			>
				<img
					src="https://usagif.com/wp-content/uploads/2021/4fh5wi/pepefrg-54.gif"
				/>
			</template>
			<template #expanded-row>
				<div>Expanded content</div>
			</template>
		</KtTable>
		<div style="display: flex; gap: var(--unit-1)">
			<KtButton label="empty selection" @click="emptySelection" />
			<KtButton label="reverse columns" @click="reverseColumnOrder" />
			<br />
			<KtButton label="shuffle hidden columns" @click="shuffleHiddenColumns" />
			<KtButton label="show all columns" @click="showAllColumns" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, h, ref, watch } from 'vue'

import {
	KtButton,
	KtFieldSingleSelect,
	KtFieldToggleGroup,
	KtTable,
	KtValueLabel,
	useKottiTable,
} from '@3yourmind/kotti-ui'
import type { Kotti } from '@3yourmind/kotti-ui'

import ComponentInfo from '~/components/ComponentInfo.vue'

// | **Item**           | **Primary Purpose**     | **Speed**             | **Best Skill**        | **Worst Enemy**      | **Preferred Sound**  | **Lifespan**         | **Cuteness Level**   |
// |--------------------|-------------------------|-----------------------|-----------------------|----------------------|----------------------|----------------------|----------------------|
// | **Cats**           | Ignoring humans          | Slow and stealthy     | Perfect naps          | Vacuum cleaners       | Purring              | 9 lives              | Off the charts        |
// | **Spaceships**      | Exploring the universe   | Faster than light     | Quantum jumps         | Black holes           | Engine roar          | Until it crashes     | Not their priority    |
// | **Tungsten**       | Being immortal and holy  | Absolutely unmoving   | Outlasting everything | Rust (blasphemy!)     | Eternal silence      | Infinite (obviously) | Strangely attractive  |
// | **Coffee**         | Keeping people awake     | Varies by caffeine    | Fueling all-nighters  | Decaf                 | Slurping             | 10 minutes per cup   | Depends on presentation |

export default defineComponent({
	name: 'DocumentationPageUsageComponentsTable',
	components: {
		ComponentInfo,
		KtButton,
		KtFieldSingleSelect,
		KtFieldToggleGroup,
		KtTable,
		KtValueLabel,
	},
	setup() {
		const booleanFlags = ref({
			hasDragAndDrop: false,
			isEmpty: false,
			isExpandable: true,
			isLoading: false,
			isSelectable: true,
			showEmptySlot: false,
			showLoadingSlot: false,
		})
		const counter = ref(0)
		const clickBehavior = ref<
			'component' | 'expand' | 'link' | 'simple-event' | null
		>(null)

		const clickBehaviorValue = computed(() => {
			switch (clickBehavior.value) {
				case 'component':
					return {
						component: 'nuxt-link',
						props: {
							to: '/usage/layouts/navbar',
						},
					}
				case 'expand':
					return 'expand'
				case 'link':
					return {
						component: 'a',
						props: {
							href: 'https://www.google.com',
						},
					}
				case 'simple-event':
					return {
						component: null,
						onClick: () => {
							counter.value += 1
						},
					}
				default:
					return undefined
			}
		})

		type TableRow = {
			age: number | null
			bestSkill: string
			id: number
			isAlive: boolean
			lifespan: string
			name: string
			preferredSound: string
			purpose: string
			someDate: string
			speed: string
			worstEnemy: string
		}

		// const exampleRow: TableRow = {
		//   feature: "Primary Purpose",
		//   cats: "Ignoring humans",
		//   spaceships: "Exploring the universe",
		//   tungsten: "Being immortal and holy",
		//   coffee: "Keeping people awake",
		// }
		//
		const columns = computed<Kotti.Table.Column<TableRow>[]>(
			(): Kotti.Table.Column<TableRow>[] => [
				{
					display: {
						align: 'left',
						disableCellClick: true,
						formatter: (row: TableRow) =>
							h('div', {}, [
								h('em', { style: { color: 'green' } }, row.id),
								` ${row.name} is `,
								h('b', {}, row.age),
							]),
						isNumeric: false,
						type: 'custom',
					},
					getData: (row: TableRow) => row,
					id: 'age',
					isSortable: true,
					label: 'age (click disabled)',
				},
				{
					display: { type: 'boolean' },
					getData: (row: TableRow) => row.isAlive,
					id: 'isAlive',
					isSortable: true,
					label: 'Aliveness',
				},
				{
					display: {
						align: 'right',
						disableCellClick: false,
						formatter: (value: unknown) => String(value).replaceAll('e', 'x'),
						isNumeric: false,
						type: 'custom',
					},
					getData: (row: TableRow) => row.lifespan,
					id: 'lifespan',
					isSortable: true,
					label: 'Lifespan (click allowed)',
				},
				// {
				// 	display: {
				// 		align: 'left',
				// 		formatter: null,
				// 		isNumeric: false,
				// 		type: 'custom',
				// 	},
				// 	getData: (row) => ({
				// 		age: row.age,
				// 		id: row.id,
				// 		name: row.name,
				// 	}),
				// 	id: 'renderTest',
				// 	label: 'Render Test',
				// },
				{
					display: { type: 'text' },
					getData: (row) => row.name,
					id: 'name',
					isSortable: true,
					label: 'Name',
				},
				{
					display: { type: 'text' },
					getData: (row) => row.purpose,
					id: 'purpose',
					isSortable: true,
					label: 'Primary Purpose',
				},
				{
					display: { type: 'text' },
					getData: (row: TableRow) => String(row.age),
					id: 'speed',
					isSortable: true,
					label: 'Speed',
				},
				{
					display: { type: 'date' },
					getData: (row: TableRow) => row.someDate,
					id: 'randomDate',
					isSortable: true,
					label: 'Random Date',
				},
				{
					display: { type: 'text' },
					getData: (row: TableRow) => row.bestSkill,
					id: 'bestSkill',
					isSortable: true,
					label: 'Best Skill',
				},
				{
					display: { type: 'text' },
					getData: (row: TableRow) => row.worstEnemy,
					id: 'worstEnemy',
					isSortable: true,
					label: 'Worst Enemy',
				},
				{
					display: { type: 'text' },
					getData: (row: TableRow) => row.preferredSound,
					id: 'preferredSound',
					isSortable: true,
					label: 'Preferred Sound',
				},
			],
		)

		const tableHook = useKottiTable<TableRow>(
			computed(() => ({
				columns: columns.value,
				data: booleanFlags.value.isEmpty
					? []
					: [
							{
								age: 27.1,
								bestSkill: 'Perfect naps',
								id: 1,
								isAlive: true,
								lifespan: '9 lives',
								name: 'Cats',
								preferredSound: 'Purring',
								purpose: 'Ignoring humans',
								someDate: '2013-22-11',
								speed: 'Slow and stealthy',
								worstEnemy: 'Vacuum cleaners',
							},
							{
								age: 85.8,
								bestSkill: 'Quantum jumps',
								id: 2,
								isAlive: false,
								lifespan: 'Until it crashes',
								name: 'Spaceships',
								preferredSound: 'Engine roar',
								purpose: 'Exploring the universe',
								someDate: '1922-12-01',
								speed: 'Faster than light',
								worstEnemy: 'Black holes',
							},
							{
								age: null,
								bestSkill: 'Outlasting everything',
								id: 3,
								isAlive: false,
								lifespan: 'Infinite (obviously)',
								name: 'Tungsten',
								preferredSound: 'Eternal silence',
								purpose: 'Being immortal and holy',
								someDate: '1833-04-23',
								speed: 'Absolutely unmoving',
								worstEnemy: 'Rust (blasphemy!)',
							},
							{
								age: 0.1,
								bestSkill: 'Fueling all-nighters',
								id: 4,
								isAlive: false,
								lifespan: '10 minutes per cup',
								name: 'Coffee',
								preferredSound: 'Slurping',
								purpose: 'Keeping people awake',
								someDate: '2044-01-03',
								speed: 'Varies by caffeine level',
								worstEnemy: 'Decaf',
							},
						],
				getRowBehavior: ({ row, rowIndex }) => ({
					actions:
						rowIndex % 2 === 0
							? [
									{
										dataTest: `download-test-data-${rowIndex}`,
										icon: 'download',
										isDisabled: true,
										onClick: () => {
											// eslint-disable-next-line no-alert
											window.alert('download icon clicked')
										},
									},
									{
										icon: 'send',
										onClick: () => {
											// eslint-disable-next-line no-alert
											window.alert('send icon clicked')
										},
									},
								]
							: undefined,
					classes: [], //rowIndex % 2 === 0 ? ['everything-red'] : [],
					click: clickBehaviorValue.value,
					disable: {
						actions: false,
						click: rowIndex === 1,
						expand: rowIndex === 1,
						select: rowIndex === 1,
					},
					id: String(row.id),
				}),
				hasDragAndDrop: booleanFlags.value.hasDragAndDrop,
				id: 'example',
				isExpandable: booleanFlags.value.isExpandable,
				isSelectable: booleanFlags.value.isSelectable,
			})),
		)

		// globalThis.table = tableHook

		watch(tableHook.api.ordering, () => {
			try {
				// eslint-disable-next-line no-console
				console.log(JSON.stringify(tableHook.api.ordering.value))
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
			}
		})

		return {
			booleanFlags,
			clickBehavior,
			component: KtTable,
			counter,
			emptySelection: () => {
				tableHook.api.selectedRows.value = {}
			},
			shuffleHiddenColumns: () => {
				const ONE_HALF = 0.5
				tableHook.api.hiddenColumns.value = new Set(
					columns.value
						.map((column) => column.id)
						.filter(() => Math.random() < ONE_HALF),
				)
			},
			reverseColumnOrder: () => {
				tableHook.api.columnOrder.value =
					tableHook.api.columnOrder.value.reverse()
			},
			showAllColumns: () => {
				tableHook.api.hiddenColumns.value = new Set()
			},
			table: tableHook,
			toggleGroupOptions: computed(() => [
				{
					key: 'hasDragAndDrop',
					label: 'table has drag and drop',
				},
				{
					key: 'isExpandable',
					label: 'table is expandable',
				},
				{
					isDisabled: booleanFlags.value.isLoading,
					key: 'isEmpty',
					label: 'table is empty',
				},
				...(booleanFlags.value.isEmpty
					? [
							{
								key: 'showEmptySlot',
								label: "show table's #empty slot",
							},
						]
					: []),
				{
					isDisabled: booleanFlags.value.isEmpty,
					key: 'isLoading',
					label: 'table is loading',
				},
				...(booleanFlags.value.isLoading
					? [
							{
								key: 'showLoadingSlot',
								label: "show table's #loading slot",
							},
						]
					: []),
				{
					key: 'isSelectable',
					label: 'table is selectable',
				},
			]),
		}
	},
})
</script>

<style>
.everything-red {
	color: red !important;
	background-color: rosybrown !important;
}
</style>

<style scoped>
.smol {
	width: 40%;
	margin: 5px;
	border: 1px solid gray;
}
</style>
