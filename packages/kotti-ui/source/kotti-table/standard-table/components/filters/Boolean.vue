<template>
	<KtFieldToggle
		:data-test="filter.dataTest"
		:isLoading="isLoading"
		isOptional
		:label="filter.label"
		:modelValue="modelValue"
		size="small"
		type="switch"
		@update:modelValue="onUpdateModelValue"
	>
		<span v-if="slotLabel" v-text="slotLabel" />
	</KtFieldToggle>
</template>

<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'

import KtFieldToggle from '../../../../kotti-field-toggle/KtFieldToggle.vue'
import type { KottiStandardTable } from '../../types'

export default defineComponent({
	name: 'BooleanFilter',
	components: {
		KtFieldToggle,
	},
	props: {
		filter: {
			required: true,
			type: Object as PropType<
				KottiStandardTable.FilterInternal & {
					type: KottiStandardTable.FilterType.BOOLEAN
				}
			>,
		},
		isLoading: { default: false, type: Boolean },
		modelValue: { default: null, type: Boolean as PropType<boolean | null> },
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		return {
			onUpdateModelValue: (value: KottiStandardTable.FilterValue) => {
				emit('update:modelValue', {
					id: props.filter.id,
					operation: props.filter.operations[0], // Current filters support only one operation
					value,
				})
			},
			slotLabel: computed(() => {
				if (!props.filter.slotLabels || props.modelValue === null) {
					return null
				}
				const index = props.modelValue ? 1 : 0
				return props.filter.slotLabels[index]
			}),
		}
	},
})
</script>
