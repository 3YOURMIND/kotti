<template>
	<LayoutContainer>
		<KtNavbar
			slot="navbar"
			logoUrl="placehold.it/160x50"
			:notification="navbarNotification"
			:quickLinks="quickLinksData"
			:sections="navbarMenu"
			:theme="theme"
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
		<div slot="workspace">
			<KtFieldSingleSelect
				v-model="theme"
				hideClear
				isOptional
				label="Navbar Theme"
				:options="[
					{ label: 'Reversed theme', value: 'reverse' },
					{ label: 'Light theme', value: 'light' },
					{ label: 'Dark theme', value: 'dark' },
					{ label: 'None', value: null },
				]"
			/>
		</div>
	</LayoutContainer>
</template>

<script>
import LayoutContainer from '~/components/LayoutContainer.vue'

export default {
	name: 'DocumentationPageExamplesLayouts',
	layout: 'empty',
	components: {
		LayoutContainer,
	},
	data() {
		return {
			theme: null,
			quickLinksData: [
				{
					title: 'Create New Issue',
					link:
						'https://jira.3yourmind.com/secure/RapidBoard.jspa?rapidView=52',
				},
			],
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
