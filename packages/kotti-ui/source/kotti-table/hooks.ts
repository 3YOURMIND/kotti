import type { ColumnMeta } from '@tanstack/table-core'
import {
	type CellContext,
	createColumnHelper,
	getCoreRowModel,
	type HeaderContext,
	getPaginationRowModel,
} from '@tanstack/table-core'
import { computed, h, provide, ref, type Ref } from 'vue'
import { Dashes } from '@metatypes/typography'

import ToggleInner from '../shared-components/toggle-inner/ToggleInner.vue'

import { getTableContextKey, type TableContext } from './context'
import { useVueTable } from './tanstack-table'
import type { AnyRow } from './types'
import { KottiI18n } from '../kotti-i18n/types'
import { useI18nContext } from '../kotti-i18n/hooks'

type ResolvedColumnDisplay<C extends Record<string, unknown>> = {
	align: 'center' | 'left' | 'right'
	formatter:
		| ((
				value: unknown,
				context: { numberFormat: KottiI18n.NumberFormat; options: C },
		  ) => string | null)
		| null
	isNumeric: boolean
}

type Display =
	// TODO: getData should understand display.type
	// TODO: truncate text, ask how default behavior
	// TODO: attachments, needs design
	// TODO: image, array of urls as data, needs render functions
	// TODO: tuples with separator (e.g. "1234 x 23")
	| { type: 'boolean' | 'date' | 'datetime' | 'integer' | 'text' }
	| { type: 'numerical'; decimalPlaces?: number }
	| {
			type: 'custom'
			align: 'center' | 'left' | 'right'
			formatter:
				| ((
						value: unknown,
						context: {
							numberFormat: KottiI18n.NumberFormat
							options: unknown
						},
				  ) => string | null)
				| null
			isNumeric: boolean
	  }

type KottiTableParameter<ROW extends AnyRow> = {
	columns: Ref<
		{
			display: Display
			getData: (row: ROW) => unknown /* TODO: <DATA> */
			id: string /* number | symbol */
			label: string
		}[]
	>
	data: Ref<ROW[]>
	id: string
	pagination?:
		| { page: Ref<{ pageIndex: number; pageSize: number }>; type: 'local' }
		| {
				page: Ref<{ pageIndex: number; pageSize: number }>
				total: number
				type: 'remote'
		  }
	selection?: {
		getRowId: (row: ROW) => string // maybe needed in other places?
		onSelectionUpdate: (updated: Record<string, boolean>) => void
		selectedRows: Ref<Record<string, boolean>>
	}
}

const boolean: ResolvedColumnDisplay<Record<string, never>> = {
	align: 'left',
	// TODO: ask how boolean should be displayed
	formatter: (value: unknown) => (value ? 'TRUE' : 'FALSE'),
	isNumeric: true,
}

const date: ResolvedColumnDisplay<Record<string, never>> = {
	align: 'left',
	formatter: (value: unknown) => value as string,
	isNumeric: true,
}

const datetime: ResolvedColumnDisplay<Record<string, never>> = {
	align: 'left',
	formatter: (value: unknown) => (value as string).replace('T', ' '),
	isNumeric: true,
}

const integer: ResolvedColumnDisplay<Record<string, never>> = {
	align: 'right',
	formatter: (value: unknown) =>
		value === null ? null : String(Math.round(value as number)),
	isNumeric: true,
}

const numerical: ResolvedColumnDisplay<{ decimalPlaces?: number }> = {
	align: 'right',
	formatter: (value, context) =>
		value === null
			? null
			: (value as number)
					.toFixed(context.options.decimalPlaces ?? 2)
					.replace('.', context.numberFormat.decimalSeparator),
	isNumeric: true,
}

const text: ResolvedColumnDisplay<Record<string, never>> = {
	align: 'left',
	formatter: (value: unknown) => value as string,
	isNumeric: false,
}

const columnDisplayMap = {
	boolean,
	date,
	datetime,
	integer,
	numerical,
	text,
}

const resolveColumnDisplay = <C extends Record<string, unknown>>(
	display: Display,
): ResolvedColumnDisplay<C> => {
	if (display.type === 'custom') return display

	return columnDisplayMap[display.type] as ResolvedColumnDisplay<C>
}

export const useKottiTable = <ROW extends AnyRow>(
	params: KottiTableParameter<ROW>,
): {
	tableContext: TableContext<ROW>
} => {
	const columnHelper = createColumnHelper<ROW>()
	const i18nContext = useI18nContext()

	const table = useVueTable(
		computed(() => ({
			columns: [
				...(params.selection
					? [
							columnHelper.display({
								cell: ({ row }: CellContext<ROW, unknown>) =>
									h(
										'div',
										{
											class: 'kt-table-selection',
											on: {
												click: () => {
													row.toggleSelected(!row.getIsSelected())
												},
											},
										},
										[
											h(ToggleInner, {
												props: {
													component: 'div',
													inputProps: {
														// TODO: pass data-test
														// TODO: disable when row is disabled
														disabled: !row.getCanSelect(),
													},
													isDisabled: !row.getCanSelect(),
													value: row.getIsSelected(),
												},
											}),
										],
									),
								header: ({ table }: HeaderContext<ROW, unknown>) =>
									h(
										'div',
										{
											on: {
												click: () => {
													table.toggleAllRowsSelected(
														!table.getIsAllRowsSelected(),
													)
												},
											},
										},
										[
											h(ToggleInner, {
												props: {
													component: 'div',
													inputProps: {
														// TODO: pass data-test
													},
													isDisabled: false,
													value: table.getIsAllRowsSelected(),
												},
											}),
										],
									),
								id: `${params.id}-inner-select`,
								meta: {
									cellClasses: 'kt-table-cell',
									headerClasses: 'kt-table-cell',
								},
							}),
						]
					: []),
				...params.columns.value.map((column) => {
					const columnDisplay = resolveColumnDisplay(column.display)
					const alignmentClass: string = Object.entries({
						[`kt-table-cell--is-${columnDisplay.align}-aligned`]: true,
						'kt-table-cell': true,
						'kt-table-cell--displays-number': columnDisplay.isNumeric,
					})
						.filter(([_, isTrue]) => isTrue)
						.map(([className, _]) => className)
						.join(' ')

					return columnHelper.accessor(column.getData, {
						cell: (info) => {
							if (columnDisplay.formatter) {
								return (
									columnDisplay.formatter(info.getValue(), {
										numberFormat: i18nContext.numberFormat,
										options: column.display,
									}) ?? Dashes.EmDash
								)
							}
							return info.getValue() ?? Dashes.EmDash
						},
						header: () => column.label,
						id: column.id,
						meta: {
							cellClasses: alignmentClass,
							headerClasses: alignmentClass,
						} satisfies ColumnMeta<ROW, unknown>,
					})
				}),
			],
			data: params.data.value,
			getCoreRowModel: getCoreRowModel(),
			getPaginationRowModel:
				params.pagination && params.pagination.type === 'local'
					? getPaginationRowModel()
					: undefined,
			getRowId: params.selection?.getRowId,
			manualPagination: params.pagination
				? params.pagination.type === 'remote'
				: undefined,
			onPaginationChange: (updateOrValue) => {
				if (!params.pagination) throw new Error('no selection available')

				const updatedPage =
					typeof updateOrValue === 'function'
						? updateOrValue(params.pagination.page.value)
						: updateOrValue
				params.pagination.page.value = updatedPage
			},
			onRowSelectionChange: (updateOrValue) => {
				if (!params.selection) throw new Error('no selection available')

				const updatedSelection =
					typeof updateOrValue === 'function'
						? updateOrValue(params.selection.selectedRows.value)
						: updateOrValue
				params.selection.selectedRows.value = updatedSelection
			},
			state: {
				pagination:
					params.pagination && params.pagination.type === 'local'
						? params.pagination.page.value
						: undefined,
				rowSelection: params.selection?.selectedRows.value,
			},
		})),
	)

	const tableContext: TableContext<ROW> = computed(() => ({
		internal: {
			table,
		},
	}))
	provide<TableContext<ROW>>(getTableContextKey(params.id), tableContext)

	return {
		tableContext,
	}
}

type DummyData = {
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

const getPaginationFeature = <DummyData>(
	pagination:
		| { itemsPerPage: number; page: number; type: 'local' }
		| { itemsPerPage: number; page: number; total: number; type: 'remote' }
		| null,
) => {
	if (pagination === null) return null

	if (pagination.type === 'local') {
		return {
			tableArguments: {
				page: ref({
					pageIndex: pagination.page,
					pageSize: pagination.itemsPerPage,
				}),
				type: 'local' as const,
			},
		}
	}
	return null
}

export const useKottiStandardTable = (params: {
	id: string
	pagination?:
		| { itemsPerPage: number; page: number; type: 'local' }
		| { itemsPerPage: number; page: number; total: number; type: 'remote' }
}) => {
	const data = [
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
	]

	const pagination = getPaginationFeature(params.pagination ?? null)

	const { tableContext } = useKottiTable<DummyData>({
		columns: computed(() => [
			{
				display: { type: 'text' },
				getData: (row) => row.id,
				id: 'id',
				label: 'ID',
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
		]),
		data: computed(() => data),
		id: params.id,
		pagination: pagination ? pagination.tableArguments : undefined,
	})

	return {
		tableContext,
	}
}
