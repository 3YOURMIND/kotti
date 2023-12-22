<template>
	<KtField
		v-bind="{ field: fieldProps }"
		:helpTextSlot="showInnerSuffix ? undefined : $slots.helpText"
	>
		<div slot="container" class="kt-field-toggle">
			<ToggleInner
				component="div"
				:inputProps="inputProps"
				:isDisabled="fieldProps.isDisabled"
				:type="type"
				:value="fieldProps.currentValue"
				@click="onClick"
				@input="onInput"
			>
				<div class="kt-field-toggle__content" @click="onClick">
					<slot name="default" :value="fieldProps.currentValue" />
					<ToggleInnerSuffix
						v-if="showInnerSuffix"
						:helpText="suffixHelpText"
						:helpTextSlot="$slots.helpText"
						:hideValidation="fieldProps.hideValidation"
						:isEmpty="fieldProps.isEmpty"
						:isOptional="fieldProps.isOptional"
						:validation="fieldProps.validation"
					/>
				</div>
			</ToggleInner>
		</div>
	</KtField>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { KtField } from '../kotti-field'
import { useField, useForceUpdate } from '../kotti-field/hooks'
import { makeProps } from '../make-props'

import ToggleInner from './components/ToggleInner.vue'
import ToggleInnerSuffix from './components/ToggleInnerSuffix.vue'
import { KOTTI_FIELD_TOGGLE_SUPPORTS } from './constants'
import { KottiFieldToggle } from './types'

export default defineComponent({
	name: 'KtFieldToggle',
	components: {
		KtField,
		ToggleInner,
		ToggleInnerSuffix,
	},
	props: makeProps(KottiFieldToggle.propsSchema),
	setup(props: KottiFieldToggle.PropsInternal, { emit, slots }) {
		const field = useField<KottiFieldToggle.Value>({
			emit,
			isEmpty: (value) => value !== true,
			props,
			supports: KOTTI_FIELD_TOGGLE_SUPPORTS,
		})
		const showInnerSuffix = computed(
			() => Boolean(slots.default) && props.label === null,
		)

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			fieldProps: computed(() => ({
				...field,
				helpText: showInnerSuffix.value ? null : field.helpText,
			})),
			inputProps: computed(() => ({
				...field.inputProps,
				forceUpdateKey: forceUpdateKey.value,
			})),
			onClick: () => {
				const inputEl = document.getElementById(field.inputProps.id)
				inputEl?.click()
			},
			onInput: (newValue: boolean | undefined) => {
				if (!field.isDisabled && !field.isLoading)
					field.setValue(newValue ?? null)

				forceUpdate()
			},
			showInnerSuffix,
			suffixHelpText: computed(() => field.helpText),
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
