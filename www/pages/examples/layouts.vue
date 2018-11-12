<template>
	<KtContainer>
		<KtNavbar slot="navbar" :menu="menuBarData" :theme="themeData">
			<div slot="navbar-footer">
				<KtUserMenu
					textColor="#000"
					backgroundColor="#FFF"
					userName="Jony'O Five"
					userStatus="Invisible"
					:sections="userMenuData"
				/>
			</div>
		</KtNavbar>
		<KtActionbar
			slot="actionbar"
			headerTitle="KtContainer Example"
			:menuStyle="menuStyle"
			:menu="menu"
		/>
		<div slot="workspace">KtContainer Content</div>
	</KtContainer>
</template>

<script>
import KtActionbar from '../../../packages/kotti-actionbar'
import KtContainer from '../../../packages/kotti-container'
import KtNavbar from '../../../packages/kotti-navbar'
import KtUserMenu from '../../../packages/kotti-user-menu'

export default {
	layout: 'empty',
	components: {
		KtNavbar,
		KtActionbar,
		KtContainer,
		KtUserMenu,
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
					to: '#',
					label: 'ActionBar',
					icon: 'calendar',
				},
			],
			menuBarData: [
				{
					links: [
						{
							link: '#',
							title: 'Dashboard',
							icon: 'dashboard',
						},
					],
				},
				{
					title: 'Order Management',
					links: [
						{
							link: '#',
							title: 'Orders',
							icon: 'invoice',
						},
						{
							link: '#',
							title: 'Quotes',
							icon: 'request',
						},
					],
				},
				{
					title: 'Agile MES',
					links: [
						{
							link: '#',
							title: 'Parts',
							icon: '3dbox',
						},
						{
							link: '#',
							title: 'Schedule',
							icon: 'calendar',
						},
					],
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
					],
				},
				{
					links: [
						{
							link: 'https://google.com',
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
				color: {
					backgroundColor: '#fff',
					textColor: 'rgba(0,0,0,0.69)',
					borderColor: '#dbdbdb',
				},
				logo: {
					wide: 'https://picsum.photos/200/60',
					narrow: 'https://picsum.photos/60/60',
				},
			},
			menuStyle: {
				defaultItemInMobile: 5,
				iconPosition: 'left',
			},
			menu: [
				{
					label: 'First Link',
					to: '/examples/layouts',
					icon: 'user',
					active: false,
					disabled: false,
				},
				{
					label: 'Second Link',
					to: 'https://google.com',
					icon: 'basket',
					active: true,
				},
				{
					label: 'Third Link',
					to: '/',
					icon: 'bell',
					disabled: true,
				},
			],
		}
	},
}
</script>
