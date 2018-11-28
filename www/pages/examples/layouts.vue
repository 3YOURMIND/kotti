<template>
	<KtContainer>
		<KtNavbar
			slot="navbar"
			:sections="navbarMenu"
			:notification="navbarNotification"
			:quickLinks="quickLinksData"
		>
			<div slot="navbar-footer">
				<KtUserMenu
					userName="Jony'O Five"
					userStatus="Invisible"
					:sections="userMenuData"
					@KtUserMenuLinkClicked="handleMenuClick($event)"
				/>
			</div>
		</KtNavbar>
		<KtActionbar
			slot="actionbar"
			headerTitle="KtContainer Example"
			:menu="actionbarMenu"
		/>
		<div slot="workspace">
			KtContainer Content
			<button @click="isDarkThemeEnabled = !isDarkThemeEnabled">
				Toggle darkTheme
			</button>
		</div>
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
		return { KtNavbarTheme: this.defaultTheme }
	},
	watch: {
		isDarkThemeEnabled(value) {
			const theme = value ? this.darkTheme : this.lightTheme
			Object.entries(theme).forEach(([key, value]) => {
				this.$set(this.defaultTheme, key, value)
			})
		},
	},
	methods: {
		handleMenuClick(link) {
			console.log(link.link)
		},
	},
	data() {
		return {
			isDarkThemeEnabled: false,
			defaultTheme: {
				backgroundColor: '#122C56',
				borderColor: 'rgba(255,255,255,.24)',
				textColor: 'rgba(255,255,255,.54)',
				activeColor: 'rgba(255,255,255, 1)',
				logoUrl: 'https://source.unsplash.com/random/200x60',
			},
			darkTheme: {
				backgroundColor: '#122C56',
				borderColor: 'rgba(255,255,255,.24)',
				textColor: 'rgba(255,255,255,.54)',
				activeColor: 'rgba(255,255,255, 1)',
			},
			lightTheme: {
				backgroundColor: '#fff',
				borderColor: 'rgba(0,0,0,.24)',
				textColor: 'rgba(0,0,0,.54)',
				activeColor: 'rgba(0,0,0, 1)',
			},
			quickLinksData: {
				links: [
					{
						title: 'Create New Issue',
						link:
							'https://jira.3yourmind.com/secure/RapidBoard.jspa?rapidView=52',
					},
				],
			},
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
				count: 1,
				title: 'Message',
				link: '#',
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
