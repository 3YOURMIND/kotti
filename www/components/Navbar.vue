<template>
	<KtNavbar :src="logoSrc">
		<ul slot="navbar-menu">
			<li v-for="item in globalMenu" :key="item.icon" @click="switchSubMenu(item.label)">
				<nuxt-link :to="item.to">
          <i class="yoco" v-text="item.icon" />
          <span v-text="item.label" />
        </nuxt-link>
			</li>
		</ul>
		<div slot="navbar-footer">
			<a href="https://github.com/3YOURMIND/kotti">
				<button class="primary w-100">Github</button>
			</a>
		</div>
	</KtNavbar>
</template>

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
	},
};
</script>
