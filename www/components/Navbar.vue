<template>
	<KtNavbar :src="logoSrc">
		<ul slot="navbar-menu">
			<nuxt-link :to="item.to" v-for="item in globalMenu" :key="item.icon" :class="activeLinkClass(item.label)">
				<li @click="switchSubMenu(item.label)" >
				<i class="yoco" v-text="item.icon" />
				<span v-text="item.label" />
				</li>
			</nuxt-link>
		</ul>
		<div slot="navbar-footer">
			<a href="https://github.com/3YOURMIND/kotti">
				<button class="primary w-100">Github</button>
			</a>
		</div>
	</KtNavbar>
</template>

<style lang="scss" scoped>
.active li {
	border-radius: 0.1rem;
	font-weight: 600;
	background: rgba(0, 0, 0, 0.2);
}
</style>


<script>
import LogoSvg from '~/assets/img/nav_logo.svg';
import KtNavbar from '../../packages/kotti-navbar';
export default {
	name: 'KtNavbarComponent',
	components: {
		KtNavbar,
	},
	data() {
		return {
			logoSrc: LogoSvg,
			globalMenu: [
				{
					icon: 'layer',
					label: 'Foundations',
					to: '/foundations/layout',
				},
				{
					icon: 'dashboard',
					label: 'Components',
					to: '/components/avatars',
				},
				{
					icon: 'support',
					label: 'Patterns',
					to: '/patterns/inline-edit',
				},
				{
					icon: 'download',
					label: 'Resources',
					to: '/resources/kotti-style',
				},
			],
		};
	},
	methods: {
		switchSubMenu(val) {
			this.$emit('switch', val);
		},
		activeLinkClass(val) {
			let parentPath = val.toLowerCase();
			let routePath = this.$route.name ? this.$route.name : '';
			return {
				active: routePath.includes(parentPath),
			};
		},
	},
};
</script>
