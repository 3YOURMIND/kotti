<template>
	<KtContainer>
		<KtNavbar
			slot="navbar"
			:menu="navbarMenu"
			:notification="navbarNotification"
		>
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
			:menu="actionbarMenu"
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
	provide() {
		return {
			theme: {
				backgroundColor: '#fff',
				textColor: 'rgba(0,0,0,0.58)',
				borderColor: '#dbdbdb',
				activeColor: '#2c64cc',
				logoUrl: 'https://picsum.photos/200/80',
			},
		}
	},
	data() {
		return {
			navbarMenu: [
				{
					links: [
						{
							link: '#',
							title: 'Dashboard',
							icon: 'dashboard',
							isActive: true,
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
							isActive: false,
						},
						{
							link: '#',
							title: 'Quotes',
							icon: 'request',
							isActive: false,
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
							isActive: false,
						},
						{
							link: '#',
							title: 'Schedule',
							icon: 'calendar',
							isActive: false,
						},
					],
				},
			],
			navbarNotification: {
				showNotification: true,
				number: 1,
			},
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

			menuStyle: {
				defaultItemInMobile: 5,
				iconPosition: 'left',
			},
			actionbarMenu: [
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
