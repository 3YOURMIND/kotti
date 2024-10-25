<template>
	<div class="kt-standard-table">
		<slot name="default" />
		<div class="kt-standard-table__footer">
			<span v-text="'Items per page'" />
			<KtFieldSingleSelect
				:options="pageOptions"
				:value="itemsPerPage"
				@input="setItemsPerPage"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { KtFieldSingleSelect } from '../kotti-field-select'
import { KottiFieldSingleSelect } from '../kotti-field-select/types'
import { KottiStandardTable } from './types'
import { makeProps } from '../make-props'

export default defineComponent({
	name: 'KtStandardTable',
	components: {
		KtFieldSingleSelect,
	},
	props: makeProps(KottiStandardTable.propsSchema),
	setup(props, { emit }) {
		return {
			pageOptions: props.itemsPerPageOptions.map((value) => ({
				value,
				label: String(value),
			})) satisfies KottiFieldSingleSelect.Props['options'],
			setItemsPerPage: (value: number) => {
				emit('update:itemsPerPage', value)
			},
		}
	},
})
</script>
