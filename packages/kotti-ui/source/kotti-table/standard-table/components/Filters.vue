<template>
	<KtPopover
		v-if="filters && filters.length > 0"
		:size="size"
		:trigger="isLoading ? 'manual' : 'click'"
	>
		<KtButton
			data-test="table-filter-edit-button"
			:disabled="isLoading"
			:icon="Yoco.Icon.CHEVRON_DOWN"
			iconPosition="right"
			:isLoading="isLoading"
			:label="translations.filters"
		/>
		<template #contextEscapeContent>
			<div class="table-filters">
				<FilterList
					:appliedFilters="appliedFilters"
					v-bind="{
						filters,
						isLoading,
					}"
					@update:appliedFilters="$emit('update:appliedFilters', $event)"
				/>
				<div class="table-filters__footer">
					<KtButton
						data-test="table-filter-clear-all-button"
						:disabled="isLoading"
						:label="translations.clearAll"
						type="text"
						@click="$emit('update:appliedFilters', [])"
					/>
				</div>
			</div>
		</template>
	</KtPopover>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import KtButton from '../../../kotti-button/KtButton.vue'
import { useTranslationNamespace } from '../../../kotti-i18n/hooks'
import KtPopover from '../../../kotti-popover/KtPopover.vue'
import type { KottiStandardTable } from '../types'

import FilterList from './FilterList.vue'

export default defineComponent({
	name: 'TableFilters',
	components: {
		FilterList,
		KtButton,
		KtPopover,
	},
	props: {
		appliedFilters: {
			default: () => [],
			type: Array as PropType<KottiStandardTable.AppliedFilter[]>,
		},
		filters: {
			default: () => [],
			type: Array as PropType<KottiStandardTable.FilterInternal[]>,
		},
		isLoading: { default: false, type: Boolean },
		size: { default: 'md', type: String },
	},
	emits: ['update:appliedFilters'],
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
	// KtPopover padding reset
	margin: calc(-1 * var(--unit-2));

	&__footer {
		padding: var(--unit-2);
		text-align: end;
	}
}
</style>
