<template>
	<KtForm class="kt-filter-row" :value="value" @input="handleSetValue">
		<span class="kt-filter-row__prefix" v-text="prefix" />
		<KtFieldSingleSelect
			class="kt-filter-row__column-select"
			formKey="key"
			hideClear
			hideValidation
			:isLoading="isLoading"
			:options="columnOptions"
			size="small"
		/>
		<KtFieldSingleSelect
			class="kt-filter-row__operation-select"
			formKey="operation"
			hideClear
			hideValidation
			:isDisabled="isOperationSelectDisabled"
			:isLoading="isLoading"
			:options="operationOptions"
			size="small"
		/>
		<div :class="valueContainerClass">
			<component
				:is="valueComponent"
				:collapseTagsAfter="1"
				formKey="value"
				hideValidation
				:isLoading="isLoading"
				:options="valueOptions"
				size="small"
				type="switch"
			/>
			<span v-if="showValueState" v-text="valueState" />
		</div>
		<ButtonLink :icon="Yoco.Icon.CLOSE" @click="handleRemove" />
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
import { useTranslationNamespace } from '../../kotti-translation/hooks'
import { Kotti } from '../../types'
import { getOperationOptions, getValueComponent } from '../utils'

import ButtonLink from './ButtonLink.vue'

export default defineComponent<{
	column: Kotti.Filter.Column
	columnOptions: Kotti.FieldSingleSelect.Props['options']
	isFirstItem: boolean
	isLoading: boolean
	value: Kotti.Filter.Filter
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
			default: () => ({}),
			type: Object,
		},
		columnOptions: {
			default: () => [],
			type: Array,
		},
		isFirstItem: {
			default: false,
			type: Boolean,
		},
		isLoading: {
			default: false,
			type: Boolean,
		},
		value: {
			default: () => ({
				key: null,
				operation: null,
				value: null,
			}),
			type: Object,
		},
	},
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtFilter')

		const prefix = computed<string>(() =>
			props.isFirstItem
				? translations.value.whereLabel
				: translations.value.andLabel,
		)
		const operationOptions = computed<Kotti.FieldSingleSelect.Props['options']>(
			() => {
				if (!props.column.type) return []
				return getOperationOptions(props.column.type)
			},
		)
		const valueComponent = computed(() => {
			if (!props.column.type) return 'div'
			return getValueComponent(props.column.type)
		})
		const valueOptions = computed(() => {
			if (!props.column.type) return []
			switch (props.column.type) {
				case Kotti.Filter.FilterType.SINGLE_ENUM:
				case Kotti.Filter.FilterType.MULTI_ENUM:
					return props.column.options
				default:
					return []
			}
		})
		const isOperationSelectDisabled = computed<boolean>(
			() => operationOptions.value.length <= 1,
		)
		const showValueState = computed<boolean>(
			() => props.column.type === Kotti.Filter.FilterType.BOOLEAN,
		)
		const valueContainerClass = computed<string>(() => {
			if (showValueState.value)
				return 'kt-filter-row__value-field kt-filter-row__value-field--flex'
			return 'kt-filter-row__value-field'
		})
		const valueState = computed<string | null>(() => {
			if (props.value.value === null) return null
			return props.value.value
				? translations.value.enabledLabel
				: translations.value.disabledLabel
		})

		const handleRemove = () => emit('remove')
		const handleSetValue = (value: Kotti.Filter.InternalFilter) =>
			emit('input', value)

		return {
			handleRemove,
			handleSetValue,
			isOperationSelectDisabled,
			operationOptions,
			prefix,
			showValueState,
			valueComponent,
			valueContainerClass,
			valueOptions,
			valueState,
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.kt-filter-row {
	display: flex;
	align-items: center;

	&__prefix {
		flex: 1 0 50px;
		padding-right: $unit-2;
	}

	&__column-select {
		flex: 1 1 180px;
		padding-right: $unit-2;
	}

	&__operation-select {
		flex: 1 1 200px;
		padding-right: $unit-2;
	}

	&__value-field {
		flex: 1 1 200px;
		padding-right: $unit-2;

		&--flex {
			display: flex;
		}
	}

	.kt-field {
		margin-bottom: 0;
	}
}
</style>
