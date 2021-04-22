<template>
	<KtForm
		class="kt-filter__list__row"
		hideValidation
		:isLoading="isLoading"
		:size="Kotti.Field.Size.SMALL"
		:value="value"
		@input="handleSetValue"
	>
		<span class="kt-filter__list__row__label" v-text="label" />
		<KtFieldSingleSelect
			class="kt-filter__list__row__column-select"
			formKey="key"
			hideClear
			:options="columnOptions"
		/>
		<KtFieldSingleSelect
			class="kt-filter__list__row__operation-select"
			formKey="operation"
			hideClear
			:isDisabled="isOperationSelectDisabled"
			:options="operationOptions"
		/>
		<div :class="valueContainerClasses">
			<component
				:is="valueComponent"
				:collapseTagsAfter="1"
				formKey="value"
				:options="valueOptions"
				type="switch"
			/>
			<span v-if="showValueState" v-text="valueState" />
		</div>
		<ButtonLink
			class="kt-filter__list__row__remove"
			:icon="Yoco.Icon.CLOSE"
			:isLoading="isLoading"
			:type="Kotti.Filter.ButtonLinkType.DANGER"
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
import { useTranslationNamespace } from '../../kotti-translation/hooks'
import { Kotti } from '../../types'
import { getOperationOptions, getValueComponent } from '../utils'

import ButtonLink from './ButtonLink.vue'

export default defineComponent<{
	column: Kotti.Filter.Column | null
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
			default: null,
			type: Object,
		},
		columnOptions: {
			required: true,
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

		const label = computed<string>(() =>
			props.isFirstItem
				? translations.value.whereLabel
				: translations.value.andLabel,
		)
		const operationOptions = computed<Kotti.FieldSingleSelect.Props['options']>(
			() => {
				if (!props.column?.type) return []
				return getOperationOptions(props.column.type)
			},
		)
		const valueComponent = computed(() => {
			if (!props.column?.type) return null
			return getValueComponent(props.column.type)
		})
		const valueOptions = computed(() => {
			if (!props.column?.type) return []
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
			() => props.column?.type === Kotti.Filter.FilterType.BOOLEAN,
		)
		const valueContainerClasses = computed(() => ({
			'kt-filter__list__row__value-field': true,
			'kt-filter__list__row__value-field--flex': showValueState.value,
		}))

		const valueState = computed<string | null>(() => {
			if (props.value.value === null) return translations.value.unsetLabel
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
			Kotti,
			label,
			operationOptions,
			showValueState,
			valueComponent,
			valueContainerClasses,
			valueOptions,
			valueState,
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-style/_variables.scss';

.kt-filter__list__row {
	display: grid;
	grid-template-areas: 'label column operation value remove';
	grid-template-columns: minmax(50px, auto) repeat(3, 1fr) 20px;
	grid-gap: 0.2rem;

	margin-bottom: $unit-2;

	@media (max-width: $size-md) {
		grid-template-areas:
			'label .'
			'column remove'
			'operation remove'
			'value remove';
		grid-template-columns: 1fr;
	}

	&__label {
		grid-area: label;

		color: var(--text-02);
	}

	&__column-select {
		grid-area: column;
	}

	&__operation-select {
		grid-area: operation;
	}

	&__value-field {
		grid-area: value;

		&--flex {
			display: flex;
			align-items: center;

			min-height: $unit-8;
		}
	}

	&__remove {
		grid-area: remove;

		align-self: center;
	}

	.kt-field {
		margin-bottom: 0;
	}
}
</style>
