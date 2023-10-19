<template>
	<span
		class="kt-field-inline-edit__edit-icon yoco"
		:tabindex="-1"
		v-text="Yoco.Icon.EDIT"
	/>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	name: 'EditIcon',
	setup() {
		return {
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-field-inline-edit__edit-icon {
	display: flex;
	padding-right: var(--unit-2);
}
</style>
