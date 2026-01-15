<template>
	<KtForm
		class="kt-filter-row"
		:formId="dataTest ?? undefined"
		hideValidation
		:isLoading="isLoading"
		:modelValue="filter"
		size="small"
		style="display: contents"
		@update:modelValue="handleSetFilter"
	>
		<div class="kt-filter-row__wrapper">
			<span class="kt-filter-row__label" v-text="label" />
			<KtFieldSingleSelect formKey="key" hideClear :options="columnOptions" />
			<template v-if="filter.operation">
				<KtFieldSingleSelect
					formKey="operation"
					hideClear
					:isDisabled="isOperationSelectDisabled"
					:options="operationOptions"
				/>
				<div class="kt-filter-row__value-field">
					<component
						:is="valueComponent"
						v-if="isValueFieldVisible"
						v-bind="valueComponentProps"
						formKey="value"
					/>
				</div>
			</template>
		</div>
		<ButtonLink
			class="kt-filter-row__remove"
			:dataTest="dataTest ? `${dataTest}.remove` : undefined"
			icon="close"
			:isLoading="isLoading"
			type="danger"
			@click="handleRemove"
		/>
	</KtForm>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'

import { KtFieldCurrency } from '../../kotti-field-currency'
import { KtFieldDateRange } from '../../kotti-field-date'
import { KtFieldNumber } from '../../kotti-field-number'
import { KtFieldMultiSelect } from '../../kotti-field-select'
import { KtFieldSingleSelect } from '../../kotti-field-select'
import type { KottiFieldSingleSelect } from '../../kotti-field-select/types'
import { KtFieldText } from '../../kotti-field-text'
import { KtFieldToggle } from '../../kotti-field-toggle'
import { KtForm } from '../../kotti-form'
import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { KottiFilters } from '../types'
import {
	getFilterEmptyValue,
	getOperationOptions,
	getValueComponent,
	isEmptyOperation,
} from '../utils'

import ButtonLink from './ButtonLink.vue'

export default defineComponent({
	name: 'FilterRow',
	components: {
		ButtonLink,
		KtFieldCurrency,
		KtFieldDateRange,
		KtFieldMultiSelect,
		KtFieldNumber,
		KtFieldSingleSelect,
		KtFieldText,
		KtFieldToggle,
		KtForm,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
	} as any,
	props: {
		column: {
			default: null,
			type: Object as PropType<KottiFilters.Column.Any | null>,
		},
		columnOptions: {
			required: true,
			type: Array as PropType<KottiFieldSingleSelect.Props['options']>,
		},
		dataTest: {
			default: null,
			type: String as PropType<string | null>,
		},
		filter: {
			default: () => ({
				key: null,
			}),
			type: Object as PropType<KottiFilters.Filter>,
		},
		isFirstItem: {
			default: false,
			type: Boolean,
		},
		isLoading: {
			default: false,
			type: Boolean,
		},
	},
	emits: ['update:modelValue', 'remove'],
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtFilters')

		const operationOptions = computed(() =>
			props.column ? getOperationOptions(props.column) : [],
		)

		const handleRemove = () => {
			emit('remove')
		}
		const handleSetFilter = (newFilter: KottiFilters.InternalFilter) => {
			if (!props.column) {
				emit('update:modelValue', newFilter)
				return
			}

			if (isEmptyOperation(newFilter.operation, props.column.type)) {
				emit('update:modelValue', {
					...newFilter,
					value: getFilterEmptyValue(props.column.type),
				})
				return
			}

			emit('update:modelValue', newFilter)
		}

		return {
			handleRemove,
			handleSetFilter,
			isOperationSelectDisabled: computed(
				() => operationOptions.value.length <= 1,
			),
			isValueFieldVisible: computed(
				() =>
					props.column &&
					!isEmptyOperation(props.filter.operation, props.column.type),
			),
			label: computed(() =>
				props.isFirstItem
					? translations.value.whereLabel
					: translations.value.andLabel,
			),
			operationOptions,
			valueComponent: computed(() => {
				if (!props.column?.type) return null
				return getValueComponent(props.column.type)
			}),
			// eslint-disable-next-line sonarjs/cognitive-complexity
			valueComponentProps: computed(() => ({
				clearOnSelect:
					props.column?.type === KottiFilters.FilterType.MULTI_ENUM
						? props.column.clearOnSelect
						: undefined,
				collapseTagsAfter:
					props.column?.type === KottiFilters.FilterType.MULTI_ENUM
						? props.column.collapseTagsAfter
						: undefined,
				currency:
					props.column?.type === KottiFilters.FilterType.CURRENCY
						? props.column.currency
						: undefined,
				decimalPlaces:
					props.column?.type === KottiFilters.FilterType.FLOAT
						? props.column.decimalPlaces
						: props.column?.type === KottiFilters.FilterType.INTEGER
							? 0
							: undefined,
				isUnsorted:
					props.column?.type === KottiFilters.FilterType.MULTI_ENUM ||
					props.column?.type === KottiFilters.FilterType.SINGLE_ENUM
						? props.column.isUnsorted
						: undefined,
				maximum:
					props.column?.type === KottiFilters.FilterType.FLOAT ||
					props.column?.type === KottiFilters.FilterType.INTEGER
						? props.column.maximum
						: undefined,
				maximumDate:
					props.column?.type === KottiFilters.FilterType.DATE_RANGE
						? props.column.maximumDate
						: undefined,
				minimum:
					props.column?.type === KottiFilters.FilterType.FLOAT ||
					props.column?.type === KottiFilters.FilterType.INTEGER
						? props.column.minimum
						: undefined,
				minimumDate:
					props.column?.type === KottiFilters.FilterType.DATE_RANGE
						? props.column.minimumDate
						: undefined,
				options:
					props.column?.type === KottiFilters.FilterType.MULTI_ENUM ||
					props.column?.type === KottiFilters.FilterType.SINGLE_ENUM
						? props.column.options
						: undefined,
				prefix:
					props.column?.type === KottiFilters.FilterType.FLOAT ||
					props.column?.type === KottiFilters.FilterType.INTEGER
						? props.column.prefix
						: undefined,
				shortcuts:
					props.column?.type === KottiFilters.FilterType.DATE_RANGE
						? props.column.shortcuts
						: undefined,
				step:
					props.column?.type === KottiFilters.FilterType.FLOAT
						? props.column.step
						: undefined,
				suffix:
					props.column?.type === KottiFilters.FilterType.FLOAT ||
					props.column?.type === KottiFilters.FilterType.INTEGER
						? props.column.suffix
						: undefined,
			})),
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables';

.kt-filter-row {
	&__wrapper {
		display: contents;

		@media (width < $size-md) {
			display: unset;

			> * {
				padding-bottom: var(--unit-1);
			}
		}
	}

	&__label {
		display: flex;
		align-items: center;
		color: var(--text-02);
	}

	&__value-field {
		margin: auto 0;
	}

	&__remove {
		grid-column: 5;
		align-self: center;

		@media (width < $size-md) {
			grid-column: 2;
		}
	}

	:deep(.kt-field-select) {
		margin-bottom: 0;
	}
}
</style>
