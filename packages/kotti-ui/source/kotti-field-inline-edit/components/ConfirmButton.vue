<template>
	<button
		v-if="isEditing"
		class="kt-field-inline-edit__confirm-icon yoco"
		:tabindex="tabIndex"
		@click.stop="handleConfirm"
		@keyup.enter.stop
		v-text="Yoco.Icon.CHECK"
	/>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	props: {
		isEditing: { type: Boolean, required: true },
		tabIndex: { type: Number, default: 0 },
	},
	setup(_, { emit }) {
		return {
			handleConfirm: () => emit('confirm'),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-field-inline-edit__confirm-icon {
	display: flex;
	align-items: center;
	align-self: center;
	justify-content: center;

	border: none;
	border-radius: var(--field-border-radius);
	background: none;
	padding: var(--unit-2);
	margin-left: var(--unit-2);
	color: var(--text-01);
	cursor: pointer;
	font-weight: bold;

	&:hover,
	&:focus-within {
		color: var(--interactive-01-hover);
		background-color: var(--ui-05);
	}
	&:active {
		color: var(--interactive-03);
	}
}
</style>
