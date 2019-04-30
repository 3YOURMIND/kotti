<template>
	<li class="fraction" v-text="fractionRep" />
</template>

<script>
export default {
	name: 'FractionatedPaginator',
	props: {
		currentPage: { type: Number, required: true },
		maximumPage: { type: Number, required: true },
	},
	computed: {
		fractionRep() {
			return [this.currentPage, this.maximumPage]
				.map(page => page + 1)
				.join(' / ')
		},
	},
}
</script>
