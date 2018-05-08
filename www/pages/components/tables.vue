<template lang="md">
# Tables

## Elements
![Table Elements](~/assets/img/tables_overview.png)

1. **Table Heading:** The table heading uses the same style as the `label text`. The heading should express the content of each column.
2. **Table row:** The row content uses `default text` style.
3. **Table Hover Action Button:** The table rows can imply further functionality when they are hovered over.

## Basic

In order to user table, you need give `tableData` and `columns` data to `KtTable` component.

<KtTable :tableData="tableData" :columns="tableColumns1" />

`columns` define the column of the table, `label` is the header text of table, `key` will be used to find the value from `tableData`.

`tableData` is the data of each row.

<ShowCase>

<div slot="vue">

```html
<KtTable :tableData="tableData" :columns="tableColumns" />
```

```js
tableColumns: [
	{
		label: 'Name',
		key: 'name',
	},
	{
		label: 'Date',
		key: 'date',
	},
	{
		label: 'Address',
		key: 'address',
	},
],
tableData: [
	{
		date: '2016-05-03',
		name: 'Tom',
		address: 'No. 119, Grove St, Los Angeles',
	},
	{
		date: '2016-05-02',
		name: 'Jackson',
		address: 'No. 89, Grove St, Los Angeles',
	},
	{
		date: '2016-05-04',
		name: 'Fen',
		address: 'No. 182, Grove St, Los Angeles',
	},
	{
		date: '2016-05-01',
		name: 'Fexiang',
		address: 'No. 189, Grove St, Los Angeles',
	},
],
```

</div>

<div slot="style">

```html
<table>
	<thead>
		<th>NAME</th>
		<th>Date</th>
		<th>ADDRESS</th>
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

<KtTable :tableData="tableData" :columns="tableColumnsWidth" />

```js
tableColumns: [
	{
		label: 'Name',
		key: 'name',
		width: 30
	},
	{
		label: 'Date',
		key: 'date',
		width: 20
	},
	{
		label: 'Address',
		key: 'address',
		width: 50
	},
],
```

## Content alignment

Content should be left aligned except some common alignment style, such as price, currency.

<KtTable :tableData="tableData" :columns="tableColumnsAlign" />

`align` in `columns` decide the alignment of each column. 

## Responsive

When display space is limited, some columns should be hidden depending on the importance of the content.

`responsive` in `columns` has five break point to hide the column. 

<KtTable :tableData="tableData" :columns="tableColumns" />

When content should not be hidden, using horizontal scrolling is a better alternative.
`xScroll` will enable x-scrolling for the table.

<KtTable :tableData="tableData" :columns="tableColumns1" xScroll/>

```html
<KtTable :tableData="tableData" :columns="tableColumns1" xScroll/>
```

## Selectable

`selectable` enables mutilple select option of the table. You can bind an `Arrary` model to `KtTable`, and control the select data.

<div>
	<KtTable :tableData="tableData" :columns="tableColumns" selectable v-model="select" />
	Selected value: {{select}}
</div>

```html
<KtTable :tableData="tableData" :columns="tableColumns" selectable v-model="select" />
```

```js
data() {
	return {
		select: [0, 1]
	}
}
```

## Actions

`actions` adds hover actions to the table. Using `actions` slot to define the action template.

`slot-scope` can be used to pass the properties of each row. 

<KtTable :tableData="tableData" :columns="tableColumns" actions>
	<div slot-scope="rowsProps" slot="actions">
	<i class="yoco" @click="showAlert(rowsProps.row.name, 'edited')">edit</i>
	<i class="yoco" @click="showAlert(rowsProps.row.name, 'deleted')">trash</i> 
	</div>
</KtTable>

```html
<KtTable :tableData="tableData" :columns="tableColumns" actions>
	<div slot-scope="rowsProps" slot="actions">
	<i class="yoco" @click="showAlert(rowsProps.row.name, 'edited')">edit</i>
	<i class="yoco" @click="showAlert(rowsProps.row.name, 'deleted')">trash</i> 
	</div>
</KtTable>
```


## Expandable

`expandable` enable expandability of the row, you can create template in `expand` slot. Same as `actions`, `slot-scope` can be used to pass the properties of each row. 

<KtTable :tableData="tableData" :columns="tableColumns" expandable xScroll>
<div slot-scope="expandProps" slot="expand">
	<KtBanner :message="expandProps.row.name" icon="user" :isGrey="true"/>
	<KtBanner :message="expandProps.row.address" icon="global" :isGrey="true"/>
</div>
</KtTable>

```html
<KtTable :tableData="tableData" :columns="tableColumns" expandable xScroll>
<div slot-scope="expandProps" slot="expand">
	<KtBanner :message="expandProps.row.name" icon="user" :isGrey="true"/>
	<KtBanner :message="expandProps.row.address" icon="global" :isGrey="true"/>
</div>
</KtTable>
```



## Usage

### Attributes

| Attribute | Description | Type | Accepted values | Default |
| ---- | ---- | ---- | ---- | ---- |
| tableData | table row data | `Array` | - | - |
| columns | table column information | `Arrary` | - | - |
| columns.label | table column header | `String` | - | - |
| columns.key | used to match the value in `tableData` | `String` | - | - |
| columns.width | width percentage | `Number` | - | `null` |
| columns.align | alignment of column | `String` | `center`, `left`, `right` | `left` |
| columns.responsive | control responsive display | `String` | - | - |
| xScroll | allow scroll table horizontal | `Boolean` | - | `false` |
| selectable | enable select option of table | `Boolean` | - | `false` |
| expandable | allow row expanding | `Boolean` | - | `false` |
| actions | add hover actions to the table | `Boolean` | - | `false` |

### Slots

| Slot Name | Description |
| --------- | ----------- |
| expand | expand section of each row |
| actions | action section of each row |


</template>

<script>
import KtTable from '../../../packages/kotti-table';
import KtBanner from '../../../packages/kotti-banner';
import ShowCase from '../../components/ShowCase';

export default {
	name: 'Tables',
	components: {
		KtTable,
		KtBanner,
		ShowCase,
	},
	methods: {
		showAlert(val, model) {
			alert(`${val} is ${model}!`);
		},
	},
	data() {
		return {
			select: [0, 1],
			tableColumns1: [
				{
					label: 'Name',
					key: 'name',
				},
				{
					label: 'Date',
					key: 'date',
				},
				{
					label: 'Address',
					key: 'address',
				},
			],
			tableColumnsWidth: [
				{
					label: 'Name',
					key: 'name',
					width: 10,
				},
				{
					label: 'Date',
					key: 'date',
					width: 40,
				},
				{
					label: 'Address',
					key: 'address',
					width: 50,
				},
			],
			tableColumnsAlign: [
				{
					label: 'Name',
					key: 'name',
					align: 'left',
				},
				{
					label: 'Date',
					key: 'date',
					align: 'center',
				},
				{
					label: 'Address',
					key: 'address',
					align: 'right',
				},
			],
			tableColumns: [
				{
					label: 'Name',
					key: 'name',
					responsive: 'hide-sm',
				},
				{
					label: 'Date',
					key: 'date',
					responsive: 'hide-md',
				},
				{
					label: 'Address',
					key: 'address',
				},
			],
			tableData: [
				{
					date: '2016-05-03',
					name: 'Tom',
					address: 'No. 119, Grove St, Los Angeles',
				},
				{
					date: '2016-05-02',
					name: 'Jackson',
					address: 'No. 89, Grove St, Los Angeles',
				},
			],
		};
	},
};
</script>
