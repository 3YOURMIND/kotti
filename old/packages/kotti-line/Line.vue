<template>
	<div class="kt-line">
		<div class="kt-line__left" />
		<div v-if="text" class="kt-line__middle" v-text="text" />
		<div v-if="text" class="kt-line__right" />
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
