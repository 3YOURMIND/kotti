<template>
  <div class="d-flex responsive">
    <Navbar/>
    <Actionbar v-if="showActionbar"/>
    <div class="workspace">
      <nuxt class="content" />
    </div>
  </div>
</template>

<script>
import Actionbar from '~/components/Actionbar.vue';
import Navbar from '~/components/Navbar.vue';

export default {
	name: 'DefaultLayout',
	components: {
		Actionbar,
		Navbar,
	},
	computed: {
		showActionbar() {
			return this.$route.name === 'index' ? false : true;
		},
	},
};
</script>

<style>
.content {
	margin: 0 auto;
	width: 100%;
	max-width: 40rem;
}
@media (max-width: 840px) {
	.workspace {
		min-width: 100%;
		margin-right: 0;
	}
}
</style>
