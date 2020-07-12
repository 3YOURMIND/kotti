<template>
	<LayoutContainer>
		<KtNavbar
			slot="navbar"
			labelText="MultiText"
			logoUrl="placehold.it/160x50"
			:notification="navbarNotification"
			:quickLinks="quickLinksData"
			:sections="navbarMenu"
		>
			<div slot="navbar-footer">
				<KtUserMenu
					:sections="userMenuData"
					userName="Jony'O Five"
					userStatus="Invisible"
					@click="handleMenuClick($event)"
				/>
			</div>
		</KtNavbar>
		<KtActionbar
			slot="actionbar"
			headerTitle="LayoutContainer Example"
			:menu="actionbarMenu"
		/>
		<div slot="workspace"></div>
	</LayoutContainer>
</template>

<script>
import LayoutContainer from '../../components/LayoutContainer.vue'

export default {
	name: 'ExamplesLayouts',
	layout: 'empty',
	components: {
		LayoutContainer,
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
	methods: {
		handleMenuClick() {
			alert('Link Clicked')
		},
	},
}
</script>
