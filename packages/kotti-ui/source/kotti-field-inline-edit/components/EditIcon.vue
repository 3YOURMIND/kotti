<template>
	<div :class="rootClasses" :tabindex="-1" v-text="Yoco.Icon.EDIT" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { Yoco } from '@3yourmind/yoco'

export default defineComponent({
	name: 'EditIcon',
	props: {
		isDisabled: { type: Boolean, default: false },
	},
	setup(props) {
		return {
			rootClasses: computed(() => ({
				'kt-field-inline-edit__edit-icon': true,
				'kt-field-inline-edit__edit-icon--disabled': props.isDisabled,
				yoco: true,
			})),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-field-inline-edit__edit-icon {
	display: flex;
	font-size: var(--unit-4);

	&--disabled {
		color: var(--text-05);
	}
}
</style>
