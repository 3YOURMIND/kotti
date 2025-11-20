<template>
	<KtButton
		v-bind="buttonProps"
		class="kt-field-inline-edit__confirm-button"
		@click.stop.prevent="handleConfirm"
		@keyup.enter.stop.prevent="handleConfirm"
	/>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { KtButton } from '../../kotti-button'

export default defineComponent({
	name: 'ConfirmButton',
	components: {
		KtButton,
	},
	props: {
		dataTest: { default: null, type: String },
		tabIndex: { default: 0, type: Number },
	},
	emits: ['confirm'],
	setup(props, { emit }) {
		return {
			buttonProps: computed(() => ({
				['data-test']: props.dataTest ? `${props.dataTest}.confirm` : undefined,
				icon: Yoco.Icon.CHECK,
				tabindex: props.tabIndex,
			})),
			handleConfirm: () => {
				emit('confirm')
			},
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
