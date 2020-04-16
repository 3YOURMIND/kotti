<template>
	<label class="ktfield-wrapper">
		<div class="ktfield-label" v-text="labelText" />
		<div class="ktfield-form-group">
			<slot name="default" />
		</div>
	</label>
</template>

<script lang="ts">
import { defineComponent, computed } from '@vue/composition-api'

import { KottiField } from './types'

export default defineComponent({
	name: 'KtField',
	props: {
		field: { required: true, type: Object },
	},
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	setup(props: { field: KottiField.Returns<any> }) {
		const labelText = computed(() =>
			props.field.label.value === null
				? null
				: [
						props.field.label.value,
						props.field.isOptional.value ? '(Optional)' : '(Required)',
				  ].join(' '),
		)

		return {
			labelText,
		}
	},
})
</script>

<style lang="scss" scoped>
.ktfield-wrapper {
	display: flex;
	flex-direction: column;

	.ktfield-label {
		color: gray;
	}

	.ktfield-form-group {
		padding: 8px;
		border-radius: 4px;
	}

	> * + * {
		margin-top: 8px;
	}
}

.ktfield-form-group {
	border: 1px solid red;
}
</style>
