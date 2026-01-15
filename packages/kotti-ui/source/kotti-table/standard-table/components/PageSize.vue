<template>
	<div class="table-page-size">
		<span v-text="translations.itemsPerPage" />
		<KtFieldSingleSelect
			class="table-page-size__selector"
			dataTest="table-page-size-selector"
			hideClear
			:isLoading="isLoading"
			:modelValue="pageSize"
			:options="options"
			size="small"
			@input="$emit('update:pageSize', $event)"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'

import KtFieldSingleSelect from '../../../kotti-field-select/KtFieldSingleSelect.vue'
import type { KottiFieldSingleSelect } from '../../../kotti-field-select/types'
import { useTranslationNamespace } from '../../../kotti-i18n/hooks'

export default defineComponent({
	name: 'TablePageSize',
	components: {
		KtFieldSingleSelect,
	},
	props: {
		isLoading: { default: false, type: Boolean },
		pageSize: { required: true, type: Number },
		pageSizeOptions: { required: true, type: Array as PropType<number[]> },
	},
	emits: ['update:pageSize'],
	setup(props) {
		return {
			options: computed<KottiFieldSingleSelect.Props['options']>(() =>
				props.pageSizeOptions.map((value) => ({
					dataTest: `table-page-size-options-${value}`,
					label: String(value),
					value,
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
