<template>
	<div>
		<table>
			<thead>
				<tr
					v-for="headerGroup in table.getHeaderGroups()"
					:key="headerGroup.id"
				>
					<th
						v-for="header in headerGroup.headers"
						:key="header.id"
						:colSpan="header.colSpan"
					>
						<FlexRender
							v-if="!header.isPlaceholder"
							:render="header.column.columnDef.header"
							:props="{ ...header.getContext() }"
						/>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="row in table.getRowModel().rows" :key="row.id">
					<td v-for="cell in row.getVisibleCells()" :key="cell.id">
						<FlexRender
							:render="cell.column.columnDef.cell"
							:props="{ ...cell.getContext() }"
						/>
					</td>
				</tr>
			</tbody>
			<tfoot>
				<tr
					v-for="footerGroup in table.getFooterGroups()"
					:key="footerGroup.id"
				>
					<th
						v-for="header in footerGroup.headers"
						:key="header.id"
						:colSpan="header.colSpan"
					>
						<FlexRender
							v-if="!header.isPlaceholder"
							:render="header.column.columnDef.footer"
							:props="{ ...header.getContext() }"
						/>
					</th>
				</tr>
			</tfoot>
		</table>
		<div class="h-4" />
		<button @click="rerender" class="border p-2">Rerender</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FlexRender, useVueTable } from './tanstack-table'
import { getCoreRowModel, createColumnHelper } from '@tanstack/table-core'
import { ref } from 'vue'

type Person = {
	firstName: string
	lastName: string
	age: number
	visits: number
	status: string
	progress: number
}

const defaultData: Person[] = [
	{
		firstName: 'tanner',
		lastName: 'linsley',
		age: 24,
		visits: 100,
		status: 'In Relationship',
		progress: 50,
	},
	{
		firstName: 'tandy',
		lastName: 'miller',
		age: 40,
		visits: 40,
		status: 'Single',
		progress: 80,
	},
	{
		firstName: 'joe',
		lastName: 'dirte',
		age: 45,
		visits: 20,
		status: 'Complicated',
		progress: 10,
	},
]

const columnHelper = createColumnHelper<Person>()

export default defineComponent({
	name: 'KtTable',
	components: { FlexRender },
	setup() {
		const columns = [
			columnHelper.group({
				header: 'Name',
				footer: (props) => props.column.id,
				columns: [
					columnHelper.accessor('firstName', {
						cell: (info) => info.getValue(),
						footer: (props) => props.column.id,
					}),
					columnHelper.accessor((row) => row.lastName, {
						id: 'lastName',
						cell: (info) => info.getValue(),
						header: () => 'Last Name',
						footer: (props) => props.column.id,
					}),
				],
			}),
			columnHelper.group({
				header: 'Info',
				footer: (props) => props.column.id,
				columns: [
					columnHelper.accessor('age', {
						header: () => 'Age',
						footer: (props) => props.column.id,
					}),
					columnHelper.group({
						header: 'More Info',
						columns: [
							columnHelper.accessor('visits', {
								header: () => 'Visits',
								footer: (props) => props.column.id,
							}),
							columnHelper.accessor('status', {
								header: 'Status',
								footer: (props) => props.column.id,
							}),
							columnHelper.accessor('progress', {
								header: 'Profile Progress',
								footer: (props) => props.column.id,
							}),
						],
					}),
				],
			}),
		]

		const data = ref(defaultData)

		const rerender = () => {
			data.value = defaultData
		}

		const table = useVueTable({
			get data() {
				return data.value
			},
			columns,
			getCoreRowModel: getCoreRowModel(),
		})

		console.log(table.value.getHeaderGroups())
		console.log(table.value.getRowModel())
		console.log(table.value.getFooterGroups())

		return {
			rerender,
			table,
		}
	},
})
</script>
