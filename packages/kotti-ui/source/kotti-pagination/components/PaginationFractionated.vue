<template>
	<li class="fraction" v-text="fractionRep" />
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

export default defineComponent({
	name: 'PaginationFractionated',
	props: {
		currentPage: { type: Number, required: true },
		maximumPage: { type: Number, required: true },
	},
	setup(props) {
		return {
			fractionRep: computed(() =>
				[props.currentPage, props.maximumPage]
					.map((page) => page + 1)
					.join(' / '),
			),
		}
	},
})
</script>
