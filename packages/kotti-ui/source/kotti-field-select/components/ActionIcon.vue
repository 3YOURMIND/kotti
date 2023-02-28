<template>
	<div :class="containerClasses">
		<i
			v-if="showClear"
			class="yoco"
			role="button"
			@click.stop="handleClear()"
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
import { Yoco } from '@3yourmind/yoco'
import { defineComponent, computed } from 'vue'

export default defineComponent({
	name: 'ActionIcon',
	props: {
		classes: { required: true, type: Array },
		handleClear: { required: true, type: Function },
		isDropdownOpen: { required: true, type: Boolean },
		showClear: { required: true, type: Boolean },
	},
	setup(
		props: {
			classes: string[]
			handleClear(): void
			isDropdownOpen: boolean
			showClear: boolean
		},
		{ emit },
	) {
		return {
			containerClasses: computed(() => [
				...props.classes,
				'action-icon__container',
			]),
			handleSetIsDropdownOpen: () =>
				emit('update:isDropdownOpen', !props.isDropdownOpen),
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
