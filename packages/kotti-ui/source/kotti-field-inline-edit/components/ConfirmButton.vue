<template>
	<KtButton
		v-bind="buttonProps"
		class="kt-field-inline-edit__confirm-button"
		@click.stop.prevent="handleConfirm"
		@keyup.enter.stop.prevent="handleConfirm"
	/>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'ConfirmButton',
	props: {
		tabIndex: { type: Number, default: 0 },
		dataTest: { type: String, default: null },
	},
	setup(props, { emit }) {
		return {
			buttonProps: computed(() => ({
				['data-test']: props.dataTest ? `${props.dataTest}.confirm` : undefined,
				icon: Yoco.Icon.CHECK,
				tabindex: props.tabIndex,
			})),
			handleConfirm: () => emit('confirm'),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-field-inline-edit__confirm-button {
	display: flex;
	flex: 1;
}
</style>
