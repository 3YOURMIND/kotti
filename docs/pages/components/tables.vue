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

## Align (Content)

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
			select: [0,1]
		}
	}
}
```

*Update:* The use of v-model is deprecated. Instead, bind the Array of selected to the `selected` property, and subscribe to @selectionChange, which returns the currently selected rows whenever they change
> Note the difference between the Array model passed to the v-model and that passed to the selected property. 
> The former is an `Array` of selected indices, and the latter is an `Array` of _row_ `Object`s

<div>
	<KtTable :rows="rows" :columns="columnsDefault" isSelectable :selected="selected" @selectionChange="selected = $event" />
	<pre>Selected Rows: {{JSON.stringify(selected,undefined, 2)}} </pre>
</div>

> Note that the use of a `JSON.stringify()` in a `<pre></pre>` tag is for readability purposes

```html
<div>
	<KtTable :rows="rows" :columns="columns" isSelectable :selected="selected" @selectionChange="((selection) => selected = selection)"/>
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
> Update: shorthand for v-slot is used now, instead.

<ShowCase vueSlotLabel="Actions Table" styleSlotLabel="html">
<div slot="vue">
<KtTable :rows="rows" :columns="columnsDefault">
	<template slot="actions" slot-scope="{ row, rowIndex }">
		<i class="yoco" @click="showAlert(row.name, 'edited')">edit</i>
		<i class="yoco" @click="showAlert(row.name, 'deleted')">trash</i>
	</template>
</KtTable>
</div>
<div slot="style">

```vue
<KtTable :rows="rows" :columns="columns">
<template slot="actions" slot-scope="{ row }">
	<i class="yoco" @click="showAlert(row.name, 'edited')">edit</i>
	<i class="yoco" @click="showAlert(row.name, 'deleted')">trash</i>
</template>
</KtTable>
```

</div>
</ShowCase>

_Update_: Preferably, since the above syntax is now deprecated, use [v-slot](https://vuejs.org/v2/guide/components-slots.html) 

<ShowCase vueSlotLabel="v-slot syntax" styleSlotLabel="shorthand">
<div slot="vue">

```html
<KtTable :rows="rows" :columns="columns">
<template v-slot:actions="{ row }">
	<!-- as before  -->
</template>
</KtTable>
```

</div>
<div slot="style">

```html
<KtTable :rows="rows" :columns="columns">
<template #actions="{ row }">
	<!-- as before  -->
</template>
</KtTable>
```

</div>
</ShowCase>

## Expandable

`isExpandable` enables expandability of the row**s**, defined on `<KtTable/>`. You use the `slot="expand"` to define the template that shows on expansion.

<ShowCase vueSlotLabel="Expandable Table" styleSlotLabel="html">
<div slot="vue">
<KtTable :rows="rows" :columns="columnsDefault" isExpandable>
<template #expand="{ row, rowIndex }">
	<KtBanner :message="row.name" icon="user" isGrey />
	<KtBanner :message="row.address.line" icon="global" isGrey />
</template>
</KtTable>
</div>


<div slot="style">

```html
<KtTable :rows="rows" :columns="columns" isExpandable>
<template #expand="{ row, rowIndex }">
	<KtBanner :message="row.name" icon="user" isGrey />
	<KtBanner :message="row.address.line" icon="global" isGrey />
</template>
</KtTable>
```

</div>
</ShowCase>

The default behavior only allows you to expand one row at a time; expanding one row would trigger any currently-expanded rows to shrink back.

If you want to allow for the expansion of multiple rows at a time, set the `expandMultiple` flag on `<KtTable />`, as well.

<ShowCase vueSlotLabel="Expandable Table" styleSlotLabel="html">
<div slot="vue">
<KtTable :rows="rows" :columns="columnsDefault" isExpandable expandMultiple>
<template #expand="{ row, rowIndex }">
	<KtBanner :message="row.name" icon="user" isGrey />
	<KtBanner :message="row.address.line" icon="global" isGrey />
</template>
</KtTable>
</div>
<div slot="style">

```vue
<KtTable :rows="rows" :columns="columns" isExpandable expandMultiple>
<template #expand="{ row, rowIndex }">
	<KtBanner :message="row.name" icon="user" isGrey />
	<KtBanner :message="row.address.line" icon="global" isGrey />
</template>
</KtTable>
```

</div>
</ShowCase>

## Custom Render

It is possible to customize parts (columns) of the table by passing your own render-prop functions instead of using slots.

`<KtTable />` supports the following render props:  
* `renderEmpty` &rarr; to define a custom rendered component when the table is empty, i.e., `:rows=[]`. `slot='empty'` can be used instead.
* `renderLoading` &rarr; for when the `rows` are still loading (e.g., backend-api call has not resolved yet). `slot='loading'` can be used to render a template, instead.
> Note there is a `loading` Boolean flag, and when set to true, will render whatever is passed to `renderLoading` inside the table body. 
> if no `renderLoading` function is passed, it defaults to a buffer, still. 
* `renderExpand` &rarr; alternative to the `expand` slot.
* `renderActions` &rarr; alternative to the `actions` slot.


`<KtTableColumn />` supports the following render props: 
* `formatter` &rarr; which applies formatting to the cell (somewhat similar to what you would consider as a `computed`)
* `renderHeader` &rarr; custom render fn, to render a custom element in the header of the column. Instead you can use, slot='header'
* `renderCell` &rarr; custom render fn, to render a custom element in the cells of the column. Instead use a default slot. 

<ShowCase vueSlotLabel="Custom Render Table" styleSlotLabel="html">
<div slot="vue" >
	<KtTable
		:rows="rows"
		:renderExpand="renderExpand"
		expandMultiple
		:renderActions="renderActions"
	>
		<KtTableColumn
			label="Name"
			prop="name"
			:renderHeader="renderHeader"
			:renderCell="renderCell"
		/>
		<KtTableColumn
			label="Date"
			prop="date"
			:formatter="formatDate"
		/>
	</KtTable>
</div>

<div slot="style">

```html
<KtTable
	:rows="rows"
	:renderExpand="renderExpand"
	expandMultiple
	:renderActions="renderActions"
>
	<KtTableColumn
		label="Name"
		prop="name"
		:renderHeader="renderHeader"
		:renderCell="renderCell"
	/>
	<KtTableColumn
		label="Date"
		prop="date"
		:formatter="formatDate"
	/>
</KtTable>
```

</div>
</ShowCase>


```jsx
{
	methods: {
		formatDate(value, row, column, columnIndex, rowIndex) {
			return new Date(value).toUTCString()
		},
		renderExpand(h, { row }) {
			return (
				<div>
					<KtBanner message={row.name} icon="user" isGrey />
					<KtBanner message={row.address.line} icon="global" isGrey />
				</div>
			)
		},
		showAlert(model, value) {
			alert(`${model} is ${value}!`)
		},
		renderActions(h, { row }) {
			const onEditClick = () => this.showAlert(row.name, 'edited')
			const onDeleteClick = () => this.showAlert(row.name, 'deleted')
			
			return (
				<div>
					<i class="yoco" onClick={onEditClick}>edit</i>
					<i class="yoco" onClick={onDeleteClick}>trash</i>
				</div>
			)
		},
		renderHeader(h, { value, column, columnIndex }) {
			return <div>{value}</div>
		},
		renderCell(h, { value, row, rowIndex, column, columnIndex }) {
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
	}
}
```

<ShowCase vueSlotLabel="Custom Loading" styleSlotLabel="html">
<div slot="vue">
	<KtTable
		:rows="rows"
		:renderLoading="renderLoading"
		:loading="true"
		>
		<KtTableColumn
			label="Name"
			prop="name"
		/>
		<KtTableColumn
			label="Date"
			prop="date"
		/>
	</KtTable>
</div>

<div slot="style">
	
```html
<KtTable
	:rows="rows"
	:renderLoading="renderLoading"
	:loading="true"
>
	<KtTableColumn
		label="Name"
		prop="name"
	/>
	<KtTableColumn
		label="Date"
		prop="date"
	/>
</KtTable>
```

</div>
</ShowCase>

<ShowCase vueSlotLabel="Empty Table" styleSlotLabel="html">
<div slot="vue">
<KtTable
	:rows="[]"
	:renderEmpty="renderEmpty"
>
	<KtTableColumn
		label="Name"
		prop="name"
	/>
	<KtTableColumn
		label="Date"
		prop="date"
	/>
</KtTable>
</div>

<div slot="style">

```html
<KtTable
	:rows="[]"
	:renderEmpty="renderEmpty"
>
	<KtTableColumn
		label="Name"
		prop="name"
	/>
	<KtTableColumn
		label="Date"
		prop="date"
	/>
</KtTable>
```

</div>
</ShowCase>

```js
renderLoading() {
	return <div>Loading while the loading prop on KtTable is true</div>
},
renderEmpty() {
	return <div>Hello</div>
},
```

You can also use slots instead of render props. [`slot="loading"`, `slot="empty"`, `slot="header"`, `slot="default"`].

<ShowCase vueSlotLabel="Loading Slot" styleSlotLabel="html">
<div slot="vue">
<KtTable :rows="rows" :columns="columnsDefault" :loading="true">
	<div slot="loading">
		Loading while the loading prop on KtTable is true
	</div>
</KtTable>	
</div>

<div slot="style">

```html
<KtTable :rows="rows" :columns="columnsDefault" :loading="true">
	<div slot="loading">
		Loading while the loading prop on KtTable is true
	</div>
</KtTable>
```

</div>
</ShowCase>

<ShowCase vueSlotLabel="Empty Slot" styleSlotLabel="html">
<div slot="vue">
<KtTable :rows="emptyRows" :columns="columnsDefault">
	<div slot="empty">
		Hello, Empty World!
	</div>
</KtTable>
</div>

<div slot="style">

```html
<KtTable :rows="emptyRows" :columns="columns">
	<div slot="empty">
		Hello, Empty World!
	</div>
</KtTable>
```

</div>
</ShowCase>

<ShowCase vueSlotLabel="header/default slots" styleSlotLabel="html">
<div slot="vue">
<KtTable :rows="rows">
<KtTableColumn
	label="Name"
	prop="name"
>
<template #header="{ value, columnIndex }">
	<div v-text="columnIndex + '::' + value" />
</template>
<template #default="{value, row, rowIndex, column, columnIndex}">
	<KtAvatar
		:name="value"
		hoverable
		src="https://picsum.photos/200"
		showTooltip
		small
		class="mr-16px"
	/>
</template>
</KtTableColumn>
</KtTable>

</div>
<div slot="style">

```html
<KtTable :rows="rows">
<KtTableColumn
	label="Name"
	prop="name"
>
<template #header="{ value, columnIndex }">
	<div v-text="columnIndex + '::' + value" />
</template>
<!-- if you use deprecated slot syntax, you don't need to define slot name for a default slot (this replaces renderCell) -->
<template #default="{value, row, rowIndex, column, columnIndex}">
	<KtAvatar
		:name="value"
		hoverable
		src="https://picsum.photos/200"
		showTooltip
		small
		class="mr-16px"
	/>
</template>
</KtTableColumn>
</KtTable>
```

</div>
</ShowCase>

### Provider/Consumer and Mixin

Sometimes you may need to access the table's store and control it from outside.
While `ref` may work if your modifications are in the _same_ component, your controller component may be elsewhere.

For that purpose, we introduce `KtTableProvider`/`KtTableConsumer`. The provider exposes the `store`, from which you can access many props from the store. 
It also directly exposes `columns`, `filteredColumns`, `sortedColumns`, `hiddenColumns`, for faster accesss, and methods: `hideColumn`, `showAllColumns`, `orderBeforeColumn`.

`<KtTableProvider />` takes the same props as `<KtTable/>`.

`<KtTable />` can have an optional `id` prop that will allow the corresponding `<KtTableConsumer />` to select the same `id`.
Otherwise, all tables **under** the same provider will share the same store.

_Notes_:
* `hideColumn(column, toggleTo)` &rarr; takes the column to be hidden and the _negation_ of its _current_ `hidden` prop (i.e. If it's already hidden, toggle will be set hidden to `false` and vice-versa)
* `showAllColumns()` &rarr; takes no arguments and sets `hidden` prop to false on all columns
* `orderBeforeColumn(fromIndex, to Index)` &rarr; used when `useColumnDragToOrder` flag is true. Takes the column index we're dragging from, and the index of the column before the one we're dragging to.

> There’s also the _deprecated_ `KtTableColumnsStateMixin`.

<ShowCase vueSlotLabel="Consumer/Provider Table" styleSlotLabel="html">
<div slot="vue">
<KtTableProvider>
	<div>
		<KtTableConsumer #default="{ columns, hideColumn, showAllColumns }">
			<div class="parts-edit-columns-filter__container">
				<KtButtonGroup style="margin-top: 20px;">
						<KtButton
							v-for="column in columns"
							:key="column.prop"
							:label="`${column.hidden? 'Show ':'Hide '} ${column.label || column.prop}`"
							:type="column.hidden ? 'text' : 'primary'"
							@click="hideColumn(column, !column.hidden)"
						/>
				</KtButtonGroup>
				<KtButton :disabled="columns.filter(c=> c.hidden).length === 0" type="primary" label="Show All Columns" @click="showAllColumns"/>
			</div>
		</KtTableConsumer>
		<KtTableConsumer #default="{ columns, orderBeforeColumn }">
			<div>
				<KtInput label="Drag From: " type="number" min="0" :max="columns.length-1" v-model="fromIndex" />
				<KtInput label="(+-)Steps: " type="number" :min="fromIndex===0?0:-fromIndex" :max="(columns.length -2 - fromIndex)" v-model="dragSteps" />
				<KtButton type="primary" label="Reorder Columns" :disabled="parseInt(dragSteps,10)===0" @click="orderBeforeColumn( columns[parseInt(fromIndex, 10)], columns[parseInt(toIndex, 10)] )" />
			</div>
		</KtTableConsumer>
	</div>
	<div>
		<KtTable :rows="rows" :columns="columnsResponsive" useColumnDragToOrder/>
	</div>
</KtTableProvider>
</div>
<div slot="style">

```html
<KtTableProvider>
	<div>
		<KtTableConsumer #default="{ columns, hideColumn, showAllColumns }">
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
				<KtButton :disabled="columns.filter(c=> c.hidden).length === 0" type="primary" label="Show All Columns" @click="showAllColumns"/>
			</div>
		</KtTableConsumer>
		<KtTableConsumer #default="{ columns, orderBeforeColumn }">
			<div>
				<KtInput label="Drag From: " type="number" min="0" :max="columns.length-1" v-model="fromIndex" />
				<KtInput label="(+-)Steps: " type="number" :min="fromIndex===0?0:-fromIndex" :max="(columns.length -2 - fromIndex)" v-model="dragSteps" />
				<KtButton type="primary" label="Reorder Columns" :disabled="parseInt(dragSteps,10)===0" @click="orderBeforeColumn( columns[parseInt(fromIndex, 10)], columns[parseInt(toIndex, 10)] )" />
			</div>
		</KtTableConsumer>
	</div>
	<div>
		<KtTable :rows="rows" :columns="columnsResponsive" useColumnDragToOrder/>
	</div>
</KtTableProvider>
```

</div>
</ShowCase>

```js
{
	data(){
		return 	{
			fromIndex: 0,
			dragSteps: 0
		}
	},
	computed: {
		toIndex() {
			const parsedFrom = parseInt(this.fromIndex, 10)
			const parsedSteps = parseInt(this.dragSteps, 10)

			return parsedFrom + parsedSteps + (parsedSteps > 0 ? 1 : 0)
		},
	},
}
```

_Note:_
The above code for `orderBeforeColumn` function, is meant to map the UI drag/drop behavior, exactly. Currently, you can only drag a column to any position, except to the last column (i.e. if you want to move a column to the end of the table, you have to drag it to before-the-last column, then drag the last column one step to the left to achieve this.). Currently, the implementation for the dragging behavior is done in such a way, but the feature may be added in the future.

<hr />

## Usage

### Table Attributes

|        Attribute         |                             Description                             |            Type             |    Accepted values    | Default |
| :----------------------- | :------------------------------------------------------------------ | :-------------------------- | :-------------------- | :------ |
| `rows` (required)        | table row data                                                      | `Array`                     | —                     | —       |
| `id`                     | for when using nested providers                                     | `String`                    | —                     | null    |
| `rowKey`                 | the row prop used for the rows key                                  | `String`                    | —                     | —       |
| `columns`                | table column information                                            | `Array`                     | —                     | —       |
| `emptyText`              | text to show when table is empty                                    | `String`                    | —                     | —       |
| `loading`                | flag to toggle loading state.                                       | `Boolean`                   | —                     | `false` |
| `expandMultiple`         | allow for expanding multiple rows at once                           | `Boolean`                   | —                     | `false` |
| `isInteractive`          | allow clicking/keyboard focusing table rows                         | `Boolean`                   | —                     | `false` |
| `isScrollable`           | allow horizontal table scrolling                                    | `Boolean`                   | —                     | `false` |
| `isSelectable`           | enable `select` option of table                                     | `Boolean`                   | —                     | `false` |
| `sortable`               | enable sorting for all columns                                      | `Boolean`, `String`         | "all"                 | `false` |
| `sortMultiple`           | retain sort priority across multiple columns                        | `Boolean`                   | -                     | `false` |
| `remoteSort`             | UI is enabled but table will not sort; but only publish @sortChange | `Boolean`                   | -                     | `false` |
| `useColumnDragToOrder`   | enable dragging columns to change their order                       | `Boolean`                   | -                     | `false` |
| `useQuickSortControl`    | enable toggle sort by column click UI (arrow keys)                  | `Boolean`                   | -                     | `false` |
| `useColumnsStateControl` | still not available. Enable UI for managing columns state           | `Boolean`                   | -                     | `false` |
| `sortedColumns`          | prop for changing sorted columns                                    | `Array`                     | [{ prop, sortOrder }] | `[]`    |
| `hiddenColumns`          | prop for changing hidden columns                                    | `Array`                     | [{ prop, hidden }]    | `[]`    |
| `filterdColumns`         | prop for changing filterd columns                                   | `Array`                     | [{ prop, filter }]    | `[]`    |
| `tdClasses`              | classes to apply to all `<td />` elements                           | `Array`, `String`, `Object` | `"responsive"`        | `[]`    |
| `thClasses`              | classes to apply to all `<th />` elements                           | `Array`, `String`, `Object` | `"responsive"`        | `[]`    |
| `trClasses`              | classes to apply to all `<tr />` elements                           | `Array`, `String`, `Object` | `"responsive"`        | `[]`    |
| `selected`               | prop for rows that are selected, as returned by @selectionChange    | `Array`                     | —                     | —       |
| `value`                  | deprecated; used when v-model was used instead of `selected`        | `Array`                     | —                     | —       |
| `maxHeight`              | —                                                                   | `String`                    | `10%`, `100px`        | —       |
| `height`                 | —                                                                   | `String`                    | `10%`, `100px`        | —       |
| `disableRow`             | disable some rows if the function is true                           | `Function`                  | —                     | —       |
| `renderEmpty`            | render prop for `emptyText` prop, when rows are empty               | `Function`                  | —                     | —       |
| `renderLoading`          | render prop for `loading`                                           | `Function`                  | —                     | —       |
| `renderExpand`           | render prop for `expand`                                            | `Function`                  | —                     | —       |
| `renderActions`          | render prop for row `actions`                                       | `Function`                  | —                     | —       |

### Column Attributes

|     Attribute      |                                  Description                                   |            Type             |              Accepted values               |              Default              |
| :----------------- | :----------------------------------------------------------------------------- | :-------------------------- | :----------------------------------------- | :-------------------------------- |
| `prop`  (required) | used to match the value in `rows` can be a dot path                            | `String` `String.String`    | —                                          | —                                 |
| `align`            | alignment of column text                                                       | `String`                    | `"center"`, `"left"`, `"right"`            | `left`                            |
| `key`              | deprecated. Is transalted to `prop`, instead                                   | `String`                    | —                                          | —                                 |
| `label`            | table column header value                                                      | `String`                    | —                                          | —                                 |
| `responsive`       | control responsive display  (this doesn't seem to work )                       | `String`                    | —                                          | —                                 |
| `width`            | width of the column within table. When using %, must add up to `100%`          | `String`                    | `10%`, `100px`                             | `auto`                            |
| `maxWidth`         | currently not used                                                             | String                      | `10%`, `100px`                             | -                                 |
| `hidden`           | does not render this collumn if true                                           | Boolean                     | false                                      |                                   |
| `sortable`         | whether this column is sortable or not                                         | [Boolean, undefined]        | true, false, undefined                     | -                                 |
| `sortOrder`        | the current sort order of the column                                           | [Number, String]            | "ascending", "descending", null            | null                              |
| `sortOrders`       | order to toggle sort                                                           | Array                       | -                                          | ["ascending", "descending", null] |
| `sortMethod`       | custom sort method ignores sortBy                                              | Function                    | -                                          | -                                 |
| `sortBy`           | compare function to sort by                                                    | String, Function, Array     | path string, function or array of previous | column.prop                       |
| `disableRowClick`  | stop row click from bubbling up when clicking on cell                          | Boolean                     | -                                          |                                   |
| `default`          | if cell value is undefined, use default. Does not work if you use custom render| Function, String            | -                                          | -                                 |
| `formatter`        | formats value before passing it to cell                                        | Function                    | -                                          |                                   |
| `renderHeader`     | render function to custom render header cell                                   | Function                    | -                                          |                                   |
| `renderCell`       | render function to custom render table cell                                    | Function                    | -                                          |                                   |
| `renderContext`    | object you can use to pass extra data to all render functions                  | Object                      | -                                          |                                   |
| `order`            | number to sort columns from left to right by                                   | Number                      | -                                          |                                   |
| `thClass`          | classes to this column's header to `<td />` elements                           | `Array`, `String`, `Object` | `"responsive"`                             | `[]`                              |
| `tdClass`          | classes to this column's to `<td />` elements                                  | `Array`, `String`, `Object` | `"responsive"`                             | `[]`                              |
| `headerCellClass`  | classes to this column's to `.kt-table__header-cell` elements                  | `Array`, `String`, `Object` | `"responsive"`                             | `[]`                              |
| `cellClass`        | classes to this column's to `.kt-table__cell` elements                         | `Array`, `String`, `Object` | `"responsive"`                             | `[]`                              |


#### Consumer Attributes

| Attribute |           Description            |   Type   | Accepted values | Default |
| :-------- | :------------------------------- | :------- | :-------------- | :------ |
| `id`      | for when using nested providers  | `String` | —               | null    |


### Events

#### Column Events

|      Event Name      |                       Arguments                       |                             Description                             |
| :------------------- | :---------------------------------------------------- | :------------------------------------------------------------------ |
| `@activateRow`       | `(row, index)`                                        | Row was clicked or activated via keyboard.                          |
| `@rowClick`          | `(row, index)`                                        | Row was clicked                                                     |
| `@rowFocus`          | `(row, index)`                                        | Row was in focus Requires setting `isInteractive` or `@activateRow` |
| `@expandChange`      | `(selection)`                                         | Row was blured Requires setting `isInteractive` or `@activateRow`   |
| `@expand`            | `(selection)`                                         | Row was expanded                                                    |
| `@selectionChange`   | `(selection)`                                         | selection changed                                                   |
| `@selectAll`         | `(selection)`                                         | all selection checkbox was toggled                                  |
| `@select`            | `(selection, row)`                                    | a row was selected                                                  |
| `@sortChange`        | `({ sortedColumns, column, prop, sortOrder, sortBy})` | a column was sorted                                                 |
| `@columnOrderChange` | `([column])`                                          | array of columns with updated order                                 |

#### Cell Events

|  Event Name  |                     Arguments                     |    Description     |
| :----------- | :------------------------------------------------ | :----------------- |
| `@cellClick` | `({ value, column, row, columnIndex, rowIndex })` | a cell was clicked | 
> It triggers @rowClick, unless bubbling up is disabled by setting `disableRowClick` to true


### Slots

#### Table Slots

| Slot Name |             Description             |          Scope           |
| :-------- | :---------------------------------- | :----------------------- |
| `empty`   | what to render when no data         | --                       |
| `loading` | what to render when loading is true | --                       |
| `actions` | action section of each row          | `{value, row, rowIndex } |
| `expand`  | expand section of each row          | `{value, row, rowIndex } |

#### Column Slots

| Slot Name |     Description      |                     Scope                     |
| :-------- | :------------------- | :-------------------------------------------- |
| `header`  | render in table row  | `{value, row, rowIndex }`                     |
| `default` | render in table cell | `{value, row, rowIndex, column, columnIndex}` |

#### Consumer Slots

| Slot Name |                Description                |                                                      Scope                                                       |
| :-------- | :---------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `default` | provide a table's store and other methods | `{store, columns, hiddenColumns, sortedColumns, filteredColumns, hideColumn, showAllColumns, orderBeforeColumn}` |

</template>

<script>
import KtBanner from '../../../packages/kotti-banner'
import KtAvatar from '../../../packages/kotti-avatar'
import ShowCase from '../../components/ShowCase'
import deepEql from 'deep-eql'

export default {
	name: 'Tables',
	components: { KtBanner, ShowCase },
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
			emptyRows: [],
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
			fromIndex: 0,
			dragSteps: 0,
		}
	},
	computed: {
		toIndex() {
			const parsedFrom = parseInt(this.fromIndex, 10)
			const parsedSteps = parseInt(this.dragSteps, 10)

			return parsedFrom + parsedSteps + (parsedSteps > 0 ? 1 : 0)
		},
	},
	methods: {
		disableRow({ row }) {
			return row.name.includes(this.disableName)
		},
		showAlertOnClickOrEnter(row, rowIndex) {
			alert(`${JSON.stringify(row)} is at index: ${rowIndex}!`)
		},
		showAlert(model, value) {
			alert(`${model} is ${value}!`)
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
			return (
				<div>
					<KtBanner message={row.name} icon="user" isGrey />
					<KtBanner message={row.address.line} icon="global" isGrey />
				</div>
			)
		},
		renderActions(h, { row }) {
			return (
				<div>
					<i class="yoco" onClick={() => this.showAlert(row.name, 'edited')}>
						edit
					</i>
					<i class="yoco" onClick={() => this.showAlert(row.name, 'deleted')}>
						trash
					</i>
				</div>
			)
		},
		showAlterCallBack(name, text) {
			return () => this.showAlert(name, text)
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
