<template>
	<div class="actionbar">
		<div class="actionbar-wrapper">
			<div class="actionbar-header">
				<h1 v-text="currentSection"/>
			</div>
			<div class="actionbar-body">
				<div class="actionbar-menu has-icon-right">
					<ul v-for="item in submenu" :key="item.id"
							v-if="item.parent === currentSection.toLowerCase()">
						<nuxt-link v-for="child in item.child" :to="`/${item.parent}/${child.to}`"
						  :key="child.to">
							<li>
								<span v-text="child.label" />
								<i class="yoco">chevron_right</i>
							</li>
						</nuxt-link>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>


<style lang="scss" scoped>
.nuxt-link-exact-active li {
	font-weight: 600;
	color: #2c66c4;
	i {
		color: #2c66c4;
	}
}
</style>


<script>
import Submenu from '../assets/json/submenu';

export default {
	name: 'Actionbar',
	data() {
		return {
			submenu: Submenu,
		};
	},
	computed: {
		currentSection() {
			let pathName = this.$route.name.split('-')[0];

			let sectionName = pathName.slice(0, 1).toUpperCase() + pathName.slice(1);
			return sectionName;
		},
	},
};
</script>
