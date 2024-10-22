<template lang="md">
## Seriöses Example

<KtTable id="example" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
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
			name: string
			purpose: string
			speed: string
			bestSkill: string
			worstEnemy: string
			preferredSound: string
			lifespan: string
		}

		// const exampleRow: TableRow = {
		//   feature: "Primary Purpose",
		//   cats: "Ignoring humans",
		//   spaceships: "Exploring the universe",
		//   tungsten: "Being immortal and holy",
		//   coffee: "Keeping people awake",
		// }

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
					name: 'Cats',
					purpose: 'Ignoring humans',
					speed: 'Slow and stealthy',
					bestSkill: 'Perfect naps',
					worstEnemy: 'Vacuum cleaners',
					preferredSound: 'Purring',
					lifespan: '9 lives',
				},
				{
					name: 'Spaceships',
					purpose: 'Exploring the universe',
					speed: 'Faster than light',
					bestSkill: 'Quantum jumps',
					worstEnemy: 'Black holes',
					preferredSound: 'Engine roar',
					lifespan: 'Until it crashes',
				},
				{
					name: 'Tungsten',
					purpose: 'Being immortal and holy',
					speed: 'Absolutely unmoving',
					bestSkill: 'Outlasting everything',
					worstEnemy: 'Rust (blasphemy!)',
					preferredSound: 'Eternal silence',
					lifespan: 'Infinite (obviously)',
				},
				{
					name: 'Coffee',
					purpose: 'Keeping people awake',
					speed: 'Varies by caffeine level',
					bestSkill: 'Fueling all-nighters',
					worstEnemy: 'Decaf',
					preferredSound: 'Slurping',
					lifespan: '10 minutes per cup',
				},
			]),
			id: 'example',
		})

		return {
			table,
		}
	},
})
</script>
