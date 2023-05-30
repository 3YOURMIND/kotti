<template>
	<KtForm
		class="kt-filter__list__row"
		:formId="dataTest"
		hideValidation
		:isLoading="isLoading"
		:size="KottiField.Size.SMALL"
		style="display: contents"
		:value="filter"
		@input="handleSetFilter"
	>
		<div class="kt-filter__list__row__wrapper">
			<span class="kt-filter__list__row__label" v-text="label" />
			<KtFieldSingleSelect formKey="key" hideClear :options="columnOptions" />
			<template v-if="filter.operation">
				<KtFieldSingleSelect
					formKey="operation"
					hideClear
					:isDisabled="isOperationSelectDisabled"
					:options="operationOptions"
				/>
				<div class="kt-filter__list__row__value-field">
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
			class="kt-filter__list__row__remove"
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

import {
	KtFieldCurrency,
	KtFieldDateRange,
	KtFieldMultiSelect,
	KtFieldNumber,
	KtFieldSingleSelect,
	KtFieldText,
	KtFieldToggle,
	KtForm,
} from '../../'
import { KottiField } from '../../kotti-field/types'
import { KottiFieldSingleSelect } from '../../kotti-field-select/types'
import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { KottiFilters } from '../types'
import {
	getFilterEmptyValue,
	getOperationOptions,
	getValueComponent,
	isEmptyOperation,
} from '../utils'

import ButtonLink from './ButtonLink.vue'

export default defineComponent<{
	column: KottiFilters.Column.Any | null
	columnOptions: KottiFieldSingleSelect.Props['options']
	dataTest: string | null
	filter: KottiFilters.Filter
	isFirstItem: boolean
	isLoading: boolean
}>({
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
	setup(props, { emit }) {
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
					props.column?.type === KottiFilters.FilterType.FLOAT
						? props.column.maximum
						: undefined,
				minimum:
					props.column?.type === KottiFilters.FilterType.FLOAT
						? props.column.minimum
						: undefined,
				options:
					props.column?.type === KottiFilters.FilterType.MULTI_ENUM ||
					props.column?.type === KottiFilters.FilterType.SINGLE_ENUM
						? props.column.options
						: undefined,
				prefix:
					props.column?.type === KottiFilters.FilterType.FLOAT
						? props.column.prefix
						: undefined,
				step:
					props.column?.type === KottiFilters.FilterType.FLOAT
						? props.column.step
						: undefined,
				suffix:
					props.column?.type === KottiFilters.FilterType.FLOAT
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

.kt-filter__list__row {
	&__wrapper {
		display: contents;

		@media (max-width: $size-md) {
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

		@media (max-width: $size-md) {
			grid-column: 2;
		}
	}

	::v-deep .kt-field-select {
		margin-bottom: 0;
	}
}
</style>
