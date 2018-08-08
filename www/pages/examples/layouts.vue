<template>
	<div class="d-flex responsive">
		<KtNavbar :menu="menuData" :theme="themeData">
			<div slot="navbar-footer">
				<KtUserMenu
					userName="Jony'O Five"
					userStatus="Invisible"
					:sections="userMenuData" />
			</div>
		</KtNavbar>
		<Actionbar />
		<div class="workspace">
			Workspace Content
		</div>
	</div>
</template>

<script>
import Actionbar from '~/components/Actionbar.vue'
import KtNavbar from '../../../packages/kotti-navbar'
import KtUserMenu from '../../../packages/kotti-user-menu'

export default {
	layout: 'fullpage',
	components: {
		KtNavbar,
		KtUserMenu,
		Actionbar,
	},
	data() {
		return {
			menuData: [
				{
					to: '#',
					label: 'Navbar',
					icon: 'dashboard',
				},
				{
					to: 'components/navbar',
					label: 'Component',
					icon: 'layer',
				},
				{
					to: 'components/navbar',
					label: 'Calendar',
					icon: 'calendar',
				},
			],
			userMenuData: [
				{
					title: 'Switch To',
					links: [
						{
							link: '#',
							title: 'User Panel',
						},
						{
							link: '#',
							title: 'Service Panel',
						},
						{
							link: '#',
							title: 'Org Panel',
						},
					],
				},
				{
					title: 'Recent Service',
					links: [
						{
							link: '#',
							title: '2YOURMIND Service',
						},
						{
							link: '#',
							title: '3YOURMIND Service',
						},
						{
							link: '#',
							title: 'View More',
						},
					],
				},
				{
					links: [
						{
							link: '#',
							title: 'Settings',
						},
						{
							link: '#',
							title: 'Logout',
						},
					],
				},
			],
			themeData: {
				logo: {
					wide: 'https://picsum.photos/200/60',
					narrow: 'https://picsum.photos/60/60',
				},
			},
		}
	},
}
</script>
