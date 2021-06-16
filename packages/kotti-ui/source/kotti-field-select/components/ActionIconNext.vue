<template>
	<div
		:class="classes"
		role="button"
		@mouseenter="hoverOnClearIcon = true"
		@mouseleave="hoverOnClearIcon = false"
	>
		<i class="yoco" @click.stop="handleClear" v-text="icon" />
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { defineComponent, ref, computed } from '@vue/composition-api'

/**
 * eventually, when element-ui is no longer used (ActionIcon.vue is deleted) this should replace it.
 */
export default defineComponent<{
	classes: string[]
	handleClear(): void
	isDropdownOpen: boolean
	showClear: boolean
}>({
	name: 'ActionIconNext',
	props: {
		classes: { required: true, type: Array },
		handleClear: { required: true, type: Function },
		isDropdownOpen: { required: true, type: Boolean },
		showClear: { required: true, type: Boolean },
	},
	setup(props) {
		const hoverOnClearIcon = ref(false)

		return {
			hoverOnClearIcon,
			icon: computed(
				(): Yoco.Icon =>
					props.showClear && hoverOnClearIcon.value
						? Yoco.Icon.CLOSE
						: props.isDropdownOpen
						? Yoco.Icon.CHEVRON_UP
						: Yoco.Icon.CHEVRON_DOWN,
			),
		}
	},
})
</script>
