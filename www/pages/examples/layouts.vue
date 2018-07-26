<template>
	<div class="d-flex responsive">
		<KtNavbar :menu="menuData" :theme="themeData">
			<div slot="navbar-footer">
				<KtUserMenu userName="Jony'O Five" userStatus="Invisible">
					<div slot="user-menu-items">
						<div class="user-menu__item">Settings</div>
						<div class="user-menu__item">User Profile</div>
						<div class="user-menu__item">Logout</div>
					</div>
				</KtUserMenu>
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
					to: 'navbar-example/',
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
			themeData: {
				logoUrl: 'https://picsum.photos/200/60',
			},
		}
	},
}
</script>
