<template>
	<div class="table-page-size">
		<span v-text="translations.rowsPerPage" />
		<KtFieldSingleSelect
			class="table-page-size__selector"
			dataTest="table-page-size-selector"
			hideClear
			:isLoading="isLoading"
			isUnsorted
			:options="options"
			size="small"
			:value="pageSize"
			@input="$emit('updatePageSize', $event)"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useTranslationNamespace } from '../../../kotti-i18n/hooks'
import type { KottiFieldSingleSelect } from '../../../kotti-field-select/types'
import { makeProps } from '../../../make-props'

import { KottiStandardTable } from '../types'

export default defineComponent({
	name: 'TablePageSize',
	props: makeProps(KottiStandardTable.TablePageSize.propsSchema),
	emits: ['updatePageSize'],
	setup(props) {
		return {
			options: computed<KottiFieldSingleSelect.Props['options']>(() =>
				props.pageSizeOptions.map((value) => ({
					value,
					label: String(value),
				})),
			),
			translations: useTranslationNamespace('KtStandardTable'),
		}
	},
})
</script>

<style lang="scss" scoped>
.table-page-size {
	display: flex;
	column-gap: var(--unit-4);
	align-items: center;

	&__selector {
		min-width: 96px;
	}
}
</style>
