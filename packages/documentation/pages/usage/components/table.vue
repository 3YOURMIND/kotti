<template lang="md">
## Basic Example

<KtTable id="example" />
<KtButton label="empty selection" @click="emptySelection" />

<h2 class="standard-table-header"> Standard Table</h2>

<KtStandardTable />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import {
	KtButton,
	KtTable,
	KtStandardTable,
	useKottiTable,
} from '@3yourmind/kotti-ui'

// | **Item**           | **Primary Purpose**     | **Speed**             | **Best Skill**        | **Worst Enemy**      | **Preferred Sound**  | **Lifespan**         | **Cuteness Level**   |
// |--------------------|-------------------------|-----------------------|-----------------------|----------------------|----------------------|----------------------|----------------------|
// | **Cats**           | Ignoring humans          | Slow and stealthy     | Perfect naps          | Vacuum cleaners       | Purring              | 9 lives              | Off the charts        |
// | **Spaceships**      | Exploring the universe   | Faster than light     | Quantum jumps         | Black holes           | Engine roar          | Until it crashes     | Not their priority    |
// | **Tungsten**       | Being immortal and holy  | Absolutely unmoving   | Outlasting everything | Rust (blasphemy!)     | Eternal silence      | Infinite (obviously) | Strangely attractive  |
// | **Coffee**         | Keeping people awake     | Varies by caffeine    | Fueling all-nighters  | Decaf                 | Slurping             | 10 minutes per cup   | Depends on presentation |

export default defineComponent({
	name: 'DocumentationPageUsageComponentsTable',
	components: {
		KtButton,
		KtStandardTable,
		KtTable,
	},
	setup() {
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

		const selectedRows = ref<Record<string, boolean>>({})

		const table = useKottiTable<TableRow>({
			columns: computed(() => [
				{
					display: { type: 'numerical', decimalPlaces: 3 },
					getData: (row) => row.age,
					id: 'age',
					label: 'age',
				},
				{
					display: { type: 'text' },
					getData: (row) => row.name,
					id: 'name',
					label: 'Name',
				},
				{
					display: { type: 'text' },
					getData: (row) => row.purpose,
					id: 'purpose',
					label: 'Primary Purpose',
				},
				{
					display: { type: 'boolean' },
					getData: (row) => row.isAlive,
					id: 'isAlive',
					label: 'Aliveness',
				},
				{
					display: { type: 'text' },
					getData: (row) => row.speed,
					id: 'speed',
					label: 'Speed',
				},
				{
					display: { type: 'date' },
					getData: (row) => row.someDate,
					id: 'Random Date somehow',
					label: 'Random Date',
				},
				{
					display: { type: 'text' },
					getData: (row) => row.bestSkill,
					id: 'bestSkill',
					label: 'Best Skill',
					renderSlot: 'bestSkillSlot',
				},
				{
					display: { type: 'text' },
					getData: (row) => row.worstEnemy,
					id: 'worstEnemy',
					label: 'Worst Enemy',
				},
				{
					display: { type: 'text' },
					getData: (row) => row.preferredSound,
					id: 'preferredSound',
					label: 'Preferred Sound',
				},
				{
					display: {
						align: 'right',
						formatter: (value: unknown) => String(value).replaceAll('e', 'x'),
						isNumeric: false,
						type: 'custom',
					},
					getData: (row) => row.lifespan,
					id: 'lifespan',
					label: 'Lifespan',
				},
			]),
			data: computed(() => [
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
			]),
			id: 'example',
			selection: {
				getRowId: (row) => String(row.id),
				onSelectionUpdate: (updated) => {
					selectedRows.value = updated
				},
				selectedRows: selectedRows,
			},
		})

		// globalThis.table = table

		return {
			emptySelection: () => {
				selectedRows.value = {}
			},
			selectedRows,
			table,
		}
	},
})
</script>

<style scoped>
.smol {
	margin: 5px;
	width: 40%;
	border: 1px solid gray;
}

.standard-table-header {
	margin-top: 4rem;
}
</style>
