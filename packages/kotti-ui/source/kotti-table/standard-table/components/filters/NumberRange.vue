<template>
	<div class="number-range-filter">
		<div v-if="filter.label" class="number-range-filter__header">
			<legend class="number-range-filter__label">
				<span v-text="filter.label" />
			</legend>
		</div>
		<div class="number-range-filter__field">
			<KtFieldNumber
				v-bind="minFieldProps"
				@blur="onMinInputBlur"
				@input="onMinValueInput"
			/>
			<KtFieldNumber
				v-bind="maxFieldProps"
				@blur="onMaxInputBlur"
				@input="onMaxValueInput"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import isEqual from 'lodash/isEqual'
import { computed, defineComponent, ref, watch } from 'vue'

import type { KottiFieldNumber } from '../../../../kotti-field-number/types'
import { useTranslationNamespace } from '../../../../kotti-i18n/hooks'
import { makeProps } from '../../../../make-props'
import { KottiStandardTable } from '../../types'
import { reOrderRange } from '../../utilities/filters'

export default defineComponent({
	name: 'NumberRangeFilter',
	props: makeProps(KottiStandardTable.NumberRangeFilter.propsSchema),
	emits: ['input'],
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtStandardTable')

		const range = ref<[KottiFieldNumber.Value, KottiFieldNumber.Value]>([
			null,
			null,
		])

		const reOrderAndEmitRangeValue = () => {
			range.value = reOrderRange(range.value)
			emit('input', range.value, props.filter.id)
		}

		watch(
			() => props.value,
			(newRange) => {
				if (!isEqual(newRange, range.value))
					range.value = [newRange[0], newRange[1]]
			},
			{ immediate: true },
		)

		return {
			maxFieldProps: computed(() => ({
				dataTest: [props.filter.dataTest, 'max-value-input']
					.filter(Boolean)
					.join('.'),
				decimalPlaces: props.filter.decimalPlaces,
				hideChangeButtons: true,
				isLoading: props.isLoading,
				isOptional: true,
				placeholder: translations.value.max,
				prefix: props.filter.unit,
				value: range.value[1],
			})),
			minFieldProps: computed(() => ({
				dataTest: [props.filter.dataTest, 'min-value-input']
					.filter(Boolean)
					.join('.'),
				decimalPlaces: props.filter.decimalPlaces,
				hideChangeButtons: true,
				isLoading: props.isLoading,
				isOptional: true,
				placeholder: translations.value.min,
				prefix: props.filter.unit,
				value: range.value[0],
			})),
			onMaxInputBlur: (newMax: KottiFieldNumber.Value) => {
				if (props.value[1] !== newMax) reOrderAndEmitRangeValue()
			},
			onMinInputBlur: (newMin: KottiFieldNumber.Value) => {
				if (props.value[0] !== newMin) reOrderAndEmitRangeValue()
			},
			onMaxValueInput: (newMax: KottiFieldNumber.Value) => {
				range.value = [range.value[0], newMax]
			},
			onMinValueInput: (newMin: KottiFieldNumber.Value) => {
				range.value = [newMin, range.value[1]]
			},
		}
	},
})
</script>

<style lang="scss" scoped>
.number-range-filter {
	display: flex;
	flex-direction: column;
	gap: var(--unit-2);

	&__field {
		display: flex;
		gap: var(--unit-4);
		align-items: center;

		::v-deep .kt-field {
			flex: 1 1 auto;
			margin-bottom: 0;
		}
	}

	&__header {
		display: flex;
		font-size: 0.9em;
	}

	&__label {
		display: flex;
		align-items: center;
		color: var(--text-02);

		span {
			font-weight: 500;
		}
	}
}
</style>
