<template>
	<KtField
		v-bind="{ field }"
		:getEmptyValue="() => null"
		:helpTextSlot="$slots.helpText"
		isGroup
	>
		<div slot="container" :class="wrapperClasses">
			<div v-for="option of optionsWithChecked" :key="option.key">
				<ToggleInner
					component="label"
					:inputProps="getInputProps(option)"
					:isDisabled="field.isDisabled || Boolean(option.isDisabled)"
					:type="type"
					:value="option.value"
					@input="onInput(option.key, $event)"
				>
					<slot name="header" :option="option">
						<div v-text="option.label" />
					</slot>
					<FieldHelpText v-if="option.tooltip" :helpText="option.tooltip" />
				</ToggleInner>
				<slot name="content" :option="option" />
			</div>
		</div>
	</KtField>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { KtField } from '../kotti-field'
import FieldHelpText from '../kotti-field/components/FieldHelpText.vue'
import { useField, useForceUpdate } from '../kotti-field/hooks'
import { makeProps } from '../make-props'

import ToggleInner from './components/ToggleInner.vue'
import { KOTTI_FIELD_TOGGLE_SUPPORTS } from './constants'
import { KottiFieldToggleGroup } from './types'

export default defineComponent<KottiFieldToggleGroup.PropsInternal>({
	name: 'KtFieldToggleGroup',
	components: {
		FieldHelpText,
		KtField,
		ToggleInner,
	},
	props: makeProps(KottiFieldToggleGroup.propsSchema),
	setup(props: KottiFieldToggleGroup.PropsInternal, { emit }) {
		const field = useField<KottiFieldToggleGroup.Value>({
			emit,
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
			getInputProps: (option: KottiFieldToggleGroup.Entry) => {
				const fieldDataTest = field.inputProps['data-test']
				return {
					...field.inputProps,
					'data-test':
						option.dataTest ?? fieldDataTest
							? `${fieldDataTest}.${option.key}`
							: undefined,
					forceUpdateKey: forceUpdateKey.value,
				}
			},
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
					value: field.currentValue ? field.currentValue[option.key] : null,
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
