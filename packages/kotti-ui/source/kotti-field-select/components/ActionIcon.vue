<template>
	<div
		:class="classes"
		role="button"
		@mouseenter="hoverOnClearIcon = true"
		@mouseleave="hoverOnClearIcon = false"
	>
		<i class="yoco" @click.stop="handleClearIfShown" v-text="icon" />
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { defineComponent, ref, computed } from '@vue/composition-api'

export default defineComponent<{
	classes: string[]
	handleClear(): void
	isDropdownOpen: boolean
	showClear: boolean
}>({
	name: 'ActionIcon',
	props: {
		classes: { required: true, type: Array },
		handleClear: { required: true, type: Function },
		isDropdownOpen: { required: true, type: Boolean },
		showClear: { required: true, type: Boolean },
	},
	setup(props) {
		const hoverOnClearIcon = ref(false)

		const canClear = computed<boolean>(
			() => props.showClear && hoverOnClearIcon.value,
		)

		return {
			handleClearIfShown: () => {
				if (canClear.value) props.handleClear()
			},
			hoverOnClearIcon,
			icon: computed(
				(): Yoco.Icon =>
					canClear.value
						? Yoco.Icon.CLOSE
						: props.isDropdownOpen
						? Yoco.Icon.CHEVRON_UP
						: Yoco.Icon.CHEVRON_DOWN,
			),
		}
	},
})
</script>
