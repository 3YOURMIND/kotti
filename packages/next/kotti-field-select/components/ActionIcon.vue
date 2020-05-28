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
import { defineComponent, ref, computed } from '@vue/composition-api'
import { Select as ElSelect } from 'element-ui'

export default defineComponent({
	name: 'ActionIcon',
	props: {
		classes: { required: true, type: Array },
		elSelectRef: {
			type: Object,
			/**
			 * Vue doesn’t appear to allow type: [Object, null]. Therefore, we need to work around
			 * this by not using required and instead having a validator that can distinguish
			 * between not passing a prop (undefined) and explicitly passing a value (null)
			 */
			validator: (value) => value !== undefined,
		},
		handleClear: { required: true, type: Function },
		isDropdownOpen: { required: true, type: Boolean },
		showClear: { required: true, type: Boolean },
	},
	setup(props: {
		classes: string[]
		elSelectRef:
			| (ElSelect & {
					inputWidth: number
					setSoftFocus(): void
			  })
			| null
		handleClear(): void
		isDropdownOpen: boolean
		showClear: boolean
	}) {
		const hoverOnClear = ref(false)

		return {
			handleChevronClick: ($event: { stopPropagation(): void }) => {
				if (props.elSelectRef === null)
					throw new Error('ElSelect is not ready yet')

				if (props.showClear) {
					$event.stopPropagation()
					props.handleClear()

					props.elSelectRef.setSoftFocus()
				}
			},
			hoverOnClear,
			icon: computed(() =>
				hoverOnClear.value && props.showClear
					? 'close'
					: `chevron_${props.isDropdownOpen ? 'up' : 'down'}`,
			),
		}
	},
})
</script>
