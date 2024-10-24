<template>
	<KtField
		v-bind="{ field: fieldProps }"
		:helpTextSlot="showHelpTextAsInnerSuffix ? undefined : $slots.helpText"
		useFieldset
	>
		<template #container>
			<div class="kt-field-toggle">
				<ToggleInner
					component="label"
					:inputProps="inputProps"
					:isDisabled="fieldProps.isDisabled"
					:type="type"
					:value="fieldProps.currentValue"
					@input="onInput"
				>
					<div class="kt-field-toggle__content">
						<slot name="default" :value="fieldProps.currentValue" />
						<div
							v-if="showHelpTextAsInnerSuffix"
							class="kt-field__header kt-field__header--is-suffix"
						>
							<div class="kt-field__header__label">
								<span :class="labelSuffixClasses" v-text="labelSuffix" />
							</div>
						</div>
					</div>
				</ToggleInner>
				<div
					v-if="showHelpTextAsInnerSuffix && hasHelpText"
					class="kt-field__header kt-field__header--is-suffix"
				>
					<div
						class="kt-field__header__help-text"
						:class="iconClasses('header__help-text', ['interactive'])"
					>
						<FieldHelpText
							:helpText="helpText"
							:helpTextSlot="$slots.helpText"
						/>
					</div>
				</div>
			</div>
		</template>
	</KtField>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { KtField } from '../kotti-field'
import FieldHelpText from '../kotti-field/components/FieldHelpText.vue'
import { useField, useForceUpdate } from '../kotti-field/hooks'
import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'
import ToggleInner from '../shared-components/toggle-inner/ToggleInner.vue'

import { KOTTI_FIELD_TOGGLE_SUPPORTS } from './constants'
import { KottiFieldToggle } from './types'

export default defineComponent({
	name: 'KtFieldToggle',
	components: {
		FieldHelpText,
		KtField,
		ToggleInner,
	},
	props: makeProps(KottiFieldToggle.propsSchema),
	emits: ['input'],
	setup(props, { emit, slots }) {
		const field = useField<KottiFieldToggle.Value>({
			emit,
			isEmpty: (value) => value !== true,
			props,
			supports: KOTTI_FIELD_TOGGLE_SUPPORTS,
		})
		const helpText = computed(() => field.helpText)
		const showHelpTextAsInnerSuffix = computed(
			() => Boolean(slots.default) && props.label === null,
		)

		const validationType = computed(() => field.validation.type)
		const showValidation = computed(
			() => !(field.hideValidation || validationType.value === 'empty'),
		)

		const { forceUpdate, forceUpdateKey } = useForceUpdate()
		const translations = useTranslationNamespace('KtFields')

		return {
			fieldProps: computed(() => ({
				...field,
				helpText: showHelpTextAsInnerSuffix.value ? null : helpText.value,
			})),
			hasHelpText: computed(
				() => Boolean(slots.helpText) || helpText.value !== null,
			),
			iconClasses: computed(
				() => (element: string, modifications: string[]) => [
					`kt-field__${element}__icon`,
					...modifications.map(
						(modification) => `kt-field__${element}__icon--${modification}`,
					),
				],
			),
			inputProps: computed(() => ({
				...field.inputProps,
				forceUpdateKey: forceUpdateKey.value,
			})),
			labelSuffix: computed(() =>
				field.isOptional ? `(${translations.value.optionalLabel})` : '*',
			),
			labelSuffixClasses: computed(() => {
				return {
					'kt-field__header__label__suffix': true,
					'kt-field__header__label__suffix--error':
						showValidation.value && !field.isOptional && field.isEmpty,
				}
			}),
			onInput: (newValue: boolean | undefined) => {
				if (!field.isDisabled && !field.isLoading)
					field.setValue(newValue ?? null)

				forceUpdate()
			},
			showHelpTextAsInnerSuffix,
		}
	},
})
</script>

<style lang="scss">
.kt-field-toggle {
	display: flex;
	align-items: center;

	&__content {
		display: flex;
		align-items: center;
	}
}
</style>
