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

> use of `key` is deprecated use `prop` instead of `key` when defining columns

`rows` is an `Array` of `Object`s that represent a `row`.

> for better performance in complex operations define `rowKey` to index each row with

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

All props that a column take the KtTableColumn component takes with the exeption of `key`

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

Content should be left aligned except some common alignment style, such as price, currency.

<KtTable :rows="rows" :columns="columnsAlign" />

`align` in `columns` decides the alignment of each column’s text.

## Responsive

When display space is limited, some less-important columns should be hidden.

`responsive` in `columns` has five breakpoints to make this easy to do.

<KtTable :rows="rows" :columns="columnsResponsive" />

When content should not be hidden, using horizontal scrolling is a better alternative.
`isScrollable` will enable horizontal scrolling for the table.

<KtTable :rows="rows2" :columns="columnsDefault" isScrollable />

```html
<KtTable :rows="rows" :columns="columnsDefault" isScrollable />
```

## Selectable

`isSelectable` enables mutilple select option of the table. You can bind an `Array` model to `KtTable` and control the selected data.

<div>
	<KtTable :rows="rows" :columns="columnsResponsive" isSelectable v-model="select" />
	Selected value: {{ select }}
</div>

```html
<KtTable :rows="rows" :columns="columns" isSelectable v-model="select" />
```

```js
{
	data() {
		return {
			select: [0, 1]
		}
	}
}
```

> While you can bind the selections with v-model it is advised to instead listen to the @selectionChange event which published the current selected rows whenever they change

It is also possible to control which rows are selected by passing the rows to `selected` prop

<div>
	<KtTable :rows="rows" :columns="columnsResponsive" isSelectable @selectionChange="selectedRows = $event" />
	Selected value: {{ selectedRows }}
</div>

```html
<KtTable :rows="rows" :columns="columns" isSelectable @selectionChange="selectRow" />
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

`disableRow` function can be passed to `KtTable` to reactivly disable rows,
based on your view and specific row data

<KtInput v-model='disableName' />
<KtTable
	:rows="rows"
	:columns="columnsResponsive"
	:disableRow="disableRow"
	isSelectable
	/>

```html
<KtInput v-model='disableName' />
<KtTable
	:rows="rows"
	:columns="columnsResponsive"
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
			// when name empty will disable all
			return row.name.includes(this.disableName)
		}
	}
}
```

## Row Interaction

`KtTable` has a `@rowClick` event for when a user clicks but perfered event is `@activateRow`,
which gets fired on row click as well as when the user hits the enter/return key while focused.

You can tab and trigger row active by the hitting enter (not you can't select disabled rows)


<KtInput v-model='disableName' />
<KtTable
	:rows="rows"
	:columns="columnsResponsive"
	:disableRow="disableRow"
	isSelectable
	@activateRow="showAlert"
	/>

```html
<KtInput v-model='disableName' />
<KtTable
	:rows="rows"
	:columns="columnsResponsive"
	:disableRow="disableRow"
	isSelectable
	@activateRow="showAlert"
	/>
```

## Ordering Columns

You can order Columns by dragging if you use the `useColumnDragToOrder` flag

<KtTable :rows="rows" useColumnDragToOrder >
	<KtTableColumn label="Name" prop="name" />
	<KtTableColumn label="Date" prop="date"/>
	<KtTableColumn label="Address" prop="address.line"/>
</KtTable>

```html
<KtTable :rows="rows" useColumnDragToOrder >
	<KtTableColumn label="Name" prop="name" />
	<KtTableColumn label="Date" prop="date"/>
	<KtTableColumn label="Address" prop="address.line"/>
</KtTable>
```

## Sorting

To enable sorting you must enable a sorting ui flag `useQuickSortControl` as well as add `sortable` to any column definition.

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

If you want to allow sorting for all columns excluding one, you can set `sortable="all"` on the KtTable

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

It's possible to custamize your sorting experience by using the column's sortMethod, sortBy and sortOrders

<KtTable :rows="rows" useQuickSortControl sortable="all">
	<KtTableColumn label="Name" prop="name" :sortOrders="['descending', 'ascending', undefined]"/> // change the default the next sorting order
	<KtTableColumn label="Date" prop="date" :sortMethod="sortDate" /> // use custom compare function
	<KtTableColumn label="Address" prop="address.line" :sortBy="['address.number', byAddressLine]"/> // target different props on the row
</KtTable>

```html
<KtTable :rows="rows" useQuickSortControl sortable="all">
	<KtTableColumn label="Name" prop="name" :sortOrders="['descending', 'ascending', undefined]"/> // change the default the next sort order on click
	<KtTableColumn label="Date" prop="date" :sortMethod="sortDate" /> // use custom compare function
	<KtTableColumn label="Address" prop="address.line" :sortBy="['address.number', byAddressLine]"/> // target different props on the row
</KtTable>
```

```js
{
	methods: {
		sortDate(a, b) {
			return new Date(a) - new Date(b)
		},
		byAddressLine(row, index) {
			// get prop to sort by or whatever
			return row.address.line
		}
	}
}
```
We support sorting single or multiple columns at the same time (the the ui for managing it has not yet landed), by default `sortMultiple` is set to `false`

Sorting resolution is handles the same as sortBy for each column, ie. if the first element comparison returns `0` the next is used until we resolve by array order

You can pass to KtTable an array of `sortedColumns` of the form `[{ prop, sortOrder }]`

You can also start the table already sorted by setting the sortOrder prop for one of the columns `<KtTableColumn :sortOrder="1" prop="name" />`

sortOrder can be one of `'ascending', 'descending', 1, -1, 0, or undefined`

To sort remotly set the `sortRemote` flag on KtTable which disable the local table sort function.
You can then listening to the `@sortChange` which returns

```
{
	sortedColumns, // an array of the sorted colums by priority if sortMultiple is false then it will allways contain one element.
	column, // the column that was just sorted
	sortOrder, // the order the column is to be sorted to
	prop, // the prop to be sorted on that column
	sortBy, // the value of sortBy on the column, useful in this case if you will send the backend a different value then prop
}`
```

You can then use the set sortedColumns prop on the KtTable to update the table ui when your backend request is resolved.

```html
<KtTable :rows="rows" useQuickSortControl sortable="all" sortRemote @sortChange="sort">
	<KtTableColumn label="Name" prop="name" /> // change the default the next sort order on click
	<KtTableColumn label="Date" prop="date" sortBy="order_date" /> // use custom compare function
	<KtTableColumn label="Address" prop="address.line" sortBy="address_line"/> // target different props on the row
</KtTable>
```
```js
{
	methods: {
		async sort({ sortBy, sortOrder }) {
			this.rows = await api.get(url, { params: { [sortBy]: sortOrder } })
		}
	}
}
```

## Actions

`actions` adds hover actions to the table. Using `actions` slot to define the action template.

> You must use `slot-scope` prop for the `actions` slot for it to be detected.

<KtTable :rows="rows" :columns="columnsResponsive">
	<template slot-scope="{ row }" slot="actions">
		<i class="yoco" @click="showAlert(row.name, 'edited')">edit</i>
		<i class="yoco" @click="showAlert(row.name, 'deleted')">trash</i>
	</template>
</KtTable>

```html
<KtTable :rows="rows" :columns="columns">
	<template slot-scope="{ row }" slot="actions">
	<i class="yoco" @click="showAlert(row.name, 'edited')">edit</i>
	<i class="yoco" @click="showAlert(row.name, 'deleted')">trash</i>
</template>
</KtTable>
```

## Expandable

`expandMultiple` enables expandability of the row, you can create template in `expand` slot.

Same as `actions`, `slot-scope` is required and is used to pass data to the expantion.

<KtTable :rows="rows" :columns="columnsResponsive" isExpandable isScrollable>
	<template slot-scope="{ row, rowIndex }" slot="expand">
	<KtBanner :message="row.name" icon="user" isGrey />
	<KtBanner :message="row.address.line" icon="global" isGrey />
</template>
</KtTable>

```html
<KtTable :rows="rows" :columns="columns" isExpandable isScrollable>
	<template slot-scope="{ row, rowIndex }" slot="expand">
	<KtBanner :message="row.name" icon="user" isGrey />
	<KtBanner :message="row.address.line" icon="global" isGrey />
</template>
</KtTable>
```

## Custom Render

It is possible to customize parts of the table by passing your own render prop function or using slots

`KtTable` supports the `renderEmpty`, `renderLoading`, `renderExpand` and `renderActions` props
`KtTableColumn` supports the `formatter`, `renderHeader`, and `renderCell` props

<KtTable
	:rows="rows"
	:renderExpand="renderExpand"
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

<KtTable
	:rows="[]"
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

<KtTable
	:rows="[]"
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

```html
<KtTable
	:rows="rows"
	:renderEmpty="renderEmpty"
	:renderLoading="renderLoading"
	:renderExpand="renderExpand"
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

```js
{
	methods: {
		formatDate(value, row, column, columnIndex, rowIndex) {
			return new Date(value).toUTCString()
		},
		renderEmpty(h) {
			return <div>Hello</div>
		},
		renderLoading(h) {
			return <div>Loading while the loading prop on KtTable is true</div>
		},
		renderExpand(h, { row, rowIndex }) {
			return (
				[
					<KtBanner message={'row.name'} icon="user" isGrey />,
					<KtBanner message={'row.address.line'} icon="global" isGrey />
				]
			)
		},
		renderActions(h, { row, rowIndex }) {
			return [
					<i class="yoco" onClick={() => this.showAlert(row.name, 'edited')} v-text='edit' />,
					<i class="yoco" onClick={()=> this.showAlert(row.name, 'deleted')} v-text='trash' />
			]
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

You can also use slots instead of render props like you previously saw with the exapnd and actions slot
slot-scope is not required for the `loading` and `empty` slots

```html
<KtTable :rows="rows">
	<div slot="empty">
		No data to see
	</div>
	<div slot="loading">
		Loading while the loading prop on KtTable is true
	</div>
	<KtTableColumn
		label="Name"
		prop="name"
		>
		<template slot="header" slot-scope="{ value, column, columnIndex }">
	<div>
		{{ value }}
	</div>
</template>
		<template slot-scope="{ value, row, rowIndex, column, columnIndex }">
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

### Provider/Consumer and Mixin

Sometimes you may need to access the table's store and control it from outside,
while `ref` may work if your modifications are in the same component, your controlling ui may be elsewhere
For that purpose we introduce `KtTableProvider` `KtTableConsumer`. There’s also the deprecated `KtTableColumnsStateMixin`.

<KtTableProvider>
	<div>
		<KtTableConsumer #default="{ columns, hideColumn }">
			<div class="parts-edit-columns-filter__container">
				<KtButtonGroup>
						<KtButton
							v-for="column in columns"
							:key="column.prop"
							:label="column.label || column.prop"
							:type="column.hidden ? 'text' : 'primary'"
							@click="hideColumn(column, !column.hidden)"
						/>
				</KtButtonGroup>
			</div>
		</KtTableConsumer>
	</div>
	<div>
		<KtTable :rows="rows" :columns="columnsDefault" />
	</div>
</KtTableProvider>

```html
<KtTableProvider>
	<div>
		<KtTableConsumer #default="{ columns, hideColumn }">
			<div class="parts-edit-columns-filter__container">
				<KtButtonGroup>
						<KtButton
							v-for="column in columns"
							:key="column.prop"
							:label="column.label || column.prop"
							:type="column.hidden ? text' : 'primary'"
							@click="hideColumn(column, !column.hidden)"
						/>
				</KtButtonGroup>
			</div>
		</KtTableConsumer>
	</div>
	<div>
		<KtTable :rows="rows" :columns="columnsDefault" />
	</div>
</KtTableProvider>
```

`KtTableProvider` takes the same props as KtTable

`KtTable` can have an optional `id` prop that will allow `KtTableConsumer` to select the same `id`.
Otherwise all tables under the same Provider will share the same store

## Usage

### Attributes

|        Attribute         |                             Description                             |            Type             |    Accepted values    | Default |
| :----------------------- | :------------------------------------------------------------------ | :-------------------------- | :-------------------- | :------ |
| `rows` (required)        | table row data                                                      | `Array`                     | —                     | —       |
| `id`                     | for when using multiple provider                                    | `String`                    | —                     | null    |
| `rowKey`                 | the row prop used for the rows key                                  | `String`                    | —                     | —       |
| `columns`                | table column information                                            | `Array`                     | —                     | —       |
| `emptyText`              | text to show when table is empty                                    | `String`                    | —                     | —       |
| `loading`                | trigger toable loading state                                        | `Boolean`                   | —                     | `false` |
| `expandMultiple`         | allow for exapnding multople rows at once                           | `Boolean`                   | —                     | `false` |
| `isInteractive`          | allow clicking/keyboard focusing table rows                         | `Boolean`                   | —                     | `false` |
| `isScrollable`           | allow horizontal table scrolling                                    | `Boolean`                   | —                     | `false` |
| `isSelectable`           | enable select option of table                                       | `Boolean`                   | —                     | `false` |
| `sortable`               | enable sorting for all columns                                      | `Boolean`, `String`         | "all"                 | `false` |
| `sortMultiple`           | retain sort priority for across multiple columns                    | `Boolean`                   | -                     | `false` |
| `remoteSort`             | ui is enabled but table will not sort only publish sortChange event | `Boolean`                   | -                     | `false` |
| `useColumnDragToOrder`   | enable dragging columns to sort their order                         | `Boolean`                   | -                     | `false` |
| `useQuickSortControl`    | enable toggle sort by column click ui                               | `Boolean`                   | -                     | `false` |
| `useColumnsStateControl` | still not available enable ui for managing columns state            | `Boolean`                   | -                     | `false` |
| `sortedColumns`          | prop for setting sorted columns                                     | `Array`                     | [{ prop, sortOrder }] | `[]`    |
| `hiddenColumns`          | prop for setting hidden columns                                     | `Array`                     | [{ prop, hidden }]    | `[]`    |
| `filterdColumns`         | prop for setting filterd columns                                    | `Array`                     | [{ prop, filter }]    | `[]`    |
| `tdClasses`              | classes to apply to all `<td>` elements                             | `Array`, `String`, `Object` | `"responsive"`        | `[]`    |
| `thClasses`              | classes to apply to all `<th>` elements                             | `Array`, `String`, `Object` | `"responsive"`        | `[]`    |
| `trClasses`              | classes to apply to all `<tr>` elements                             | `Array`, `String`, `Object` | `"responsive"`        | `[]`    |
| `selected`               | rows that are selected as returned by selectionChange event         | `Array`                     | —                     | —       |
| `value`                  | —                                                                   | `Array`                     | —                     | —       |
| `maxHeight`              | —                                                                   | `String`                    | `10%`, `100px`        | —       |
| `height`                 | —                                                                   | `String`                    | `10%`, `100px`        | —       |
| `disableRow`             | disable some rows if the function is true                           | `Function`                  | —                     | —       |
| `renderEmpty`            | render function for empty text                                      | `Function`                  | —                     | —       |
| `renderLoading`          | render function for when loading                                    | `Function`                  | —                     | —       |
| `renderExpand`           | render function for expand                                          | `Function`                  | —                     | —       |
| `renderActions`          | render function for row actions                                     | `Function`                  | —                     | —       |
| `renderActions`          | render function for row actions                                     | `Function`                  | —                     | —       |

### Column Attributes

|     Attribute      |                                  Description                                   |            Type             |              Accepted values               |              Default              |
| :----------------- | :----------------------------------------------------------------------------- | :-------------------------- | :----------------------------------------- | :-------------------------------- |
| `prop`  (required) | used to match the value in `rows` can be a dot path                            | `String` `String.String`    | —                                          | —                                 |
| `align`            | alignment of column text                                                       | `String`                    | `"center"`, `"left"`, `"right"`            | `left`                            |
| `key`              | deprecated is transalted to prop instead                                       | `String`                    | —                                          | —                                 |
| `label`            | table column header value                                                      | `String`                    | —                                          | —                                 |
| `responsive`       | control responsive display  (this doesn't seem to work )                       | `String`                    | —                                          | —                                 |
| `width`            | width                                                                          | `String`                    | `10%`, `100px`                             | `auto`                            |
| `maxWidth`         | currently not used                                                             | String                      | `10%`, `100px`                             | -                                 |
| `hidden`           | does not render this collumn if true                                           | Boolean                     | false                                      |                                   |
| `sortable`         | wether this column is sortable or not                                          | [Boolean, undefined]        | true, false, undefined                     | -                                 |
| `sortOrder`        | the current sort order of the column                                           | [Number, String]            | "ascending", "descending", null            | null                              |
| `sortOrders`       | order to toggle sort                                                           | Array                       | -                                          | ["ascending", "descending", null] |
| `sortMethod`       | custom sort method ignores sortBy                                              | Function                    | -                                          | -                                 |
| `sortBy`           | compare function to sort by                                                    | String, Function, Array     | path string, function or array of previous | column.prop                       |
| `disableRowClick`  | stop row click from propagating when clicking on cell                          | Boolean                     | -                                          |                                   |
| `default`          | if cell value is undfined use default. Does not work if you used custom render | Function, String            | -                                          | -                                 |
| `formatter`        | formates value before passing it to cell                                       | Function                    | -                                          |                                   |
| `renderHeader`     | render function to custom render header cell                                   | Function                    | -                                          |                                   |
| `renderCell`       | render function to custom render table cell                                    | Function                    | -                                          |                                   |
| `renderContext`    | object you can use to pass extra data to all render functions                  | Object                      | -                                          |                                   |
| `order`            | number to sort columns from left to right by                                   | Number                      | -                                          |                                   |
| `thClass`          | classes to this colum's header to `<td>` elements                              | `Array`, `String`, `Object` | `"responsive"`                             | `[]`                              |
| `tdClass`          | classes to this colum's to `<td>` elements                                     | `Array`, `String`, `Object` | `"responsive"`                             | `[]`                              |
| `headerCellClass`  | classes to this colum's to `.kt-table__header-cell` elements                   | `Array`, `String`, `Object` | `"responsive"`                             | `[]`                              |
| `cellClass`        | classes to this colum's to `.kt-table__cell` elements                          | `Array`, `String`, `Object` | `"responsive"`                             | `[]`                              |


#### TableConsumer Attributes

| Attribute |           Description            |   Type   | Accepted values | Default |
| :-------- | :------------------------------- | :------- | :-------------- | :------ |
| `id`      | for when using multiple provider | `String` | —               | null    |

### Events

#### Column

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
| `@columnOrderChange` | `([colun])`                                           | array of columns with updated order                                 |

#### Column

|  Event Name  |                     Arguments                     |    Description     |
| :----------- | :------------------------------------------------ | :----------------- |
| `@cellClick` | `({ value, column, row, columnIndex, rowIndex })` | a cell was clicked |

### Slots

#### Table

| Slot Name |             Description             |          Scope           |
| :-------- | :---------------------------------- | :----------------------- |
| `empty`   | what to render when no data         | --                       |
| `loading` | what to render when loading is true | --                       |
| `actions` | action section of each row          | `{value, row, rowIndex } |
| `expand`  | expand section of each row          | `{value, row, rowIndex } |

#### Column

| Slot Name |     Description      |                     Scope                     |
| :-------- | :------------------- | :-------------------------------------------- |
| `header`  | render in table row  | `{value, row, rowIndex }`                     |
| `default` | render in table cell | `{value, row, rowIndex, column, columnIndex}` |

#### TableConsumer

| Slot Name |                Description                |                                                      Scope                                                       |
| :-------- | :---------------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `default` | provide a table's store and other methods | `{store,columns, hiddenColumns, sortedColumns, filteredColumns, hideColumn, showAllColumns, orderBeforeColumn,}` |

</template>

<script>
import KtBanner from '../../../packages/kotti-banner'
import KtAvatar from '../../../packages/kotti-avatar'
import KtTable from '../../../packages/kotti-table'
import ShowCase from '../../components/ShowCase'

export default {
	name: 'Tables',
	components: { ShowCase },
	data() {
		return {
			select: [0, 1],
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
		showAlert(value, model) {
			alert(`${value} is ${model}!`)
		},
		sortDate(a, b) {
			return new Date(a) - new Date(b)
		},
		byAddressLine(row, index) {
			// get prop to sort by
			return row.address.line
		},
		formatDate(value, row, column, columnIndex, rowIndex) {
			return new Date(value).toUTCString()
		},
		renderEmpty(h) {
			return <div>Hello</div>
		},
		renderLoading(h) {
			return <div>Loading while the loading prop on KtTable is true</div>
		},
		renderExpand(h, { row, rowIndex }) {
			return [
				<KtBanner message={'row.name'} icon="user" isGrey />,
				<KtBanner message={'row.address.line'} icon="global" isGrey />,
			]
		},
		renderActions(h, { row, rowIndex }) {
			return [
				<i class="yoco" onClick={() => this.showAlert(row.name, 'edited')}>
					edit
				</i>,
				<i class="yoco" onClick={() => this.showAlert(row.name, 'deleted')}>
					trash
				</i>,
			]
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
	},
}
</script>
