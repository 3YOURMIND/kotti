<template>
	<div
		v-if="isEditing"
		class="kt-field-inline-edit__confirm-icon yoco"
		@click.stop="handleConfirm"
		v-text="Yoco.Icon.CHECK"
	/>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	props: {
		isEditing: { type: Boolean, required: true },
	},
	setup(_, { emit }) {
		return {
			handleConfirm: () => {
				emit('confirm')
			},
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-field-inline-edit__confirm-icon {
	font-weight: bold;
	cursor: pointer;
	color: var(--text-01);
	padding-left: 0.8rem;

	&:hover {
		color: var(--interactive-01-hover);
	}
	&:active {
		color: var(--interactive-03);
	}
}
</style>
