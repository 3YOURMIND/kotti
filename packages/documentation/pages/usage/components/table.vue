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
			v-model="expandMode"
			label="Expand Mode"
			:options="[
				{
					label: 'None',
					value: null,
				},
				{
					label: 'Single',
					value: 'single',
				},
				{
					label: 'Multi',
					value: 'multi',
				},
			]"
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

		<KtTable class="mb-4" :isLoading="booleanFlags.isLoading" tableId="example">
			<template #actions> I am a nice action </template>
			<template #mycolumnid> costum content </template>
			<template
				v-if="booleanFlags.isEmpty && booleanFlags.showEmptySlot"
				#empty
			>
				<img src="https://picsum.photos/400/150" />
			</template>
			<template
				v-if="booleanFlags.isLoading && booleanFlags.showLoadingSlot"
				#loading
			>
				<img src="https://picsum.photos/400/150" />
			</template>
			<template #expanded-row>
				<div>Expanded content</div>
			</template>
		</KtTable>
		<div style="display: flex; gap: var(--unit-1)">
			<KtButton label="empty selection" @click="emptySelection" />
			<KtButton label="reverse columns" @click="reverseColumnOrder" />
			<br />
			<KtButton label="show all columns" @click="showAllColumns" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, h, ref, watch } from 'vue'

import {
	createColumnContext,
	getCustomDisplay,
	getDisplay,
	getNumericalSorter,
	getTextSorter,
	KtButton,
	KtFieldSingleSelect,
	KtFieldToggleGroup,
	KtTable,
	KtValueLabel,
	useKottiTable,
	useLocalSort,
} from '@3yourmind/kotti-ui'

import ComponentInfo from '~/components/ComponentInfo.vue'

type ColumnId =
	| 'age'
	| 'bestSkill'
	| 'isAlive'
	| 'lifespan'
	| 'name'
	| 'preferredSound'
	| 'purpose'
	| 'randomDate'
	| 'speed'
	| 'worstEnemy'

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
			isLoading: false,
			isSelectable: true,
			showEmptySlot: false,
			showLoadingSlot: false,
		})
		const expandMode = ref<'multi' | 'single' | null>('single')
		const counter = ref(0)
		const clickBehavior = ref<
			'component' | 'expand' | 'link' | 'simple-event' | null
		>(null)
		const booleanDisplay = getDisplay({ mode: 'text', type: 'boolean' })
		const dateDisplay = getDisplay({ formatString: 'YYYY-MM-DD', type: 'date' })
		const textDisplay = getDisplay({ type: 'text' })

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
			age: number
			bestSkill: string
			id: number
			isAlive: boolean
			lifespan: string
			name: string
			preferredSound: string
			purpose: string
			someDate: string
			speed: string | null
			worstEnemy: string
		}

		const getInitialValue = () => [
			{
				age: 27.1,
				bestSkill: 'Perfect naps',
				id: 1,
				isAlive: true,
				lifespan: '9 lives',
				name: 'Cats',
				preferredSound: 'Purring',
				purpose: 'Ignoring humans',
				someDate: '2013-11-11',
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
				age: 2134412,
				bestSkill: 'Outlasting everything',
				id: 3,
				isAlive: false,
				lifespan: 'Infinite (obviously)',
				name: 'Tungsten',
				preferredSound: 'Eternal silence',
				purpose: 'Being immortal and holy',
				someDate: '1833-04-23',
				speed: null,
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
		]

		const data = ref(getInitialValue())
		const locallySortedData = ref<TableRow[]>([])

		const { createColumn } = createColumnContext<TableRow>()

		const tableHook = useKottiTable<TableRow, ColumnId>(
			computed(() => ({
				columns: [
					createColumn({
						display: getCustomDisplay<TableRow>({
							align: 'left',
							disableCellClick: true,
							isNumeric: false,
							render: (value) => {
								return h('div', {}, [
									h('em', { style: { color: 'green' } }, value.id),
									` ${value.name} is `,
									h('b', {}, value.age),
								])
							},
						}),
						getData: (row) => row,
						id: 'age',
						isSortable: true,
						label: 'age (click disabled)',
						minWidth: '300px',
					}),
					createColumn({
						display: booleanDisplay,
						getData: (row) => row.isAlive,
						id: 'isAlive',
						label: 'Aliveness',
						width: '300px',
					}),
					createColumn({
						display: getCustomDisplay({
							align: 'center',
							disableCellClick: false,
							isNumeric: false,
							render: (value: string) => value.replaceAll('e', 'x'),
						}),
						getData: (row) => row.lifespan,
						id: 'lifespan',
						isSortable: true,
						label: 'Lifespan (click allowed)',
					}),
					createColumn({
						display: textDisplay,
						getData: (row) => row.name,
						id: 'name',
						isSortable: true,
						label: 'Name',
					}),
					createColumn({
						display: textDisplay,
						getData: (row) => row.purpose,
						id: 'purpose',
						isSortable: true,
						label: 'Primary Purpose',
					}),
					createColumn({
						display: textDisplay,
						getData: (row) => row.speed,
						id: 'speed',
						isSortable: true,
						label: 'Speed',
					}),
					createColumn({
						display: dateDisplay,
						getData: (row) => new Date(row.someDate),
						id: 'randomDate',
						isSortable: true,
						label: 'Random Date',
					}),
					createColumn({
						display: textDisplay,
						getData: (row) => row.bestSkill,
						id: 'bestSkill',
						isSortable: true,
						label: 'Best Skill',
					}),
					createColumn({
						display: textDisplay,
						getData: (row) => row.worstEnemy,
						id: 'worstEnemy',
						isSortable: true,
						label: 'Worst Enemy',
					}),
					createColumn({
						display: textDisplay,
						getData: (row) => row.preferredSound,
						id: 'preferredSound',
						isSortable: true,
						label: 'Preferred Sound',
					}),
				],
				data: booleanFlags.value.isEmpty ? [] : locallySortedData.value,
				expandMode: expandMode.value ?? undefined,
				getRowBehavior: ({
					row,
					rowIndex,
				}: {
					row: TableRow
					rowIndex: number
				}) => ({
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
				isSelectable: booleanFlags.value.isSelectable,
			})),
		)

		useLocalSort({
			locallySortedData: locallySortedData,
			ordering: tableHook.api.ordering,
			rawData: data,
			sortingFunctions: {
				age: (mode) => getNumericalSorter<TableRow>((row) => row.age, mode),
				bestSkill: (mode) =>
					getTextSorter<TableRow>((row) => row.bestSkill, mode),
				isAlive: (mode) =>
					getNumericalSorter<TableRow>((row) => (row.isAlive ? 1 : 0), mode),
				lifespan: (mode) =>
					getTextSorter<TableRow>((row) => row.lifespan, mode),
				name: (mode) => getTextSorter<TableRow>((row) => row.name, mode),
				preferredSound: (mode) =>
					getTextSorter<TableRow>((row) => row.preferredSound, mode),
				purpose: (mode) => getTextSorter<TableRow>((row) => row.purpose, mode),
				randomDate: (mode) =>
					getTextSorter<TableRow>((row) => row.someDate, mode),
				speed: (mode) => getTextSorter<TableRow>((row) => row.speed, mode),
				worstEnemy: (mode) =>
					getTextSorter<TableRow>((row) => row.worstEnemy, mode),
			},
		})

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
			expandMode,
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
					key: 'isLoading',
					label: 'table is loading',
				},
				...(booleanFlags.value.isLoading && booleanFlags.value.isEmpty
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
