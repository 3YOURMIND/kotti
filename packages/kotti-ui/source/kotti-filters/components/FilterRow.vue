<template>
	<KtForm
		class="kt-filter-row"
		:formId="dataTest"
		hideValidation
		:isLoading="isLoading"
		:size="KottiField.Size.SMALL"
		style="display: contents"
		:value="filter"
		@input="handleSetFilter"
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
			:icon="Yoco.Icon.CLOSE"
			:isLoading="isLoading"
			:type="KottiFilters.ButtonLinkType.DANGER"
			@click="handleRemove"
		/>
	</KtForm>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent } from '@vue/composition-api'

import { KottiField } from '../../kotti-field/types'
import { KtFieldCurrency } from '../../kotti-field-currency'
import { KtFieldDateRange } from '../../kotti-field-date'
import { KtFieldNumber } from '../../kotti-field-number'
import { KtFieldMultiSelect } from '../../kotti-field-select'
import { KtFieldSingleSelect } from '../../kotti-field-select'
import { KottiFieldSingleSelect } from '../../kotti-field-select/types'
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
	},
	props: {
		column: {
			default: null,
			type: Object,
		},
		columnOptions: {
			required: true,
			type: Array,
		},
		dataTest: {
			default: null,
			type: String,
		},
		filter: {
			default: () => ({
				key: null,
			}),
			type: Object,
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
	setup(
		props: {
			column: KottiFilters.Column.Any | null
			columnOptions: KottiFieldSingleSelect.Props['options']
			dataTest: string | null
			filter: KottiFilters.Filter
			isFirstItem: boolean
			isLoading: boolean
		},
		{ emit },
	) {
		const translations = useTranslationNamespace('KtFilters')

		const operationOptions = computed(() =>
			props.column ? getOperationOptions(props.column) : [],
		)

		const handleRemove = () => emit('remove')
		const handleSetFilter = (newFilter: KottiFilters.InternalFilter) => {
			if (!props.column) {
				emit('input', newFilter)
				return
			}

			if (isEmptyOperation(newFilter.operation, props.column?.type)) {
				emit('input', {
					...newFilter,
					value: getFilterEmptyValue(props.column.type),
				})
				return
			}

			emit('input', newFilter)
		}

		return {
			handleRemove,
			handleSetFilter,
			isOperationSelectDisabled: computed(
				() => operationOptions.value.length <= 1,
			),
			isValueFieldVisible: computed(
				() =>
					props.filter &&
					props.column &&
					!isEmptyOperation(props.filter.operation, props.column.type),
			),
			KottiField,
			KottiFilters,
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
				collapseTagsAfter:
					props.column?.type === KottiFilters.FilterType.MULTI_ENUM ||
					props.column?.type === KottiFilters.FilterType.SINGLE_ENUM
						? 1
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
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.kt-filter-row {
	&__wrapper {
		display: contents;

		@media (width <= $size-md) {
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

		@media (width <= $size-md) {
			grid-column: 2;
		}
	}

	::v-deep .kt-field-select {
		margin-bottom: 0;
	}
}
</style>
