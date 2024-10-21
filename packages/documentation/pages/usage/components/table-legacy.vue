<template lang="md">
<ComponentInfo v-bind="{ component }" />

## Elements

![Table Elements](~/assets/img/tables_overview.png)

1. **Table Heading**: The table heading uses the same style as the `label text`. The heading should express the content of each column.
2. **Table Row**: The row content uses `default text` style.
3. **Table Hover Action Button**: The table rows can imply further functionality when they are hovered over.

<ClientOnly>
<KtTable />
</ClientOnly>

## Basic

In order to use the table, you need give `rows` and `columns` data to `KtTableLegacy` component.

<KtTableLegacy :rows="rows" :columns="columnsResponsive" />

`columns` define the column of the table, `label` is the header text of table, `key` will be used to find the value from `rows`.

_Update:_ The use of `key` is deprecated use `prop` instead of `key` when defining columns

`rows` is an `Array` of `Object`s that represent a `row`.

_For better performance in complex operations_, define a `rowKey` to index each row with.

<CodePreview>

<div slot="vue">

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

</CodePreview>

## Declarative form

The `columns` property can be written as nested children of the table components using `<KtTableLegacyColumn />`.

All props that a column takes, the KtTableLegacyColumn component takes, as well, with the exception of `key`

`prop` is required

<KtTableLegacy :rows="rows" >
	<KtTableLegacyColumn label="Name" prop="name"/>
	<KtTableLegacyColumn label="Address" prop="address.line"/>
</KtTableLegacy>

```html
<KtTableLegacy :rows="rows">
	<KtTableLegacyColumn label="Name" prop="name" />
	<KtTableLegacyColumn label="Address" prop="address.line" />
</KtTableLegacy>
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

<KtTableLegacy :rows="rows" :columns="columnsWidth" />

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

<KtTableLegacy :rows="rows" :columns="columnsAlign" />

```js
{
	columns: [
		{ prop: 'name',    label: 'Name',    align: 'left' },
		{ prop: 'date',    label: 'Date',    align: 'center' },
		{ prop: 'address.line',    label: 'Address',    align: 'right' },
	],
}
```

## Horizontal Scrolling

When content should not be hidden, using horizontal scrolling is a better alternative.
`isScrollable` will enable horizontal scrolling for the table.

<div style="max-width: 300px; padding: 10px; border: 1px dashed var(--ui-03);">
    <KtTableLegacy :rows="rows2" :columns="columnsScrollable" isScrollable />
</div>

```html
<KtTableLegacy :rows="rows" :columns="columns" isScrollable />
```

## Selectable

`isSelectable` enables mutilple-select option of the rows.

_Note:_ The use of v-model is _REMOVED_. Instead, bind the Array of selected to the `selected` property, and subscribe to `@selectionChange`, which returns the currently selected rows whenever they change

> Note the difference between the Array model passed to the v-model (now, removed) and that passed to the selected property.
> The former is an `Array` of selected indices, and the latter is an `Array` of _row_ `Object`s

<div class="container">
	<KtTableLegacy :rows="rows" :columns="columnsDefault" isSelectable :selected="selected" @selectionChange="selected = $event" />
	<div class="container__buttons-row">
		<KtButton :disabled="selected.length === rows.length" type="primary" label="Select All Rows" @click="setSelectedRows(rows)"/>
		<KtButton :disabled="selected.length === 0" type="primary" label="Clear Row Selection" @click="setSelectedRows([])"/>
	</div>
	<pre>Selected Rows: {{JSON.stringify(selected, undefined, 2)}} </pre>
</div>

> Note that the use of a `JSON.stringify()` in a `<pre></pre>` tag is for readability purposes

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

## Disable

`disableRow` function can be passed to `KtTableLegacy` to reactively disable rows, based on your view and specific row data.

<KtFieldText v-model="disableName" />
<KtTableLegacy
	:rows="rows"
	:columns="columnsResponsive"
	:disableRow="disableRow"
	isSelectable
/>

```html
<KtFieldText v-model="disableName" />
<KtTableLegacy
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

`KtTableLegacy` has a `@rowClick` event for when a user clicks on a row.

_Note:_ `@activateRow` is, however, the preferred alternative, because the latter gets triggered
on row click, _or_ when the user hits the "enter/return" key while row's focused, while the former gets triggered only with clicks.
Payload from `@activateRow` is (row, rowIndex)

_Note:_ Neither events get triggered on a _disabled_ row.

<KtFieldText v-model='disableName' />
<KtTableLegacy
	:rows="rows"
	:columns="columnsResponsive"
	:disableRow="disableRow"
	@activateRow="showAlertOnClickOrEnter"
/>

```html
<KtFieldText v-model="disableName" />
<KtTableLegacy
	:rows="rows"
	:columns="columns"
	:disableRow="disableRow"
	@activateRow="showAlertOnClickOrEnter"
/>
```

```js
methods: {
	showAlertOnClickOrEnter(row, rowIndex) {
		alert(`${JSON.stringify(value)} is at index: ${model}!`)
	}
}
```

## Ordering Columns

You can order Columns, by dragging, if you use the `useColumnDragToOrder` flag

<KtTableLegacy :rows="rows" useColumnDragToOrder >
	<KtTableLegacyColumn
		label="Avatar"
		prop="name"
		:renderCell="renderCell"
	/>
	<KtTableLegacyColumn
		label="Date"
		prop="date"
		:formatter="formatDate"
	/>
	<KtTableLegacyColumn
		label="Address"
		prop="address.line"
	/>
</KtTableLegacy>

```html
<KtTableLegacy :rows="rows" useColumnDragToOrder>
	<KtTableLegacyColumn label="Avatar" prop="name" :renderCell="renderCell" />
	<KtTableLegacyColumn label="Date" prop="date" :formatter="formatDate" />
	<KtTableLegacyColumn label="Address" prop="address.line" />
</KtTableLegacy>
```

## Sorting

To enable sorting, you must do BOTH the following:

- enable a UI-sorting flag `useQuickSortControl`
- add `sortable` to any column definition (the ones to enable sorting for).

<KtTableLegacy :rows="rows" useQuickSortControl >
	<KtTableLegacyColumn label="Name" prop="name" sortable />
	<KtTableLegacyColumn label="Date" prop="date"/>
	<KtTableLegacyColumn label="Address" prop="address.line"/>
</KtTableLegacy>

```html
<KtTableLegacy :rows="rows" useQuickSortControl>
	<KtTableLegacyColumn label="Name" prop="name" sortable />
	<KtTableLegacyColumn label="Date" prop="date" />
	<KtTableLegacyColumn label="Address" prop="address.line" />
</KtTableLegacy>
```

If you want to allow sorting for all columns excluding one, you can set `sortable="all"` on the `<KtTableLegacy/>`

<KtTableLegacy :rows="rows" useQuickSortControl sortable="all">
	<KtTableLegacyColumn label="Name" prop="name"/>
	<KtTableLegacyColumn label="Date" prop="date"/>
	<KtTableLegacyColumn label="Address" prop="address.line" :sortable="false"/>
</KtTableLegacy>

```html
<KtTableLegacy :rows="rows" useQuickSortControl sortable="all">
	<KtTableLegacyColumn label="Name" prop="name" />
	<KtTableLegacyColumn label="Date" prop="date" />
	<KtTableLegacyColumn label="Address" prop="address.line" :sortable="false" />
</KtTableLegacy>
```

> Note the `:sortable=false` on the "Address" column in the above example, as an exception to the `sortable=all`.

It's possible to customize your sorting experience by using the column's `sortMethod`, `sortBy` and `sortOrders`

<KtTableLegacy :rows="rows" useQuickSortControl sortable="all">
	<KtTableLegacyColumn label="Name" prop="name" :sortOrders="['descending', 'ascending', undefined]"/>
	<KtTableLegacyColumn label="Date" prop="date" :sortMethod="sortDate" />
	<KtTableLegacyColumn label="Address" prop="address.line" :sortBy="['address.number', byAddressLine]"/>
</KtTableLegacy>

```html
<KtTableLegacy :rows="rows" useQuickSortControl sortable="all">
	<KtTableLegacyColumn
		label="Name"
		prop="name"
		:sortOrders="['descending', 'ascending', undefined]"
	/>
	<!-- On click, change the next sort order -->
	<KtTableLegacyColumn label="Date" prop="date" :sortMethod="sortDate" />
	<!-- use custom compare function -->
	<KtTableLegacyColumn
		label="Address"
		prop="address.line"
		:sortBy="['address.number', byAddressLine]"
	/>
	<!-- target different props on the row  -->
</KtTableLegacy>
```

`sortOrders` determines the order by which sorting criteria changes with each click on the sorting buttons on the column headers. It can have one of three values:

- `'descending'` OR `-1`
- `'ascending'` OR `1`
- `undefined` OR `0` &rarr; which does not enforce any sorting, and thus, the rows are sorted according to their actual insertion in the bounded `rows` Object.

<hr/>

`sortBy` can take three types of arguments:

- `String` &larr; path to any prop of the row
- `Function` &larr; that accepts the "row" and "rowIndex" as arguments
- `Array` of the above

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

Sorting _resolution_ is handled the same way as sortBy for each column, i.e.: if the first prop used in comparison between two rows returns `0`, the next one is used until we resolve by actual array order

You can pass to KtTableLegacy an array of `sortedColumns` of the form `[{ prop, sortOrder }]`

You can also initialize the table to be already sorted, by setting the `sortOrder` prop for one of the columns: `<KtTableLegacyColumn :sortOrder="1" prop="name" />`

### Remote Sorting

To sort remotly:

1. Set the `remoteSort` flag on `<KtTableLegacy/>` which disables the local table sort function.

2. You can then listen to the `@sortChange` which returns:

   > **sortedColumns**: an array of the sorted columns by priority. If `sortMultiple` is false, then it will allways contain one element.
   >
   > **column**: the column that was just sorted.
   >
   > **sortOrder**: the order the column is to be sorted to.
   >
   > **prop**: the prop to be sorted on that column
   >
   > **sortBy**: the value of sortBy on the column, which is useful in case you want to send the backend a different value than `column.prop`

3. You can, then, set the `sortedColumns` prop on the `<KtTableLegacy/>` to update the table UI, when your backend request is resolved.

```html
<KtTableLegacy
	:rows="rows"
	useQuickSortControl
	sortable="all"
	remoteSort
	@sortChange="sort"
>
	<KtTableLegacyColumn label="Name" prop="name" />
	<!-- sortBy in this case is "name" since it is the `prop` -->
	<KtTableLegacyColumn label="Date" prop="date" sortBy="order_date" />
	<KtTableLegacyColumn
		label="Address"
		prop="address.line"
		sortBy="address_line"
	/>
</KtTableLegacy>
```

```js
{
	methods: {
		async sort(sortChangeEvent) {
			const { sortBy, sortOrder } = sortChangeEvent;
			this.rows = await api.get(url, { params: { [sortBy]: sortOrder } })
		}
	}
}
```

## Actions

`actions` adds _hover_ actions to the table. You use the `slot="actions"` to define the actions template.

> You must use `slot-scope` prop for the `actions` slot for it to be detected.
> Update: shorthand for v-slot is used now, instead.

<CodePreview vueSlotLabel="Actions Table" styleSlotLabel="html">
<div slot="vue">
<KtTableLegacy :rows="rows" :columns="columnsDefault">
	<div slot="actions" slot-scope="{row, rowIndex}">
		<i class="yoco" @click="showAlert(row.name, 'edited')">edit</i>
		<i class="yoco" @click="showAlert(row.name, 'deleted')">trash</i>
	</div>
</KtTableLegacy>
</div>
<div slot="style">

```vue
<KtTableLegacy :rows="rows" :columns="columns">
<div slot="actions" slot-scope="{ row }">
	<i class="yoco" @click="showAlert(row.name, 'edited')">edit</i>
	<i class="yoco" @click="showAlert(row.name, 'deleted')">trash</i>
</div>
</KtTableLegacy>
```

</div>
</CodePreview>

_Update_: Preferably, since the above syntax is now deprecated, use [v-slot](https://vuejs.org/v2/guide/components-slots.html)

<CodePreview vueSlotLabel="v-slot syntax" styleSlotLabel="shorthand">
<div slot="vue">

```html
<KtTableLegacy :rows="rows" :columns="columns">
	<div slot="actions" slot-scope="{ row }">
		<!-- as before  -->
	</div>
</KtTableLegacy>
```

</div>
<div slot="style">

```html
<KtTableLegacy :rows="rows" :columns="columns">
	<div slot="actions" slot-scope="{ row }">
		<!-- as before  -->
	</div>
</KtTableLegacy>
```

</div>
</CodePreview>

## Expandable

`isExpandable` enables expandability of the row**s**, defined on `<KtTableLegacy/>`. You use the `slot="expand"` to define the template that shows on expansion.

<CodePreview vueSlotLabel="Expandable Table" styleSlotLabel="html">
<div slot="vue">
<KtTableLegacy :rows="rows" :columns="columnsDefault" isExpandable>
<div slot="expand" slot-scope="{ row, rowIndex }">
	<KtBanner :message="row.name" icon="user" isGray />
	<KtBanner :message="row.address.line" icon="global" isGray />
</div>
</KtTableLegacy>
</div>

<div slot="style">

```html
<KtTableLegacy :rows="rows" :columns="columns" isExpandable>
	<div slot="expand" slot-scope="{ row, rowIndex }">
		<KtBanner :message="row.name" icon="user" isGray />
		<KtBanner :message="row.address.line" icon="global" isGray />
	</div>
</KtTableLegacy>
```

</div>
</CodePreview>

The default behavior only allows you to expand one row at a time; expanding one row would trigger any currently-expanded rows to shrink back.

If you want to allow for the expansion of multiple rows at a time, set the `expandMultiple` flag on `<KtTableLegacy />`, as well.

<CodePreview vueSlotLabel="Expandable Table" styleSlotLabel="html">
<div slot="vue">
<KtTableLegacy :rows="rows" :columns="columnsDefault" isExpandable expandMultiple>
<div slot="expand" slot-scope="{ row, rowIndex }">
	<KtBanner :message="row.name" icon="user" isGray />
	<KtBanner :message="row.address.line" icon="global" isGray />
</div>
</KtTableLegacy>
</div>
<div slot="style">

```vue
<KtTableLegacy :rows="rows" :columns="columns" isExpandable expandMultiple>
<div slot="expand" slot-scope="{ row, rowIndex }">
	<KtBanner :message="row.name" icon="user" isGray />
	<KtBanner :message="row.address.line" icon="global" isGray />
</div>
</KtTableLegacy>
```

</div>
</CodePreview>

## Custom Render

It is possible to customize parts (columns) of the table by passing your own render-prop functions instead of using slots.

`<KtTableLegacy />` supports the following render props:

- `renderEmpty` &rarr; to define a custom rendered component when the table is empty, i.e., `:rows=[]`. `slot='empty'` can be used instead.
- `renderLoading` &rarr; for when the `rows` are still loading (e.g., backend-api call has not resolved yet). `slot='loading'` can be used to render a template, instead.
  > Note there is a `loading` Boolean flag, and when set to true, will render whatever is passed to `renderLoading` inside the table body.
  > if no `renderLoading` function is passed, it defaults to a buffer, still.
- `renderExpand` &rarr; alternative to the `expand` slot.
- `renderActions` &rarr; alternative to the `actions` slot.

`<KtTableLegacyColumn />` supports the following render props:

- `formatter` &rarr; which applies formatting to the cell (somewhat similar to what you would consider as a `computed`)
- `renderHeader` &rarr; custom render fn, to render a custom element in the header of the column. Instead you can use, slot='header'
- `renderCell` &rarr; custom render fn, to render a custom element in the cells of the column. Instead use a default slot.

<CodePreview vueSlotLabel="Custom Render Table" styleSlotLabel="html">
<div slot="vue" >
	<KtTableLegacy
		:rows="rows"
		:renderExpand="renderExpand"
		expandMultiple
		:renderActions="renderActions"
	>
		<KtTableLegacyColumn
			label="Name"
			prop="name"
			:renderHeader="renderHeader"
			:renderCell="renderCell"
		/>
		<KtTableLegacyColumn
			label="Date"
			prop="date"
			:formatter="formatDate"
		/>
	</KtTableLegacy>
</div>

<div slot="style">

```html
<KtTableLegacy
	:rows="rows"
	:renderExpand="renderExpand"
	expandMultiple
	:renderActions="renderActions"
>
	<KtTableLegacyColumn
		label="Name"
		prop="name"
		:renderHeader="renderHeader"
		:renderCell="renderCell"
	/>
	<KtTableLegacyColumn label="Date" prop="date" :formatter="formatDate" />
</KtTableLegacy>
```

</div>
</CodePreview>

```jsx
{
	methods: {
		formatDate(value, row, column, columnIndex, rowIndex) {
			return new Date(value).toUTCString()
		},
		renderExpand(h, { row }) {
			return (
				<div>
					<KtBanner message={row.name} icon="user" isGray />
					<KtBanner message={row.address.line} icon="global" isGray />
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
					class="mr-16px"
					isHoverable
					name={value}
					size={Kotti.Avatar.Size.SMALL}
					src="https://picsum.photos/200"
				/>
			)
		},
	}
}
```

<CodePreview vueSlotLabel="Custom Loading" styleSlotLabel="html">
<div slot="vue">
	<KtTableLegacy
		:rows="rows"
		:renderLoading="renderLoading"
		loading
		>
		<KtTableLegacyColumn
			label="Name"
			prop="name"
		/>
		<KtTableLegacyColumn
			label="Date"
			prop="date"
		/>
	</KtTableLegacy>
</div>

<div slot="style">

```html
<KtTableLegacy :rows="rows" :renderLoading="renderLoading" loading>
	<KtTableLegacyColumn label="Name" prop="name" />
	<KtTableLegacyColumn label="Date" prop="date" />
</KtTableLegacy>
```

</div>
</CodePreview>

<CodePreview vueSlotLabel="Empty Table" styleSlotLabel="html">
<div slot="vue">
<KtTableLegacy
	:rows="[]"
	:renderEmpty="renderEmpty"
>
	<KtTableLegacyColumn
		label="Name"
		prop="name"
	/>
	<KtTableLegacyColumn
		label="Date"
		prop="date"
	/>
</KtTableLegacy>
</div>

<div slot="style">

```html
<KtTableLegacy :rows="[]" :renderEmpty="renderEmpty">
	<KtTableLegacyColumn label="Name" prop="name" />
	<KtTableLegacyColumn label="Date" prop="date" />
</KtTableLegacy>
```

</div>
</CodePreview>

```js
renderLoading() {
	return <div>Custom loading render</div>
},
renderEmpty() {
	return <div>Custom empty render</div>
},
```

You can also use slots instead of render props. [`slot="loading"`, `slot="empty"`, `slot="header"`, `slot="default"`].

<CodePreview vueSlotLabel="Loading Slot" styleSlotLabel="html">
<div slot="vue">
<KtTableLegacy :rows="rows" :columns="columnsDefault" loading>
	<div slot="loading">
		Custom loading via slot
	</div>
</KtTableLegacy>
</div>

<div slot="style">

```html
<KtTableLegacy :rows="rows" :columns="columnsDefault" loading>
	<div slot="loading">Custom loading via slot</div>
</KtTableLegacy>
```

</div>
</CodePreview>

<CodePreview vueSlotLabel="Empty Slot" styleSlotLabel="html">
<div slot="vue">
<KtTableLegacy :rows="emptyRows" :columns="columnsDefault">
	<div slot="empty">
		Custom empty via slot
	</div>
</KtTableLegacy>
</div>
<div slot="vue">
<KtTableLegacy :rows="emptyRows" :columns="columnsDefault" emptyText="Custom empty via prop"/>
</div>

<div slot="style">

```html
<KtTableLegacy :rows="emptyRows" :columns="columns">
	<div slot="empty">Custom empty via slot</div>
</KtTableLegacy>
```

</div>
</CodePreview>

<CodePreview vueSlotLabel="header/default slots" styleSlotLabel="html">
<div slot="vue">
<KtTableLegacy :rows="rows">
<KtTableLegacyColumn
	label="Name"
	prop="name"
>
<div slot="header" slot-scope="{ value, columnIndex }">
	<div v-text="columnIndex + '::' + value" ></div>
</div>
<div slot-scope="{ value, row, rowIndex, column, columnIndex }">
	<KtAvatar
		class="mr-16px"
		isHoverable
		:name="value"
		src="https://picsum.photos/200"
		:size="Kotti.Avatar.Size.SMALL"
	/>
</div>
</KtTableLegacyColumn>
</KtTableLegacy>

</div>
<div slot="style">

```html
<KtTableLegacy :rows="rows">
	<KtTableLegacyColumn label="Name" prop="name">
		<div slot="header" slot-scope="{ value, columnIndex }">
			<div v-text="columnIndex + '::' + value"></div>
		</div>
		<!-- if you use deprecated slot syntax, you don't need to define slot name for a default slot (this replaces renderCell) -->
		<div slot-scope="{value, row, rowIndex, column, columnIndex}">
			<KtAvatar
				class="mr-16px"
				isHoverable
				:name="value"
				:size="Kotti.Avatar.Size.SMALL"
				src="https://picsum.photos/200"
			/>
		</div>
	</KtTableLegacyColumn>
</KtTableLegacy>
```

</div>
</CodePreview>

### Provider/Consumer and Mixin

Sometimes you may need to access the table's store and control it from outside.
While `ref` may work if your modifications are in the _same_ component, your controller component may be elsewhere.

For that purpose, we introduce `KtTableLegacyProvider`/`KtTableLegacyConsumer`. The provider exposes the `store`, from which you can access many props from the store.
It also directly exposes `columns`, `filteredColumns`, `sortedColumns`, `hiddenColumns`, for faster accesss, and methods: `hideColumn`, `showAllColumns`, `orderBeforeColumn`.

`<KtTableLegacyProvider />` takes the same props as `<KtTableLegacy/>`.

`<KtTableLegacy />` can have an optional `id` prop that will allow the corresponding `<KtTableLegacyConsumer />` to select the same `id`.
Otherwise, all tables **under** the same provider will share the same store.

_Notes_:

- `hideColumn(column, toggleTo)` &rarr; takes the column to be hidden and the _negation_ of its _current_ `hidden` prop (i.e. If it's already hidden, toggle will be set hidden to `false` and vice-versa)
- `showAllColumns()` &rarr; takes no arguments and sets `hidden` prop to false on all columns
- `orderBeforeColumn(fromIndex, to Index)` &rarr; used when `useColumnDragToOrder` flag is true. Takes the column index we're dragging from, and the index of the column before the one we're dragging to.

> There’s also the _deprecated_ `KtTableColumnsStateMixin`.

<CodePreview vueSlotLabel="Consumer/Provider Table" styleSlotLabel="html">
<div slot="vue">
<KtTableLegacyProvider>
	<div>
		<KtTableLegacyConsumer #default="{ columns, hideColumn, showAllColumns }">
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
		</KtTableLegacyConsumer>
		<KtTableLegacyConsumer #default="{ columns, orderBeforeColumn }">
			<div>
				<input label="Drag From: " type="number" min="0" :max="columns.length-1" v-model="fromIndex" />
				<input label="(+-)Steps: " type="number" :min="fromIndex===0?0:-fromIndex" :max="(columns.length -2 - fromIndex)" v-model="dragSteps" />
				<KtButton type="primary" label="Reorder Columns" :disabled="parseInt(dragSteps,10)===0" @click="orderBeforeColumn( columns[parseInt(fromIndex, 10)], columns[parseInt(toIndex, 10)] )" />
			</div>
		</KtTableLegacyConsumer>
	</div>
	<div>
		<KtTableLegacy :rows="rows" :columns="columnsHidden" useColumnDragToOrder/>
	</div>
</KtTableLegacyProvider>
</div>
<div slot="style">

```html
<KtTableLegacyProvider>
	<div>
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
		<KtTableLegacyConsumer #default="{ columns, orderBeforeColumn }">
			<div>
				<input
					label="Drag From: "
					type="number"
					min="0"
					:max="columns.length-1"
					v-model="fromIndex"
				/>
				<input
					label="(+-)Steps: "
					type="number"
					:min="fromIndex===0?0:-fromIndex"
					:max="(columns.length -2 - fromIndex)"
					v-model="dragSteps"
				/>
				<KtButton
					type="primary"
					label="Reorder Columns"
					:disabled="parseInt(dragSteps,10)===0"
					@click="orderBeforeColumn( columns[parseInt(fromIndex, 10)], columns[parseInt(toIndex, 10)] )"
				/>
			</div>
		</KtTableLegacyConsumer>
	</div>
	<div>
		<KtTableLegacy :rows="rows" :columns="columnsHidden" useColumnDragToOrder />
	</div>
</KtTableLegacyProvider>
```

</div>
</CodePreview>

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

| Attribute              | Description                                                         | Type                        | Accepted values       | Default   |
| :--------------------- | :------------------------------------------------------------------ | :-------------------------- | :-------------------- | :-------- |
| `columns`              | table column information                                            | `Array`                     | —                     | null      |
| `disableRow`           | disable some rows if the function is true                           | `Function`                  | —                     | —         |
| `emptyText`            | text to show when table is empty                                    | `String`                    | —                     | `No Data` |
| `expandMultiple`       | allow for expanding multiple rows at once                           | `Boolean`                   | —                     | `false`   |
| `filteredColumns`      | prop for changing filtered columns                                  | `Array`                     | [{ prop, filter }]    | `[]`      |
| `headerClass`          | classes to apply to the table header row: `<tr />` element          | `String`, `Array`, `Object` | `"responsive"`        | -         |
| `hiddenColumns`        | prop for changing hidden columns                                    | `Array`                     | [{ prop, hidden }]    | `[]`      |
| `id`                   | for when using nested providers                                     | `String`                    | —                     | null      |
| `isInteractive`        | allow clicking/keyboard focusing table rows                         | `Boolean`                   | —                     | `false`   |
| `isScrollable`         | allow horizontal table scrolling                                    | `Boolean`                   | —                     | `false`   |
| `isSelectable`         | enable `select` option of table                                     | `Boolean`                   | —                     | `false`   |
| `loading`              | flag to toggle loading state.                                       | `Boolean`                   | —                     | `false`   |
| `orderedColumns`       | prop for changing ordered columns                                   | `Array`                     | [{ prop, order }]     | `[]`      |
| `remoteSort`           | UI is enabled but table will not sort; but only publish @sortChange | `Boolean`                   | -                     | `false`   |
| `renderActions`        | render prop for row `actions`                                       | `Function`                  | —                     | —         |
| `renderEmpty`          | render prop for `emptyText` prop, when rows are empty               | `Function`                  | —                     | —         |
| `renderExpand`         | render prop for `expand`                                            | `Function`                  | —                     | —         |
| `renderLoading`        | render prop for `loading`                                           | `Function`                  | —                     | —         |
| `rowKey`               | the row prop used for the rows key                                  | `String`, `Function`        | —                     | —         |
| `rows` (required)      | table row data                                                      | `Array`                     | —                     | `[]`      |
| `selected`             | prop for rows that are selected, as returned by @selectionChange    | `Array`                     | -                     | `[]`      |
| `sortMultiple`         | enable sorting multiple columns                                     | `Boolean`                   | -                     | `false`   |
| `sortable`             | enable sorting for all columns                                      | `Boolean`, `String`         | "all"                 | `false`   |
| `sortedColumns`        | prop for changing sorted columns                                    | `Array`                     | [{ prop, sortOrder }] | `[]`      |
| `tdClasses`            | classes to apply to all table data cells: `<td />` elements         | `String`, `Array`, `Object` | `"responsive"`        | -         |
| `thClasses`            | classes to apply to all table header cells: `<th />` elements       | `String`, `Array`, `Object` | `"responsive"`        | -         |
| `trClasses`            | classes to apply to all table data rows: `<tr />` elements          | `String`, `Array`, `Object` | `"responsive"`        | -         |
| `useColumnDragToOrder` | enable dragging columns to change their order                       | `Boolean`                   | -                     | `false`   |
| `useQuickSortControl`  | enable toggle sort by column click UI (arrow keys)                  | `Boolean`                   | -                     | `false`   |

### Column Attributes

| Attribute         | Description                                                                     | Type                          | Accepted values                            | Default                           |
| :---------------- | :------------------------------------------------------------------------------ | :---------------------------- | :----------------------------------------- | :-------------------------------- |
| `align`           | alignment of column text                                                        | `String`                      | `"center"`, `"left"`, `"right"`            | `left`                            |
| `cellClass`       | classes to this column's to `.kt-table-legacy__cell` elements                   | `String`, `Array`, `Object`   | `"responsive"`                             | -                                 |
| `default`         | if cell value is undefined, use default. Does not work if you use custom render | `String`                      | -                                          | -                                 |
| `disableRowClick` | stop row click from bubbling up when clicking on cell                           | `Boolean`                     | -                                          | `false`                           |
| `formatter`       | formats value before passing it to cell                                         | `Function`                    | -                                          |                                   |
| `headerCellClass` | classes to this column's to `.kt-table-legacy__header-cell` elements            | `String`, `Array`, `Object`   | `"responsive"`                             | -                                 |
| `hidden`          | does not render this collumn if true                                            | `Boolean`                     | true, false                                | `false`                           |
| `key`             | deprecated. Is transalted to `prop`, instead                                    | `String`                      | —                                          | —                                 |
| `label`           | table column header value                                                       | `String`                      | —                                          | —                                 |
| `maxWidth`        | maximum width of the column within the table                                    | `String`                      | `10%`, `100px`                             | -                                 |
| `minWidth`        | minimum width of the column within the table                                    | `String`                      | `10%`, `100px`                             | -                                 |
| `order`           | number to sort columns from left to right by                                    | `Number`                      | -                                          |                                   |
| `prop` (required) | used to match the value in `rows` can be a dot path                             | `String` `String.String`      | —                                          | —                                 |
| `renderCell`      | render function to custom render table cell                                     | `Function`                    | -                                          |                                   |
| `renderHeader`    | render function to custom render header cell                                    | `Function`                    | -                                          |                                   |
| `responsive`      | control responsive display (this doesn't seem to work )                         | `String`                      | —                                          | —                                 |
| `sortable`        | whether this column is sortable or not                                          | `Boolean`, `undefined`        | true, false, undefined                     | -                                 |
| `sortBy`          | compare function to sort by                                                     | `String`, `Function`, `Array` | path string, function or array of previous | column.prop                       |
| `sortMethod`      | custom sort method ignores sortBy                                               | `Function`                    | -                                          | null                              |
| `sortOrder`       | the current sort order of the column                                            | `String`, `Number`, `null`    | "ascending", 1, "descending", -1, null, 0  | null                              |
| `sortOrders`      | order to toggle sort                                                            | `Array`                       | -                                          | ["ascending", "descending", null] |
| `tdClass`         | classes to this column's to `<td />` elements                                   | `String`, `Array`, `Object`   | `"responsive"`                             | -                                 |
| `thClass`         | classes to this column's header to `<td />` elements                            | `String`, `Array`, `Object`   | `"responsive"`                             | -                                 |
| `width`           | width of the column within table. When using %, must add up to `100%`           | `String`                      | `10%`, `100px`                             | `auto`                            |

#### Consumer Attributes

| Attribute | Description                     | Type     | Accepted values | Default |
| :-------- | :------------------------------ | :------- | :-------------- | :------ |
| `id`      | for when using nested providers | `String` | —               | null    |

### Events

#### Column Events

| Event Name         | Arguments                                                                                                                                                                                 | Description                                                               |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| `@activateRow`     | `(row: Row, index: number)`                                                                                                                                                               | Row was clicked or activated via keyboard.                                |
| `@expand`          | `(row: Row, isExpanded: boolean)`                                                                                                                                                         | Row was expanded                                                          |
| `@expandChange`    | `(expanded: Row[])`                                                                                                                                                                       | emits an array of booleans representing the selected state of each column |
| `@orderChange`     | `(columns: { prop: string, order: number}[])`                                                                                                                                             | array of columns with updated order                                       |
| `@rowBlur`         | `(row: Row, index: number)`                                                                                                                                                               | row was blurred Requires setting `isInteractive` or `@activateRow`        |
| `@rowClick`        | `(row: Row, index: number)`                                                                                                                                                               | Row was clicked                                                           |
| `@rowFocus`        | `(row: Row, index: number)`                                                                                                                                                               | Row was in focus Requires setting `isInteractive` or `@activateRow`       |
| `@select`          | `(selection: Row[], row: Row)`                                                                                                                                                            | a row was selected                                                        |
| `@selectAll`       | `(selection: Row[])`                                                                                                                                                                      | all selection checkbox was toggled                                        |
| `@selectionChange` | `(selection: Row[])`                                                                                                                                                                      | selection changed                                                         |
| `@sortChange`      | `({ prop: Column.prop, sortBy: Column.sortBy, sortOrder: Column.sortOrder, column: Column, sortedColumns: { prop: Column.prop, sortBy: Column.sortBy, sortOrder: Column.sortOrder }[] })` | a column was sorted                                                       |

#### Cell Events

| Event Name   | Arguments                                                                               | Description        |
| :----------- | :-------------------------------------------------------------------------------------- | :----------------- |
| `@cellClick` | `({ value: unknown, column: Column, row: Row, columnIndex: number, rowIndex: number })` | a cell was clicked |

> It triggers @rowClick, unless bubbling up is disabled by setting `disableRowClick` to true

### Slots

#### Table Slots

| Slot Name | Description                         | Scope                                            |
| :-------- | :---------------------------------- | :----------------------------------------------- |
| `empty`   | what to render when no data         | --                                               |
| `loading` | what to render when loading is true | --                                               |
| `actions` | action section of each row          | `{ value: unknown, row: Row, rowIndex: number }` |
| `expand`  | expand section of each row          | `{ value: unknown, row: Row, rowIndex: number }` |

#### Column Slots

| Slot Name | Description          | Scope                                                                                 |
| :-------- | :------------------- | :------------------------------------------------------------------------------------ |
| `header`  | render in table row  | `{ value: unknown, row: Row, rowIndex: number }`                                      |
| `default` | render in table cell | `{ value: unknown, row: Row, rowIndex: number, column: Column, columnIndex: number }` |

#### Consumer Slots

| Slot Name | Description                               | Scope                                                                                                                                                                                            |
| :-------- | :---------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default` | provide a table's store and other methods | `{ store: Object, columns: Column[], hiddenColumns: Column[], sortedColumns: Column[], filteredColumns: Column[], hideColumn: Function, showAllColumns: Function, orderBeforeColumn: Function }` |
</template>

<script>
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
	KtAvatar,
	KtBanner,
	KtButton,
	KtButtonGroup,
	KtFieldText,
	KtTableLegacy,
	KtTableLegacyColumn,
	KtTableLegacyConsumer,
	KtTableLegacyProvider,
} from '@3yourmind/kotti-ui'
import { Kotti } from '@3yourmind/kotti-ui'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/ComponentInfo.vue'

const ADDRESS_DOT_LINE = 'address.line'

const rows = [
	{
		address: { line: 'No. 119, Grove St, Los Angeles', number: 119 },
		date: '2016-05-03',
		name: 'Tom',
	},
	{
		address: { line: 'No. 89, Grove St, Los Angeles', number: 89 },
		date: '2016-05-02',
		name: 'Jackson',
	},
	{
		address: { line: 'No. 182, Grove St, Los Angeles', number: 182 },
		date: '2016-05-04',
		name: 'Fen',
	},
	{
		address: { line: 'No. 189, Grove St, Los Angeles', number: 189 },
		date: '2016-05-01',
		name: 'Fexiang',
	},
]

/* eslint-disable perfectionist/sort-objects */
export default {
	name: 'DocumentationPageUsageComponentsTable',
	components: {
		CodePreview,
		ComponentInfo,
		KtAvatar,
		KtBanner,
		KtButton,
		KtButtonGroup,
		KtFieldText,
		KtTableLegacy,
		KtTableLegacyColumn,
		KtTableLegacyConsumer,
		KtTableLegacyProvider,
	},
	data() {
		return {
			component: KtTableLegacy,
			Kotti,
			select: [0, 1],
			selected: [rows[0]],
			selectedRows: [],
			columnsDefault: [
				{ prop: 'name', label: 'Name' },
				{ prop: 'date', label: 'Date' },
			],
			columnsAlign: [
				{ prop: 'name', label: 'Name', align: 'left' },
				{ prop: 'date', label: 'Date', align: 'center' },
				{ prop: ADDRESS_DOT_LINE, label: 'Address', align: 'right' },
			],
			columnsResponsive: [
				{ prop: 'name', label: 'Name' },
				{ prop: 'date', label: 'Date' },
				{ prop: ADDRESS_DOT_LINE, label: 'Address' },
			],
			columnsHidden: [
				{ prop: 'name', label: 'Name', hidden: true },
				{ prop: 'date', label: 'Date' },
				{ prop: ADDRESS_DOT_LINE, label: 'Address' },
			],
			columnsScrollable: [
				{ prop: 'name', label: 'Name', width: '200px' },
				{ prop: 'date', label: 'Date', width: '300px' },
				{ prop: ADDRESS_DOT_LINE, label: 'Address', width: '500px' },
				{ prop: 'gender', label: 'Gender', width: '100px' },
			],
			columnsWidth: [
				{ prop: 'name', label: 'Name', width: '30%' },
				{ prop: 'date', label: 'Date', width: '20%' },
				{ prop: ADDRESS_DOT_LINE, label: 'Address', width: '50%' },
			],
			rows2: [
				{
					address: { number: 119, line: 'No. 119, Grove St, Los Angeles' },
					date: '2016-05-03',
					gender: 'm',
					name: 'Tom',
				},
				{
					address: { number: 331, line: 'No. 119, Grove St, Los Angeles' },
					date: '2019-05-04',
					gender: 'f',
					name: 'Heinz Dieter',
				},
				{
					address: { number: 10, line: 'No. 119, Grove St, Los Angeles' },
					date: '2024-05-07',
					gender: 'd',
					name: 'Shabeer Mahood',
				},
			],
			emptyRows: [],
			rows: [...rows],
			disableName: 'F',
			fromIndex: 0,
			dragSteps: 0,
		}
	},
	computed: {
		toIndex() {
			const parsedFrom = Number.parseInt(this.fromIndex, 10)
			const parsedSteps = Number.parseInt(this.dragSteps, 10)

			return parsedFrom + parsedSteps + (parsedSteps > 0 ? 1 : 0)
		},
	},
	methods: {
		disableRow({ row }) {
			return row.name.includes(this.disableName)
		},
		setSelectedRows(rows) {
			this.selected = [...rows]
		},
		showAlertOnClickOrEnter(row, rowIndex) {
			// eslint-disable-next-line no-alert
			window.alert(`${JSON.stringify(row)} is at index: ${String(rowIndex)}!`)
		},
		showAlert(model, value) {
			// eslint-disable-next-line no-alert, @typescript-eslint/restrict-template-expressions
			window.alert(`${model} is ${value}!`)
		},
		sortDate(a, b) {
			return new Date(a) - new Date(b)
		},
		byAddressLine(row) {
			return row.address.line
		},
		formatDate(value) {
			return new Date(value).toUTCString()
		},
		renderEmpty(h) {
			return h('div', 'Custom empty render')
		},
		renderLoading(h) {
			return h('div', 'Custom loading render')
		},
		renderExpand(h, { row }) {
			return h('div', null, [
				h(KtBanner, {
					props: { message: row.name, icon: 'user', isGray: true },
				}),
				h(KtBanner, {
					props: {
						message: row.address.line,
						icon: 'global',
						isGray: true,
					},
				}),
			])
		},
		renderActions(h, { row }) {
			return [
				h(
					'i',
					{
						class: 'yoco',
						on: {
							click: () => {
								this.showAlert(row.name, 'edited')
							},
						},
					},
					'edit',
				),
				h(
					'i',
					{
						class: 'yoco',
						on: {
							click: () => {
								this.showAlert(row.name, 'deleted')
							},
						},
					},
					'trash',
				),
			]
		},
		showAlterCallBack(name, text) {
			return () => {
				this.showAlert(name, text)
			}
		},
		renderHeader(h, { value }) {
			return h('div', value)
		},
		renderCell(h, { value }) {
			return h(KtAvatar, {
				class: 'mr-16px',
				props: {
					name: value,
					isHoverable: true,
					size: Kotti.Avatar.Size.SMALL,
					src: 'https://picsum.photos/200',
				},
			})
		},
	},
}
/* eslint-enable perfectionist/sort-objects */
/* eslint-enable @typescript-eslint/explicit-module-boundary-types */
</script>

<style lang="scss" scoped>
.container {
	display: flex;
	flex-direction: column;
	gap: var(--unit-2);

	&__buttons-row {
		display: flex;
		gap: var(--unit-2);
		align-items: center;
		justify-content: flex-end;
	}
}
</style>
