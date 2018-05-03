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
import '../../packages/kotti-avatar/dist/kotti-avatar.css';
import '../../packages/kotti-avatar-group/dist/kotti-avatar-group.css';

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
</style>
