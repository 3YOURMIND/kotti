<template lang="md">
# Tables

## Elements
![Table Elements](~/assets/img/tables_overview.png)

1. **Table Heading:** The table heading uses the same style as the `label text`. The heading should express the content of each column.
2. **Table row:** The row content uses `default text` style.
3. **Table Hover Action Button:** The table rows can imply further functionality when they are hovered over.

<table>
  <tr>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>Default</td>
    <td>Default style of table</td>
  </tr>
  <tr>
    <td>Table Actions</td>
    <td>With addtional action buttons</td>
    <td class="table-actions">
      <i class="yoco">edit</i>
      <i class="yoco">trash</i>
    </td>
  </tr>
</table>

```html
<table>
  <tr>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
      <td>Default</td>
      <td>Default style of table</td>
  </tr>
  <tr>
    <td>Table Actions</td>
    <td>With addtional action buttons</td>
    <td class="table-actions">
      <i class="yoco">edit</i>
      <i class="yoco">trash</i>
    </td>
  </tr>
</table>
```

## Width

In most cases the table is the same width as its parent.

## Content alignment

Content should be left aligned except some common alignment style, such as price, currency.

## Responsive

When display space is limited, some columns should be hidden depending on the importance of the content.

When content should not be hidden, using horizontal scrolling is a better alternative.
<div>
<KtTable :tableData="tableData" :columns="tableColumns" actions selectable v-model="select">
<div slot-scope="rowsProps" slot="actions">
<i class="yoco" @click="showAlert(rowsProps.row.name, 'edited')">edit</i>
<i class="yoco" @click="showAlert(rowsProps.row.name, 'deleted')">trash</i>
</div>
</KtTable>
Selected value: {{select}}

<KtTable :tableData="tableData" :columns="tableColumns" expand>
<div slot-scope="expandProps" slot="expand">
	<KtBanner :message="expandProps.row.name" icon="user" :isGrey="true"/>
	<KtBanner :message="expandProps.row.address" icon="global" :isGrey="true"/>
</div>
</KtTable>
</div>


</template>

<script>
import KtTable from '../../../packages/kotti-table/table.vue';
import KtBanner from '../../../packages/kotti-banner';

export default {
	name: 'Tables',
	components: {
		KtTable,
		KtBanner,
	},
	methods: {
		showAlert(val, model) {
			alert(`${val} is ${model}!`);
		},
	},
	data() {
		return {
			select: [0, 1],
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
		};
	},
};
</script>
