<template>
  <div class="d-flex responsive">
    <Navbar @switch="switchSection"/>
    <Actionbar :currentSection="currentSection"/>
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
		margin-right: 0;
	}
}
</style>
