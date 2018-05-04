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
<KtTable :data="tableData" :columns="tableColumns" selectable  v-model="select">
  <button>Hello</button>
</KtTable>
{{select}}
</div>

</template>

<script>
import KtTable from '../../../packages/kotti-table-column/table.vue';
import KtTableColumn from '../../../packages/kotti-table-column/table-column.vue';

export default {
	name: 'Tables',
	components: {
		KtTableColumn,
		KtTable,
	},
	data() {
		return {
			select: [],
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
