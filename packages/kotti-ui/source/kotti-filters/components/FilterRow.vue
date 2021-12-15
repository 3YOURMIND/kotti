<template>
	<KtForm
		class="kt-filter__list__row"
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
			<KtFieldSingleSelect
				formKey="operation"
				hideClear
				:isDisabled="isOperationSelectDisabled"
				:options="operationOptions"
			/>
			<div :class="valueContainerClasses">
				<component
					:is="valueComponent"
					v-if="isValueFieldVisible"
					:collapseTagsAfter="1"
					formKey="value"
					:minimum="Number.MIN_SAFE_INTEGER"
					:options="valueOptions"
					:prefix="valuePrefix"
					:step="valueStep"
				/>
			</div>
		</div>
		<ButtonLink
			class="kt-filter__list__row__remove"
			:data-test="dataTest ? `${dataTest}-remove` : undefined"
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
	KtFieldDateRange,
	KtFieldMultiSelect,
	KtFieldNumber,
	KtFieldSingleSelect,
	KtFieldText,
	KtFieldToggle,
	KtForm,
} from '../../'
import { KottiFieldNumber } from '../../kotti-field-number/types'
import { KottiFieldSingleSelect } from '../../kotti-field-select/types'
import { KottiField } from '../../kotti-field/types'
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
			default: (): KottiFilters.Filter => ({
				key: null,
				operation: null,
				value: null,
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

		const label = computed<string>(() =>
			props.isFirstItem
				? translations.value.whereLabel
				: translations.value.andLabel,
		)
		const operationOptions = computed<KottiFieldSingleSelect.Props['options']>(
			() => {
				if (!props.column) return []
				return getOperationOptions(props.column)
			},
		)
		const valueComponent = computed(() => {
			if (!props.column?.type) return null
			return getValueComponent(props.column.type)
		})
		const valueOptions = computed(() => {
			switch (props.column?.type) {
				case KottiFilters.FilterType.SINGLE_ENUM:
				case KottiFilters.FilterType.MULTI_ENUM:
					return props.column.options
				default:
					return []
			}
		})
		const valuePrefix = computed<KottiFieldNumber.Props['prefix']>(() =>
			props.column?.type === KottiFilters.FilterType.CURRENCY
				? props.column.prefix
				: null,
		)
		const valueStep = computed<KottiFieldNumber.Props['step']>(() => {
			switch (props.column?.type) {
				case KottiFilters.FilterType.CURRENCY:
				case KottiFilters.FilterType.FLOAT:
					return props.column.step
				case KottiFilters.FilterType.INTEGER:
				// fall through
				default:
					return 1
			}
		})
		const isOperationSelectDisabled = computed<boolean>(
			() => operationOptions.value.length <= 1,
		)
		const isValueFieldVisible = computed(
			() => !isEmptyOperation(props.filter.operation, props.column?.type),
		)
		const valueContainerClasses = computed(() => ({
			'kt-filter__list__row__value-field': true,
			'kt-filter__list__row__value-field--is-vertically-centered':
				props.column?.type === KottiFilters.FilterType.BOOLEAN,
		}))

		const handleRemove = () => emit('remove')
		const handleSetFilter = (newFilter: KottiFilters.InternalFilter) => {
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
			isOperationSelectDisabled,
			isValueFieldVisible,
			KottiField,
			KottiFilters,
			label,
			operationOptions,
			valueComponent,
			valueContainerClasses,
			valueOptions,
			valuePrefix,
			valueStep,
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
		&--is-vertically-centered {
			display: flex;
			align-items: center;

			min-height: var(--unit-8);
		}
	}

	&__remove {
		align-self: center;
	}

	::v-deep .kt-field {
		margin-bottom: 0;
	}
}
</style>
