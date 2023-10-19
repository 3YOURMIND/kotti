<template>
	<KtButton
		class="kt-field-inline-edit__confirm-button"
		:dataTest="confirmDataTest"
		:icon="Yoco.Icon.CHECK"
		:tabindex="tabIndex"
		@click.stop.prevent="handleConfirm"
		@keyup.enter.stop.prevent="handleConfirm"
	/>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
	name: 'ConfirmButton',
	props: {
		tabIndex: { type: Number, default: 0 },
		dataTest: { type: String, default: null },
	},
	setup(props, { emit }) {
		return {
			confirmDataTest: computed(() => `${props.dataTest}.confirm`),
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
