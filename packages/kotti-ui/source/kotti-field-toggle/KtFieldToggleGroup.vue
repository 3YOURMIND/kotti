<template>
	<KtField
		v-bind="{ field }"
		:getEmptyValue="() => null"
		:helpTextSlot="$slots.helpText"
		isGroup
	>
		<div slot="container" :class="wrapperClasses">
			<ToggleInner
				v-for="option of optionsWithChecked"
				:key="option.key"
				component="label"
				:inputProps="inputProps"
				:isDisabled="field.isDisabled || Boolean(option.isDisabled)"
				:type="type"
				:value="option.value"
				@input="onInput(option.key, $event)"
			>
				<div v-text="option.label" />
				<FieldHelpText v-if="option.tooltip" :helpText="option.tooltip" />
			</ToggleInner>
		</div>
	</KtField>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { KtField } from '../kotti-field'
import FieldHelpText from '../kotti-field/components/FieldHelpText.vue'
import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField, useForceUpdate } from '../kotti-field/hooks'

import ToggleInner from './components/ToggleInner.vue'
import {
	KOTTI_FIELD_TOGGLE_GROUP_PROPS,
	KOTTI_FIELD_TOGGLE_SUPPORTS,
} from './constants'
import { KottiFieldToggleGroup } from './types'

export default defineComponent({
	name: 'KtFieldToggleGroup',
	components: {
		FieldHelpText,
		KtField,
		ToggleInner,
	},
	props: {
		...KOTTI_FIELD_PROPS,
		...KOTTI_FIELD_TOGGLE_GROUP_PROPS,
		value: { default: null, type: Object },
	},
	setup(props: KottiFieldToggleGroup.Props, { emit }) {
		const field = useField<KottiFieldToggleGroup.Value>({
			emit,
			isCorrectDataType: (value): value is KottiFieldToggleGroup.Value =>
				typeof value === 'object' &&
				value !== null &&
				Object.values(value).every(
					(value) => typeof value === 'boolean' || value === null,
				),
			isEmpty: (value) =>
				value !== null &&
				typeof value === 'object' &&
				Object.values(value).every((value) => value !== true),
			props,
			supports: KOTTI_FIELD_TOGGLE_SUPPORTS,
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			inputProps: computed(() => ({
				...field.inputProps,
				forceUpdateKey: forceUpdateKey.value,
				'kt-field-radio-group__wrapper--inline': props.isInline,
			})),
			onInput: (
				key: KottiFieldToggleGroup.Entry['key'],
				newValue: boolean | undefined,
			) => {
				field.setValue({
					...field.currentValue,
					[key]: newValue ?? null,
				})
				forceUpdate()
			},
			optionsWithChecked: computed(() =>
				props.options.map((option) => ({
					...option,
					value: field.currentValue[option.key],
				})),
			),
			wrapperClasses: computed(() => ({
				'kt-field-toggle-group__wrapper': true,
				'kt-field-toggle-group__wrapper--inline': props.isInline,
			})),
		}
	},
})
</script>

<style lang="scss">
.kt-field-toggle-group__wrapper {
	display: flex;

	&--inline {
		flex-direction: row;

		> *:not(:first-child) {
			margin-left: 1rem;
		}
	}

	&:not(&--inline) {
		flex-direction: column;

		> *:not(:first-child) {
			margin-top: 0.4rem;
		}
	}
}
</style>
