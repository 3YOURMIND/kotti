<template>
	<KtField :field="field">
		<input type="text" :value="field.currentValue.value" @input="onInput" />
	</KtField>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import KtField from '../kotti-field'
import { ktFieldProps } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'

import { KtFieldTextProps } from './types'

export default defineComponent({
	name: 'KtFieldText',
	components: { KtField },
	props: {
		...ktFieldProps,
	},
	setup(props: KtFieldTextProps) {
		const field = useField<string | null>(props)

		return {
			field,
			// FIXME:
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			onInput: (event: any) => {
				const newValue = event.target.value
				field.setValue.value(newValue === '' ? null : newValue)
			},
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
