<template>
	<div class="kt-field-toggle-switch" :class="toggleClasses">
		TODO: :(
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

export default defineComponent({
	name: 'ToggleSwitch',
	props: {
		value: { required: true, type: Boolean },
	},
	setup(props) {
		return {
			toggleClasses: computed(() => ({
				'kt-field-toggle--on': props.value,
			})),
		}
	},
})
</script>

<style lang="scss"></style>
