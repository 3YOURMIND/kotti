<template>
	<div class="actionbar">
		<div class="actionbar-wrapper">
			<div class="actionbar-header">
				<h1 v-text="currentSection" />
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
	props: {
		currentSection: String,
	},
	data() {
		return {
			submenu: Submenu,
		};
	},
};
</script>
