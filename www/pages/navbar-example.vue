<template>
	<div class="d-flex responsive">
		<KtNavbar src="https://picsum.photos/200/60" :menu="menuData">
		<div slot="navbar-footer">
			<KtUserMenu/>
		</div>
		</KtNavbar>
	</div>
</template>

<script>
import KtNavbar from '../../packages/kotti-navbar'
import KtUserMenu from '../../packages/kotti-user-menu'

export default {
	layout: 'fullpage',
	components: {
		KtNavbar,
		KtUserMenu,
	},
	data() {
		return {
			menuData: [
				{
					to: 'components/navbar',
					label: 'Navbar',
					icon: 'dashboard',
				},
				{
					to: 'components/navbar',
					label: 'Navbar',
					icon: 'dashboard',
				},
				{
					to: 'components/navbar',
					label: 'Navbar',
					icon: 'dashboard',
				},
			],
		}
	},
}
</script>
