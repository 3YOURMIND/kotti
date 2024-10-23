<template lang="md">
## Seriöses Example

<KtTable id="example" />
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import { KtTable, useKottiTable } from '@3yourmind/kotti-ui'

// | **Item**           | **Primary Purpose**     | **Speed**             | **Best Skill**        | **Worst Enemy**      | **Preferred Sound**  | **Lifespan**         | **Cuteness Level**   |
// |--------------------|-------------------------|-----------------------|-----------------------|----------------------|----------------------|----------------------|----------------------|
// | **Cats**           | Ignoring humans          | Slow and stealthy     | Perfect naps          | Vacuum cleaners       | Purring              | 9 lives              | Off the charts        |
// | **Spaceships**      | Exploring the universe   | Faster than light     | Quantum jumps         | Black holes           | Engine roar          | Until it crashes     | Not their priority    |
// | **Tungsten**       | Being immortal and holy  | Absolutely unmoving   | Outlasting everything | Rust (blasphemy!)     | Eternal silence      | Infinite (obviously) | Strangely attractive  |
// | **Coffee**         | Keeping people awake     | Varies by caffeine    | Fueling all-nighters  | Decaf                 | Slurping             | 10 minutes per cup   | Depends on presentation |

export default defineComponent({
	name: 'DocumentationPageUsageComponentsTable',
	components: {
		KtTable,
	},
	setup() {
		type TableRow = {
			bestSkill: string
			id: number
			lifespan: string
			name: string
			preferredSound: string
			purpose: string
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
					getData: (row) => row.name,
					id: 'name',
					label: 'Name',
				},
				{
					getData: (row) => row.purpose,
					id: 'purpose',
					label: 'Primary Purpose',
				},
				{
					getData: (row) => row.speed,
					id: 'speed',
					label: 'Speed',
				},
				{
					getData: (row) => row.bestSkill,
					id: 'bestSkill',
					label: 'Best Skill',
					renderSlot: 'bestSkillSlot',
				},
				{
					getData: (row) => row.worstEnemy,
					id: 'worstEnemy',
					label: 'Worst Enemy',
				},
				{
					getData: (row) => row.preferredSound,
					id: 'preferredSound',
					label: 'Preferred Sound',
				},
				{
					getData: (row) => row.lifespan,
					id: 'lifespan',
					label: 'Lifespan',
				},
			]),
			data: computed(() => [
				{
					bestSkill: 'Perfect naps',
					id: 1,
					lifespan: '9 lives',
					name: 'Cats',
					preferredSound: 'Purring',
					purpose: 'Ignoring humans',
					speed: 'Slow and stealthy',
					worstEnemy: 'Vacuum cleaners',
				},
				{
					bestSkill: 'Quantum jumps',
					id: 2,
					lifespan: 'Until it crashes',
					name: 'Spaceships',
					preferredSound: 'Engine roar',
					purpose: 'Exploring the universe',
					speed: 'Faster than light',
					worstEnemy: 'Black holes',
				},
				{
					bestSkill: 'Outlasting everything',
					id: 3,
					lifespan: 'Infinite (obviously)',
					name: 'Tungsten',
					preferredSound: 'Eternal silence',
					purpose: 'Being immortal and holy',
					speed: 'Absolutely unmoving',
					worstEnemy: 'Rust (blasphemy!)',
				},
				{
					bestSkill: 'Fueling all-nighters',
					id: 4,
					lifespan: '10 minutes per cup',
					name: 'Coffee',
					preferredSound: 'Slurping',
					purpose: 'Keeping people awake',
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
				selectedRows: selectedRows.value,
			},
		})

		return {
			selectedRows,
			table,
		}
	},
})
</script>

<style scoped>
.smol {
	border: 1px solid gray;
	margin: 5px;

	width: 40%;
}
</style>
