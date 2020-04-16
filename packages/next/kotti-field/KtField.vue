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

import { ktFieldProps } from './constants'

export default defineComponent({
	name: 'KtField',
	props: ktFieldProps,
	setup() {
		// FIXME: Temporarily Hard-Coded
		const label = 'Some Label'
		const required = true

		const labelText = computed(() =>
			[label, required ? '(Required)' : '(Optional)'].join(' '),
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
