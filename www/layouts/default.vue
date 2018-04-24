<template>
  <div class="d-flex responsive">
    <Navbar @switch="switchSection"/>
    <KtActionbar :currentSection="currentSection"/>
    <div class="workspace">
      <nuxt class="content" />
    </div>
  </div>
</template>

<script>
import KtActionbar from '~/components/Actionbar.vue';
import MobileNav from '~/components/MobileNav.vue';
import Navbar from '~/components/Navbar.vue';

export default {
	name: 'DefaultLayout',
	components: {
		KtActionbar,
		MobileNav,
		Navbar,
	},
	data() {
		return {
			currentSection: 'Foundations',
		};
	},
	methods: {
		switchSection(value) {
			this.currentSection = value;
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
		margin-top: 3rem;
		margin-right: 0;
	}
}
</style>
