<template>
	<KtField v-bind="{ field }" :getEmptyValue="() => null">
		<ElSelect
			:disabled="field.isDisabled"
			filterable
			:placeholder="field.placeholder"
			:value="field.currentValue"
			@change="onChange"
		>
			<ElOption
				v-for="option in options"
				:key="option.value"
				:label="option.label"
				:value="option.value"
			/>
		</ElSelect>
	</KtField>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'
import { Select as ElSelect, Option as ElOption } from 'element-ui'

import KtField from '../kotti-field'
import { ktFieldProps } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'

// import 'element-ui/lib/theme-chalk/index.css'
import { KtFieldSingleSelect } from './types'

export default defineComponent({
	name: 'KtFieldSingleSelect',
	components: { ElOption, ElSelect, KtField },
	props: {
		...ktFieldProps,
		options: {
			required: true,
			type: Array,
			validator: (
				value: unknown[],
			): value is KtFieldSingleSelect.Props['options'] =>
				value.every(
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					(option: any): option is KtFieldSingleSelect.Entry =>
						typeof option === 'object' &&
						option !== null &&
						typeof option.label === 'string' &&
						(option.value === null ||
							['string', 'number', 'boolean'].includes(typeof option.value)),
				),
		},
	},
	setup(props: KtFieldSingleSelect.Props, { emit }) {
		const field = useField<KtFieldSingleSelect.Value>({
			emit,
			isCorrectDataType: (value): value is KtFieldSingleSelect.Value =>
				['string', 'number', 'boolean'].includes(typeof value) ||
				value === null,
			props,
		})

		return {
			field,
			onChange: (value: KtFieldSingleSelect.Entry['value']) => {
				field.setValue(value)
			},
		}
	},
})
</script>
