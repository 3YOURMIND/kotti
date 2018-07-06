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

`rows` is an `Array` of `Object`s that represent a `row`.

<ShowCase>

<div slot="vue">

```html
<KtTable :rows="rows" :columns="columns" />
```

```js
{
	columns: [
		{ label: 'Name',    key: 'name' },
		{ label: 'Date',    key: 'date' },
		{ label: 'Address', key: 'address' },
	],
	rows: [
		{ date: '2016-05-03', name: 'Tom',     address: 'No. 119, Grove St, Los Angeles' },
		{ date: '2016-05-02', name: 'Jackson', address: 'No. 89, Grove St, Los Angeles' },
		{ date: '2016-05-04', name: 'Fen',     address: 'No. 182, Grove St, Los Angeles' },
		{ date: '2016-05-01', name: 'Fexiang', address: 'No. 189, Grove St, Los Angeles' },
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


## Width

In most cases the table is the same width as its parent. You can also specify the column width in `columns`.

<KtTable :rows="rows" :columns="columnsWidth" />

```js
{
	columns: [
		{ key: 'name',    label: 'Name',    width: '30%' },
		{ key: 'date',    label: 'Date',    width: '20%' },
		{ key: 'address', label: 'Address', width: '50%' },
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

<KtTable :rows="rows" :columns="columnsDefault" isScrollable />

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

## Actions

`actions` adds hover actions to the table. Using `actions` slot to define the action template.

`slot-scope` can be used to pass the properties of each row.

<KtTable :rows="rows" :columns="columnsResponsive" hasActions>
	<div slot-scope="row" slot="actions">
		<i class="yoco" @click="showAlert(row.data.name, 'edited')">edit</i>
		<i class="yoco" @click="showAlert(row.data.name, 'deleted')">trash</i>
	</div>
</KtTable>

```html
<KtTable :rows="rows" :columns="columns" hasActions>
	<div slot-scope="row" slot="actions">
		<i class="yoco" @click="showAlert(row.data.name, 'edited')">edit</i>
		<i class="yoco" @click="showAlert(row.data.name, 'deleted')">trash</i>
	</div>
</KtTable>
```

## Expandable

`isExpandable` enables expandability of the row, you can create template in `expand` slot. Same as `actions`, `slot-scope` can be used to pass the properties of each row.

<KtTable :rows="rows" :columns="columnsResponsive" isExpandable isScrollable>
	<div slot-scope="row" slot="expand">
		<KtBanner :message="row.data.name" icon="user" :isGrey="true"/>
		<KtBanner :message="row.data.address" icon="global" :isGrey="true"/>
	</div>
</KtTable>

```html
<KtTable :rows="rows" :columns="columns" isExpandable isScrollable>
	<div slot-scope="row" slot="expand">
		<KtBanner :message="row.data.name" icon="user" :isGrey="true"/>
		<KtBanner :message="row.data.address" icon="global" :isGrey="true"/>
	</div>
</KtTable>
```

## Usage

### Attributes

| Attribute            | Description                                 | Type                        | Accepted values                 | Default |
|:---------------------|:--------------------------------------------|:----------------------------|:--------------------------------|:--------|
| `columns.align`      | alignment of column text                    | `String`                    | `"center"`, `"left"`, `"right"` | `left`  |
| `columns.key`        | used to match the value in `rows`           | `String`                    | —                               | —       |
| `columns.label`      | table column header                         | `String`                    | —                               | —       |
| `columns.responsive` | control responsive display                  | `String`                    | —                               | —       |
| `columns.width`      | width                                       | `String`                    | `10%`, `100px`                  | `auto`  |
| `columns`            | table column information                    | `Array`                     | —                               | —       |
| `emptyText`          | text to show when table is empty            | `String`                    | —                               | —       |
| `hasActions`         | add hover actions to the table              | `Boolean`                   | —                               | `false` |
| `isExpandable`       | allow row expanding                         | `Boolean`                   | —                               | `false` |
| `isInteractive`      | allow clicking/keyboard focusing table rows | `Boolean`                   | —                               | `false` |
| `isScrollable`       | allow horizontal table scrolling            | `Boolean`                   | —                               | `false` |
| `isSelectable`       | enable select option of table               | `Boolean`                   | —                               | `false` |
| `rows`               | table row data                              | `Array`                     | —                               | —       |
| `tdClasses`          | classes to apply to all `<td>` elements     | `Array`, `String`, `Object` | `"responsive"`                  | `[]`    |
| `thClasses`          | classes to apply to all `<th>` elements     | `Array`, `String`, `Object` | `"responsive"`                  | `[]`    |
| `trClasses`          | classes to apply to all `<tr>` elements     | `Array`, `String`, `Object` | `"responsive"`                  | `[]`    |
| `value`              | —                                           | `Array`                     | —                               | —       |

### Events

| Event Name     | Arguments       | Description                                                         |
|:---------------|:----------------|:--------------------------------------------------------------------|
| `@activateRow` | `(data, index)` | Row was clicked or activated via keyboard. Requires `isInteractive` |

### Slots

| Slot Name | Description                |
|:----------|:---------------------------|
| `actions` | action section of each row |
| `expand`  | expand section of each row |
</template>

<script>
import KtBanner from '../../../packages/kotti-banner'
import KtTable from '../../../packages/kotti-table'
import ShowCase from '../../components/ShowCase'

export default {
	name: 'Tables',
	components: {
		KtBanner,
		KtTable,
		ShowCase,
	},
	methods: {
		showAlert(value, model) {
			alert(`${value} is ${model}!`)
		},
	},
	data() {
		return {
			select: [0, 1],
			columnsDefault: [
				{ key: 'name', label: 'Name' },
				{ key: 'date', label: 'Date' },
				{ key: 'address', label: 'Address' },
			],
			columnsAlign: [
				{ key: 'name', label: 'Name', align: 'left' },
				{ key: 'date', label: 'Date', align: 'center' },
				{ key: 'address', label: 'Address', align: 'right' },
			],
			columnsResponsive: [
				{ key: 'name', label: 'Name', responsive: 'hide-sm' },
				{ key: 'date', label: 'Date', responsive: 'hide-md' },
				{ key: 'address', label: 'Address' },
			],
			columnsWidth: [
				{ key: 'name', label: 'Name', width: '30%' },
				{ key: 'date', label: 'Date', width: '20%' },
				{ key: 'address', label: 'Address', width: '50%' },
			],
			rows: [
				{
					address: 'No. 119, Grove St, Los Angeles',
					date: '2016-05-03',
					name: 'Tom',
				},
				{
					address: 'No. 89, Grove St, Los Angeles',
					date: '2016-05-02',
					name: 'Jackson',
				},
			],
		}
	},
}
</script>
