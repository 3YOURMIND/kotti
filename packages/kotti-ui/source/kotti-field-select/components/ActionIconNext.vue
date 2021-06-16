<template>
	<div
		:class="classes"
		role="button"
		@click="handleChevronClick"
		@mouseenter="hoverOnClear = true"
		@mouseleave="hoverOnClear = false"
	>
		<i class="yoco" v-text="icon" />
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { defineComponent, ref, computed } from '@vue/composition-api'

export default defineComponent({
	name: 'ActionIconNext',
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
		const hoverOnClear = ref(false)

		return {
			handleChevronClick: ($event: { stopPropagation(): void }) => {
				if (props.showClear) {
					$event.stopPropagation()
					props.handleClear()
				}
			},
			hoverOnClear,
			icon: computed(
				(): Yoco.Icon =>
					hoverOnClear.value && props.showClear
						? Yoco.Icon.CLOSE
						: props.isDropdownOpen
						? Yoco.Icon.CHEVRON_UP
						: Yoco.Icon.CHEVRON_DOWN,
			),
		}
	},
})
</script>
