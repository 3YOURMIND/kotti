<template lang="md">
# Tables

## Elements

![Table Elements](~/assets/img/tables_overview.png)

1. **Table Heading**: The table heading uses the same style as the `label text`. The heading should express the content of each column.
2. **Table Row**: The row content uses `default text` style.
3. **Table Hover Action Button**: The table rows can imply further functionality when they are hovered over.

## Basic

In order to use the table, you need give `rows` and `columns` data to `KtTable` component.

<KtTable :rows="rows" :columns="columnsResponsive" />

`columns` define the column of the table, `label` is the header text of table, `key` will be used to find the value from `rows`.

*Update:* The use of `key` is deprecated use `prop` instead of `key` when defining columns

`rows` is an `Array` of `Object`s that represent a `row`.

*For better performance in complex operations*, define a `rowKey` to index each row with.

<ShowCase>

<div slot="vue">

```html
<KtTable :rows="rows" :columns="columns" />
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

</div>

<div slot="style">

```html
<table>
	<thead>
		<th>Name</th>
		<th>Date</th>
		<th>Address</th>
	</thead>
	<tbody>
		<tr>
			<td>Tom</td>
			<td>2016-05-03</td>
			<td>No. 119, Grove St, Los Angeles</td>
		</tr>
		<tr>
			<td>Jackson</td>
			<td>2016-05-02</td>
			<td>No. 89, Grove St, Los Angeles</td>
		</tr>
	</tbody>
</table>
```

</div>

</ShowCase>


## Declarative form

The `columns` property can be written as nested children of the table components using `<KtTableColumn />`.

All props that a column takes, the KtTableColumn component takes, as well, with the exception of `key`

`prop` is required

<KtTable :rows="rows" >
	<KtTableColumn label="Name" prop="name"/>
	<KtTableColumn label="Address" prop="address.line"/>
</KtTable>

```html
<KtTable :rows="rows" >
	<KtTableColumn label="Name" prop="name"/>
	<KtTableColumn label="Address" prop="address.line"/>
</KtTable>
```

```js
{
	rows: [
		{ date: '2016-05-03', name: 'Tom',     address: { number: 119, line: 'No. 119, Grove St, Los Angeles' } },
		{ date: '2016-05-02', name: 'Jackson', address: { number: 89, line: 'No. 89, Grove St, Los Angeles' } },
		{ date: '2016-05-04', name: 'Fen',     address: { number: 182, line: 'No. 182, Grove St, Los Angeles' } },
		{ date: '2016-05-01', name: 'Fexiang', address: { number: 189, line: 'No. 189, Grove St, Los Angeles' } },
	],
}
```

## Width

In most cases the table is the same width as its parent. You can also specify the column width in `columns`.

<KtTable :rows="rows" :columns="columnsWidth" />

```js
{
	columns: [
		{ prop: 'name',    label: 'Name',    width: '30%' },
		{ prop: 'date',    label: 'Date',    width: '20%' },
		{ prop: 'address.line', label: 'Address', width: '50%' },
	],
}
```

## Content alignment

Alignment would default to be `left`. It can be customized for common cases that require it, such as price, and currency.
`align` in `columns` decides the alignment of each column’s text.

<KtTable :rows="rows" :columns="columnsAlign" />

```js
{
	columns: [
		{ prop: 'name',    label: 'Name',    align: 'left' },
		{ prop: 'date',    label: 'Date',    align: 'center' },
		{ prop: 'address.line',    label: 'Address',    align: 'right' },
	],
}
```

## Responsive

When display space is limited, some less-important columns should be hidden.

`responsive` in `columns` has five breakpoints to make this easy to do.

<KtTable :rows="rows" :columns="columnsResponsive" />

```js
columns: [
	{ prop: 'name', label: 'Name', responsive: 'hide-sm' },
	{ prop: 'date', label: 'Date', responsive: 'hide-md' },
	{ prop: 'address.line', label: 'Address' },
],
```

## Horizontal Scrolling

When content should not be hidden, using horizontal scrolling is a better alternative.
`isScrollable` will enable horizontal scrolling for the table.

<KtTable :rows="rows2" :columns="columnsDefault" isScrollable />

```html
<KtTable :rows="rows" :columns="columns" isScrollable />
```

## Selectable

`isSelectable` enables mutilple-select option of the rows. You can bind an `Array` model to `KtTable` and control the selected data.

<div>
	<KtTable :rows="rows" :columns="columnsDefault" isSelectable v-model="select" />
	<span>Selected value: {{ select }}</span>
</div>


```html
<div>
	<KtTable :rows="rows" :columns="columns" isSelectable v-model="select" />
	<span>Selected value: {{ select }}</span>
</div>
```

```js
{
	data() {
		return {
			...objectFromBefore, // rows, and columns
			select: [0,1]
		}
	}
}
```

*Update:* The use of v-model is deprecated. Instead, bind the Array of selected to the `selected` property
> Note the difference between the Array model passed to the v-model and that passed to the selected property. 
> The former is an `Array` of selected indices, and the latter is an `Array` of _row_ `Object`s

<div>
	<KtTable :rows="rows" :columns="columnsDefault" isSelectable :selected="selected" />
	<pre>Selected Rows: {{JSON.stringify(selected,undefined, 2)}} </pre>
</div>

> Note that the use of a `JSON.stringify()` in a `<pre></pre>` tag is for readability purposes

```html
<div>
	<KtTable :rows="rows" :columns="columns" isSelectable :selected="selected" />
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

> While you can bind the selections with v-model, it is advised instead to listen to the `@selectionChange` event which publishes the current selected rows whenever they change

<div>
	<KtTable :rows="rows" :columns="columnsDefault" isSelectable @selectionChange="selectedRows = $event" />
	<pre>Selected value: {{ JSON.stringify(selectedRows, undefined, 2) }}</pre>
</div>

```html
<KtTable :rows="rows" :columns="columns" isSelectable @selectionChange="selectRows" />
```

```js
{
	data() {
		return {
			selectedRows: []
		}
	}
	methods: {
		selectRows(selectedRows) {
			this.selectedRows = selectedRows
		}
	}
}
```

## Disable

`disableRow` function can be passed to `KtTable` to reactively disable rows, based on your view and specific row data.

<KtInput v-model="disableName" />
<KtTable
	:rows="rows"
	:columns="columnsResponsive"
	:disableRow="disableRow"
	isSelectable
/>

```html
<KtInput v-model="disableName" />
<KtTable
	:rows="rows"
	:columns="columns"
	:disableRow="disableRow"
	isSelectable
/>
```

```js
{
	data() {
		return {
			disableName: 'F'
		}
	},
	methods: {
		disableRow({ row }) {
			/**
					When row.name is just an empty string, it will match everything,
					thus, disable all
			 */
			return row.name.includes(this.disableName)
		}
	}
}
```

## Row Interaction

`KtTable` has a `@rowClick` event for when a user clicks on a row. 

_Note:_ `@activateRow` is, however, the preferred alternative, because the latter gets triggered
on row click, _or_ when the user hits the "enter/return" key while row's focused, while the former gets triggered only with clicks.
Payload from `@activateRow` is (row, rowIndex)

_Note:_ Neither events get triggered on a _disabled_ row.

<KtInput v-model='disableName' />
<KtTable
	:rows="rows"
	:columns="columnsResponsive"
	:disableRow="disableRow"
	@activateRow="showAlertOnClickOrEnter"
/>

```html
<KtInput v-model='disableName' />
<KtTable
	:rows="rows"
	:columns="columns"
	:disableRow="disableRow"
	@activateRow="showAlertOnClickOrEnter"
/>
```

```js
methods: {
	showAlertOnClickOrEnter(row, rowIndex){
		alert(`${JSON.stringify(value)} is at index: ${model}!`)
	}
}
```

## Ordering Columns

You can order Columns, by dragging, if you use the `useColumnDragToOrder` flag

<KtTable :rows="rows" useColumnDragToOrder >
	<KtTableColumn
		label="Avatar"
		prop="name"
		:renderCell="renderCell"
	/>
	<KtTableColumn
		label="Date"
		prop="date"
		:formatter="formatDate"
	/>
	<KtTableColumn 
		label="Address" 
		prop="address.line" 
	/>
</KtTable>

```html
<KtTable :rows="rows" useColumnDragToOrder >
	<KtTableColumn
		label="Avatar"
		prop="name"
		:renderCell="renderCell"
	/>
	<KtTableColumn
		label="Date"
		prop="date"
		:formatter="formatDate"
	/>
	<KtTableColumn 
		label="Address" 
		prop="address.line" 
	/>
</KtTable>
```

## Sorting

To enable sorting, you must do BOTH the following:
* enable a UI-sorting flag `useQuickSortControl` 
* add `sortable` to any column definition (the ones to enable sorting for).

<KtTable :rows="rows" useQuickSortControl >
	<KtTableColumn label="Name" prop="name" sortable />
	<KtTableColumn label="Date" prop="date"/>
	<KtTableColumn label="Address" prop="address.line"/>
</KtTable>

```html
<KtTable :rows="rows" useQuickSortControl >
	<KtTableColumn label="Name" prop="name" sortable />
	<KtTableColumn label="Date" prop="date"/>
	<KtTableColumn label="Address" prop="address.line"/>
</KtTable>
```

If you want to allow sorting for all columns excluding one, you can set `sortable="all"` on the `<KtTable/>`

<KtTable :rows="rows" useQuickSortControl sortable="all">
	<KtTableColumn label="Name" prop="name"/>
	<KtTableColumn label="Date" prop="date"/>
	<KtTableColumn label="Address" prop="address.line" :sortable="false"/>
</KtTable>

```html
<KtTable :rows="rows" useQuickSortControl sortable="all">
	<KtTableColumn label="Name" prop="name"/>
	<KtTableColumn label="Date" prop="date"/>
	<KtTableColumn label="Address" prop="address.line" :sortable="false"/>
</KtTable>
```

> Note the `:sortable=false` on the "Address" column in the above example, as an exception to the `sortable=all`.

It's possible to customize your sorting experience by using the column's `sortMethod`, `sortBy` and `sortOrders`

<KtTable :rows="rows" useQuickSortControl sortable="all">
	<KtTableColumn label="Name" prop="name" :sortOrders="['descending', 'ascending', undefined]"/> 
	<KtTableColumn label="Date" prop="date" :sortMethod="sortDate" /> 
	<KtTableColumn label="Address" prop="address.line" :sortBy="['address.number', byAddressLine]"/> 
</KtTable>

```html
<KtTable :rows="rows" useQuickSortControl sortable="all">
	<KtTableColumn label="Name" prop="name" :sortOrders="['descending', 'ascending', undefined]"/>  <!-- On click, change the next sort order -->
	<KtTableColumn label="Date" prop="date" :sortMethod="sortDate" /> <!-- use custom compare function -->
	<KtTableColumn label="Address" prop="address.line" :sortBy="['address.number', byAddressLine]"/> <!-- target different props on the row  -->
</KtTable>
```

`sortOrders` determines the order by which sorting criteria changes with each click on the sorting buttons on the column headers. It can have one of three values: 
* `'descending'` OR `-1` 
* `'ascending'` OR `1`
* `undefined` OR `0` &rarr; which does not enforce any sorting, and thus, the rows are sorted according to their actual insertion in the bounded `rows` Object.

<hr/>

`sortBy` can take three types of arguments: 
* `String` &larr; path to any prop of the row
* `Function` &larr; that accepts the "row" and "rowIndex" as arguments
* `Array` of the above

```js
{
	methods: {
		sortDate(a, b) {
			return new Date(a) - new Date(b)
		},
		byAddressLine(row, index) {
			// get prop to sort by
			return row.address.line
		}
	}
}
```

We support sorting single or multiple columns at the same time (the UI for managing it has not _yet_ landed).
> By default, **`sortMultiple`** is set to **`false`** 

Sorting _resolution_ is handled the same way as sortBy for each column, i.e.: if the first prop used in comparison between two rows returns `0`, the next one is used until we resolve by actual array order

You can pass to KtTable an array of `sortedColumns` of the form `[{ prop, sortOrder }]`

You can also initialize the table to be already sorted, by setting the `sortOrder` prop for one of the columns: `<KtTableColumn :sortOrder="1" prop="name" />`


### Remote Sorting 

To sort remotly: 
1. Set the `sortRemote` flag on `<KtTable/>` which disables the local table sort function.

2. You can then listen to the `@sortChange` which returns:
>
> __sortedColumns__: an array of the sorted columns by priority. If `sortMultiple` is false, then it will allways contain one element.
>
> __column__: the column that was just sorted.
>
> __sortOrder__: the order the column is to be sorted to.
>
> __prop__: the prop to be sorted on that column
>
> __sortBy__: the value of sortBy on the column, which is useful in case you want to send the backend a different value than `column.prop`

3. You can, then, set the `sortedColumns` prop on the `<KtTable/>` to update the table UI, when your backend request is resolved.

```html
<KtTable :rows="rows" useQuickSortControl sortable="all" sortRemote @sortChange="sort">
	<KtTableColumn label="Name" prop="name" /> <!-- sortBy in this case is "name" since it is the `prop` -->
	<KtTableColumn label="Date" prop="date" sortBy="order_date" /> 
	<KtTableColumn label="Address" prop="address.line" sortBy="address_line"/> 
</KtTable>
```

```js
{
	methods: {
		async sort(sortedColumns) {
			const { sortBy, sortOrder } = sortedColumns;
			this.rows = await api.get(url, { params: { [sortBy]: sortOrder } })
		}
	}
}
```

## Actions

`actions` adds _hover_ actions to the table. You use the `slot="actions"` to define the actions template.
> You must use `slot-scope` prop for the `actions` slot for it to be detected.

<KtTable :rows="rows" :columns="columnsDefault">
	<template slot="actions" slot-scope="{ row }">
		<i class="yoco" @click="showAlert(row.name, 'edited')">edit</i>
		<i class="yoco" @click="showAlert(row.name, 'deleted')">trash</i>
	</template>
</KtTable>


```html
<KtTable :rows="rows" :columns="columns">
	<template slot="actions" slot-scope="{ row }">
		<i class="yoco" @click="showAlert(row.name, 'edited')">edit</i>
		<i class="yoco" @click="showAlert(row.name, 'deleted')">trash</i>
	</template>
</KtTable>
```

```html
<KtTable :rows="rows" :columns="columns">
	<template v-slot:actions="{ row }">
	<!-- as before  -->
	</template>
</KtTable>
```

```html
<KtTable :rows="rows" :columns="columns">
	<template #actions="{ row }">
	<!-- as before  -->
	</template>
</KtTable>
```


</template>

<script>
import KtBanner from '../../../packages/kotti-banner'
import KtAvatar from '../../../packages/kotti-avatar'
// import KtTable from '../../../packages/kotti-table'
import ShowCase from '../../components/ShowCase'

export default {
	name: 'Tables',
	components: { ShowCase },
	data() {
		return {
			select: [0, 1],
			selected: [
				{
					date: '2016-05-03',
					name: 'Tom',
					address: { number: 119, line: 'No. 119, Grove St, Los Angeles' },
				},
			],
			selectedRows: [],
			columnsDefault: [
				{ prop: 'name', label: 'Name' },
				{ prop: 'date', label: 'Date' },
			],
			columnsAlign: [
				{ prop: 'name', label: 'Name', align: 'left' },
				{ prop: 'date', label: 'Date', align: 'center' },
				{ prop: 'address.line', label: 'Address', align: 'right' },
			],
			columnsResponsive: [
				{ prop: 'name', label: 'Name', responsive: 'hide-sm' },
				{ prop: 'date', label: 'Date', responsive: 'hide-md' },
				{ prop: 'address.line', label: 'Address' },
			],
			columnsWidth: [
				{ prop: 'name', label: 'Name', width: '30%' },
				{ prop: 'date', label: 'Date', width: '20%' },
				{ prop: 'address.line', label: 'Address', width: '50%' },
			],
			rows2: [
				{
					date: '2016-05-03',
					name: 'Tom',
					address: { number: 119, line: 'No. 119, Grove St, Los Angeles' },
				},
			],
			rows: [
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
			],
			disableName: 'F',
		}
	},
	methods: {
		disableRow({ row }) {
			return row.name.includes(this.disableName)
		},
		showAlertOnClickOrEnter(row, rowIndex) {
			alert(`${JSON.stringify(row)} is at index: ${rowIndex}!`)
		},
		showAlert(value, model) {
			alert(`${value} is ${model}!`)
		},
		sortDate(a, b) {
			return new Date(a) - new Date(b)
		},
		byAddressLine(row) {
			// get prop to sort by
			return row.address.line
		},
		formatDate(value) {
			return new Date(value).toUTCString()
		},
		renderEmpty() {
			return <div>Hello</div>
		},
		renderLoading() {
			return <div>Loading while the loading prop on KtTable is true</div>
		},
		renderExpand(h, { row }) {
			return [
				<KtBanner message={'row.name'} icon="user" isGrey />,
				<KtBanner message={'row.address.line'} icon="global" isGrey />,
			]
		},
		renderActions(h, { row }) {
			return [
				<i class="yoco" onClick={() => this.showAlert(row.name, 'edited')}>
					edit
				</i>,
				<i class="yoco" onClick={() => this.showAlert(row.name, 'deleted')}>
					trash
				</i>,
			]
		},
		renderHeader(h, { value }) {
			return <div>{value}</div>
		},
		renderCell(h, { value }) {
			return (
				<KtAvatar
					name={value}
					hoverable
					src="https://picsum.photos/200"
					showTooltip
					small
					class="mr-16px"
				/>
			)
		},
	},
}
</script>
