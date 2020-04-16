<template>
	<KtField :field="field">
		<input type="text" :value="field.currentValue.value" @input="onInput" />
	</KtField>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { ktFieldProps } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'

import { KtFieldTextProps } from './types'

export default defineComponent({
	name: 'KtFieldText',
	props: {
		...ktFieldProps,
		myCustom: { default: true, type: Boolean },
	},
	setup({ myCustom, ...fieldProps }: KtFieldTextProps) {
		const field = useField<string | null>(fieldProps)

		return {
			field,
			// FIXME: Find proper type. Thanks, Vue
			// urw, child
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onInput: (event: any) => {
				const newValue = event.target.value
				field.setValue.value(newValue === '' ? null : newValue)
			},
			somethingCustom: myCustom === true ? 'kek' : 'topkek',
		}
	},
})
</script>

<style lang="scss" scoped>
.ktfield-wrapper {
	display: flex;

	> * + * {
		margin-top: 8px;
	}
}

.ktfield-form-group {
	border: 1px solid red;
}
</style>
