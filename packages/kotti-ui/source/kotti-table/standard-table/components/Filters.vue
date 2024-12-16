<template>
	<KtPopover
		v-if="filters && filters.length > 0"
		:size="size"
		:trigger="isLoading ? 'manual' : 'click'"
	>
		<KtButton
			:disabled="isLoading"
			:icon="Yoco.Icon.CHEVRON_DOWN"
			:isLoading="isLoading"
			:label="translations.editFilters"
		/>
		<template #content>
			<div class="table-filters">
				<FilterList
					class="table-filters__list"
					v-bind="{
						filters,
						isLoading,
						value,
					}"
					@input="$emit('input', $event)"
				/>
				<KtButton
					:disabled="isLoading"
					:label="translations.clearAll"
					type="text"
					@click="$emit('input', [])"
				/>
			</div>
		</template>
	</KtPopover>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { useTranslationNamespace } from '../../../kotti-i18n/hooks'
import type { KottiStandardTable } from '../types'

import FilterList from './FilterList.vue'

export default defineComponent({
	name: 'TableFilters',
	components: {
		FilterList,
	},
	props: {
		filters: {
			default: () => [],
			type: Array as PropType<KottiStandardTable.FilterInternal[]>,
		},
		isLoading: { default: false, type: Boolean },

		size: { default: 'md', type: String },
		value: {
			default: () => [],
			type: Array as PropType<KottiStandardTable.AppliedFilter[]>,
		},
	},
	emits: ['input'],
	setup() {
		return {
			translations: useTranslationNamespace('KtStandardTable'),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.table-filters {
	display: flex;
	flex-direction: column;
	max-height: 50vh;
	overflow-y: auto;

	&__list {
		margin-bottom: var(--unit-4);
	}

	:deep(.kt-button) {
		flex-shrink: 0;
		align-self: end;
	}
}
</style>
