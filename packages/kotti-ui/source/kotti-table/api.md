## Controlled VS Uncontrolled

### Controlled properties

- Selected Rows

### Uncontrolled properties (?)

- Hidden Columns
- Sorted Columns (Makes no sense for remote)

## Basic Usage

### Old

```html
<KtTableLegacy :rows="rows" :columns="columns" />
```

```js
{
	columns: [
		{ label: 'Name',    prop: 'name' },
		{ label: 'Date',    prop: 'date' },
		{ label: 'Address', prop: 'address.line' },
	],
	rows: [
		{ date: '2016-05-03', name: 'Tom',     address: { number: 119, line: 'No. 119, Grove St, Los Angeles' } },
		{ date: '2016-05-02', name: 'Jackson', address: { number: 89, line: 'No. 89, Grove St, Los Angeles' } },
		{ date: '2016-05-04', name: 'Fen',     address: { number: 182, line: 'No. 182, Grove St, Los Angeles' } },
		{ date: '2016-05-01', name: 'Fexiang', address: { number: 189, line: 'No. 189, Grove St, Los Angeles' } },
	],
}
```

### New

```ts
const table = useKottiTable({
	columns: computed(() => [
		{ label: 'Name', id: 'name', getData: (data) => data.name },
		{ label: 'Date', id: 'date', getData: (data) => data.date },
		{
			label: 'Address',
			id: 'addressLine',
			getData: (data) => data.address.line,
		},
	]),
	data: computed(() => [
		{
			date: '2016-05-03',
			name: 'Tom',
			address: { number: 119, line: 'No. 119, Grove St, Los Angeles' },
		},
		{
			date: '2016-05-02',
			name: 'Jackson',
			address: { number: 89, line: 'No. 89, Grove St, Los Angeles' },
		},
		{
			date: '2016-05-04',
			name: 'Fen',
			address: { number: 182, line: 'No. 182, Grove St, Los Angeles' },
		},
		{
			date: '2016-05-01',
			name: 'Fexiang',
			address: { number: 189, line: 'No. 189, Grove St, Los Angeles' },
		},
	]),
})
```

## Style

### Old

```ts
{
	columns: [
		{ prop: 'name', label: 'Name', width: '30%', align: 'left'  },
		{ prop: 'date', label: 'Date', width: '20%', align: 'right' },
		{ prop: 'address.line', label: 'Address', width: '50%', align: 'center' },
	],
}
```

### New

```ts
const table = useKottiTable({
	columns: computed(() => [
		{ label: 'Name', id: 'name', getData: (data) => data.name, width: '30%', align: 'left' },
		{ label: 'Date', id: 'date', getData: (data) => data.date, width: '20%', align: 'right' },
		{
			label: 'Address',
			id: 'addressLine',
			getData: (data) => data.address.line,
			width: '50%',
			align: 'center'
		},
	]),
```

## Selectable

```html
<div>
	<KtTableLegacy
		:rows="rows"
		:columns="columns"
		isSelectable
		:selected="selected"
		@selectionChange="((selection) => selected = selection)"
	/>
	<pre>Selected Rows: {{JSON.stringify(selected,undefined, 2)}} </pre>
</div>
```

```js
{
	data(){
		return {
			selected: [
				{
					date: '2016-05-03',
					name: 'Tom',
					address: { number: 119, line: 'No. 119, Grove St, Los Angeles' },
				}
			],
		}
	}
}
```

// TODO

## Hide Columns

### Old

```vue
<KtTableLegacyProvider>
		<KtTableLegacyConsumer #default="{ columns, hideColumn, showAllColumns }">
			<div class="parts-edit-columns-filter__container">
				<KtButtonGroup>
					<KtButton
						v-for="column in columns"
						:key="column.prop"
						:label="`${column.hidden? 'Show ':'Hide '} ${column.label || column.prop}`"
						:type="column.hidden ? 'text' : 'primary'"
						@click="hideColumn(column, !column.hidden)"
					/>
				</KtButtonGroup>
				<KtButton
					:disabled="columns.filter(c=> c.hidden).length === 0"
					type="primary"
					label="Show All Columns"
					@click="showAllColumns"
				/>
			</div>
		</KtTableLegacyConsumer>
		<KtTableLegacy :rows="rows" :columns="columnsHidden" />
</KtTableLegacyProvider>
```

### New

```ts
const columns = [
	{ ... hidden: true},  { ..., hidden: false }
]


const table = useKottiTable({ columns, data })

table.setColumnHidden(columnId, true)

table.hiddenColumns //
```

## Pagination

```vue
<KtStandardTable>
	<KtTable/>
	<template #header>
			<KtTableTextField />
			<KtTableFilters />
			<KtTableColumnConfigurator />
		</template>
	<template #pagination>
		<KtPagination/>
	</template>
</KtStandardTable>
```

```ts
const useKottiStandardTable = ({
	pagination,
	tableArguments,
}: {
	pagination:
		| { itemsPerPage: number; page: number; type: 'local ' }
		| { itemsPerPage: number; page: number; total: number; type: 'remote' }
	tableArguments: {...}
}) => {
	const table = useKottiTable({...tableArguments, manualPagiation: pagination.type === 'remote'})
	// useVueTable
}
```

| Pagination            | local                                      | Remote                    |
| --------------------- | ------------------------------------------ | ------------------------- |
| row data              | array of any length that is auto-paginated | array of set itemsPerPage |
| changing itemsPerPage | re-auto-pagination                         | re-fetching data          |
| changing page         | pointing to a different auto-page          | re-fetching data          |
