<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<KtFieldToggle v-model="isTableExpandable" isOptional type="switch">
			Is Table Extendable
		</KtFieldToggle>
		<KtFieldToggle v-model="isTableSelectable" isOptional type="switch">
			Is Table Selectable
		</KtFieldToggle>

		<KtTable id="example">
			<template #actions> I am a nice action </template>
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
	KtFieldToggle,
	KtTable,
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
		KtFieldToggle,
		KtTable,
	},
	setup() {
		const isTableExpandable = ref(true)
		const isTableSelectable = ref(true)
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
						formatter: null,
						isNumeric: false,
						type: 'custom',
					},
					// display: { decimalPlaces: 3, type: 'numerical' },
					// <em style="color: green">{{ data.id }}:</em> {{ data.name }} is
					// <b>{{ data.age }}</b> old
					getData: (row: TableRow) =>
						h('div', {}, [
							h('em', { style: { color: 'green' } }, row.id),
							` ${row.name} is `,
							h('b', {}, row.age),
						]),
					// getData: (row: TableRow) => row.age,
					id: 'age',
					isSortable: true,
					label: 'age',
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
					display: { type: 'boolean' },
					getData: (row: TableRow) => row.isAlive,
					id: 'isAlive',
					isSortable: true,
					label: 'Aliveness',
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
				{
					display: {
						align: 'right',
						formatter: (value: unknown) => String(value).replaceAll('e', 'x'),
						isNumeric: false,
						type: 'custom',
					},
					getData: (row: TableRow) => row.lifespan,
					id: 'lifespan',
					isSortable: true,
					label: 'Lifespan',
				},
			],
		)

		const tableHook = useKottiTable<TableRow>(
			computed(() => ({
				columns: columns.value,
				data: [
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
				getRowId: (row) => String(row.id) + '-string',
				hasDragAndDrop: true,
				id: 'example',
				isExpandable: isTableExpandable.value,
				selection: isTableSelectable.value ? {} : undefined,
			})),
		)

		// globalThis.table = tableHook

		watch(tableHook.ordering, () => {
			try {
				console.log(JSON.stringify(tableHook.ordering.value))
			} catch (error) {
				console.error(error)
			}
		})

		return {
			component: KtTable,
			emptySelection: () => {
				tableHook.rowSelection.value = {}
			},
			isTableExpandable,
			isTableSelectable,
			shuffleHiddenColumns: () => {
				const ONE_HALF = 0.5
				tableHook.hiddenColumns.value = new Set(
					columns.value
						.map((column) => column.id)
						.filter(() => Math.random() < ONE_HALF),
				)
			},
			reverseColumnOrder: () => {
				tableHook.columnOrder.value = tableHook.columnOrder.value.reverse()
			},
			visibilityOptions: computed<Kotti.FieldToggleGroup.Props['options']>(
				() => [
					{ key: 'age', label: 'Age' },
					{ key: 'name', label: 'Name' },
					{ key: 'purpose', label: 'Primary Purpose' },
					{ key: 'isAlive', label: 'Aliveness' },
					{ key: 'speed', label: 'Speed' },
					{ key: 'randomDate', label: 'Random Date' },
					{ key: 'bestSkill', label: 'Best Skill' },
					{ key: 'worstEnemy', label: 'Worst Enemy' },
					{ key: 'preferredSound', label: 'Preferred Sound' },
				],
			),
			showAllColumns: () => {
				tableHook.hiddenColumns.value = new Set()
			},
			table: tableHook,
		}
	},
})
</script>

<style scoped>
.smol {
	width: 40%;
	margin: 5px;
	border: 1px solid gray;
}
</style>
