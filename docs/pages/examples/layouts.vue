<template>
	<KtContainer>
		<KtNavbar
			slot="navbar"
			:sections="navbarMenu"
			labelText="MultiText"
			:notification="navbarNotification"
			:quickLinks="quickLinksData"
			logoUrl="placehold.it/160x50"
		>
			<div slot="navbar-footer">
				<KtUserMenu
					userName="Jony'O Five"
					userStatus="Invisible"
					:sections="userMenuData"
					@click="handleMenuClick($event)"
				/>
			</div>
		</KtNavbar>
		<KtActionbar
			slot="actionbar"
			headerTitle="KtContainer Example"
			:menu="actionbarMenu"
		/>
		<div slot="workspace"></div>
	</KtContainer>
</template>

<script>
import KtContainer from '../../../packages/kotti-container'
import cssVars from 'css-vars-ponyfill'

export default {
	layout: 'empty',
	components: {
		KtContainer,
	},
	methods: {
		handleMenuClick(link) {
			alert('Link Clicked')
		},
	},
	mounted() {
		// loading IE11 polyfill
		const isIE = !!window.MSInputMethodContext && !!document.documentMode
		if (isIE) cssVars({ watch: true, shadowDOM: true, onlyLegacy: true })
	},
	data() {
		return {
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
