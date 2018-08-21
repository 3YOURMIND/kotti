<template>
	<div class="d-flex responsive">
		<Navbar/>
		<div class="workspace">
			<nuxt class="content" />
		</div>
	</div>
</template>

<script>
import Navbar from '~/components/Navbar.vue'

export default {
	name: 'FullPageLayout',
	components: {
		Navbar,
	},
}
</script>

<style lang="scss" scoped>
.content {
	padding: 2rem 0;
	margin: 0 auto;
	width: 100%;
	max-width: 40rem;
}
</style>
