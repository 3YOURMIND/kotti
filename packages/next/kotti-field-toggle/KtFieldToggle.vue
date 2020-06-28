<template>
	<KtField v-bind="{ field }" :getEmptyValue="() => null">
		<div slot="container" class="kt-field-toggle__wrapper">
			<ToggleInner
				component="div"
				:inputProps="inputProps"
				:isDisabled="field.isDisabled"
				:type="type"
				:value="field.currentValue"
				@input="onInput"
			>
				<slot name="default" :value="field.currentValue" />
			</ToggleInner>
		</div>
	</KtField>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { KtField } from '../kotti-field'
import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField, useForceUpdate } from '../kotti-field/hooks'

import ToggleInner from './components/ToggleInner.vue'
import {
	KOTTI_FIELD_TOGGLE_SUPPORTS,
	KOTTI_FIELD_TOGGLE_PROPS,
} from './constants'
import { KottiFieldToggle } from './types'

export default defineComponent({
	name: 'KtFieldToggle',
	components: { KtField, ToggleInner },
	props: {
		...KOTTI_FIELD_PROPS,
		...KOTTI_FIELD_TOGGLE_PROPS,
	},
	setup(props: KottiFieldToggle.Props, { emit }) {
		const field = useField<boolean | null>({
			emit,
			isCorrectDataType: (value): value is boolean | null =>
				typeof value === 'boolean' || value === null,
			isEmpty: (value) => value !== true,
			props,
			supports: KOTTI_FIELD_TOGGLE_SUPPORTS,
		})

		const { forceUpdate, forceUpdateKey } = useForceUpdate()

		return {
			field,
			inputProps: computed(() => ({
				...field.inputProps,
				forceUpdateKey: forceUpdateKey.value,
			})),
			onInput: (newValue: boolean | undefined) => {
				field.setValue(newValue ?? null)

				forceUpdate()
			},
		}
	},
})
</script>

<style lang="scss">
.kt-field-toggle__wrapper {
	display: flex;
	align-items: center;
}
</style>
