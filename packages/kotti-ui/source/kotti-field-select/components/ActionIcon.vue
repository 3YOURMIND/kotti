<template>
	<div :class="containerClasses">
		<i
			v-if="showClear"
			class="yoco"
			role="button"
			@click.stop="handleClear"
			v-text="Yoco.Icon.CLOSE"
		/>
		<i
			class="yoco"
			role="button"
			@click.stop.prevent="handleSetIsDropdownOpen"
			@mousedown.stop.prevent
			v-text="isDropdownOpen ? Yoco.Icon.CHEVRON_UP : Yoco.Icon.CHEVRON_DOWN"
		/>
	</div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'

import { Yoco } from '@3yourmind/yoco'

export default defineComponent({
	name: 'ActionIcon',
	props: {
		classes: { required: true, type: Array as PropType<Array<string>> },
		handleClear: { required: true, type: Function as PropType<() => void> },
		isDropdownOpen: { required: true, type: Boolean },
		showClear: { required: true, type: Boolean },
	},
	emits: ['update:isDropdownOpen'],
	setup(props, { emit }) {
		return {
			containerClasses: computed(() => [
				...props.classes,
				'action-icon__container',
			]),
			handleSetIsDropdownOpen: () => {
				emit('update:isDropdownOpen', !props.isDropdownOpen)
			},
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.action-icon__container {
	display: flex;
	justify-content: center;
}
</style>
