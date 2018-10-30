<template>
	<div class="kt-line">
		<div class="kt-line__left" />
		<div class="kt-line__middle" v-text="text" v-if="text"/>
		<div class="kt-line__right" v-if="text" />
	</div>
</template>

<script>
export default {
	name: 'KtLine',
	props: {
		text: {
			type: String,
			default: null,
		},
	},
}
</script>


<style lang="scss">
</style>
