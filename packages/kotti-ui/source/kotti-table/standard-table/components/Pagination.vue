<template>
	<div class="table-pagination">
		<div
			v-if="isLoading"
			class="table-pagination__loading skeleton rectangle"
		/>
		<template v-else>
			<span v-text="resultLabel" />
			<KtPagination
				v-if="rowCount > 0"
				:adjacentAmount="1"
				:page="pageIndex + 1"
				:pageSize="pageSize"
				pagingStyle="flex"
				:total="rowCount"
				@setPage="(value) => $emit('updatePageIndex', value - 1)"
			/>
		</template>
	</div>
</template>

<script lang="ts">
import { Dashes } from '@metatypes/typography'
import { computed, defineComponent } from 'vue'

import { useTranslationNamespace } from '../../../kotti-i18n/hooks'
import { makeProps } from '../../../make-props'
import { KottiStandardTable } from '../types'
import { pluralize } from '../utilities/translation'

export default defineComponent({
	name: 'TablePagination',
	props: makeProps(KottiStandardTable.TablePagination.propsSchema),
	emits: ['updatePageIndex'],
	setup(props) {
		const translations = useTranslationNamespace('KtStandardTable')

		return {
			resultLabel: computed(() => {
				const start = props.pageIndex * props.pageSize + 1
				const end = Math.min(start - 1 + props.pageSize, props.rowCount)

				return pluralize(translations.value.resultsCounter, props.rowCount, {
					range: `${start}${Dashes.EnDash}${end}`,
					total: props.rowCount,
				})
			}),
		}
	},
})
</script>

<style lang="scss" scoped>
.table-pagination {
	display: flex;
	column-gap: var(--unit-8);
	align-items: center;
	justify-content: flex-end;
	margin-left: auto;

	&__loading {
		width: 100%;
		height: 32px;
	}

	:deep(.kt-pagination__page-item) {
		margin-top: 0;
	}
}
</style>
