<template>
	<LayoutContainer>
		<KtNavbar
			slot="navbar"
			:isNarrow="isNarrow"
			logoUrl="https://via.placeholder.com/160x50"
			:notification="navbarNotification"
			:quickLinks="quickLinksData"
			:sections="navbarMenu"
			:theme="theme"
			@setIsNarrow="setIsNarrow"
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
import { Yoco } from '@3yourmind/yoco'

import LayoutContainer from '~/components/LayoutContainer.vue'

export default {
	name: 'DocumentationPageExamplesLayouts',
	layout: 'empty',
	components: {
		LayoutContainer,
	},
	data() {
		return {
			isNarrow: false,
			theme: null,
			quickLinksData: [
				{
					title: 'Create New Issue',
					link: 'https://jira.3yourmind.com/secure/RapidBoard.jspa?rapidView=52',
				},
			],
			navbarMenu: [
				{
					links: [
						{
							link: '#',
							title: 'Dashboard',
							icon: Yoco.Icon.DASHBOARD,
							isActive: true,
						},
						{
							link: '/usage/layouts/navbar',
							title: 'Close Example',
							icon: Yoco.Icon.CLOSE,
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
							icon: Yoco.Icon.INVOICE,
							isActive: false,
						},
						{
							link: '#',
							title: 'Quotes',
							icon: Yoco.Icon.REQUEST,
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
							icon: Yoco.Icon.BOX_3D,
							isActive: false,
						},
						{
							link: '#',
							title: 'Schedule',
							icon: Yoco.Icon.CALENDAR,
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
					title: 'Switch To',
				},
				{
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
							title: '4YOURMIND Service',
						},
					],
					title: 'Recent Service',
				},
				{
					links: [
						{
							link: '#',
							title: 'Settings',
						},
						{
							link: '/usage/layouts/navbar',
							title: 'Logout (Close Example)',
						},
					],
					title: null,
				},
			],
			actionbarMenu: [
				{
					label: 'First Link',
					to: '/examples/layouts',
					icon: Yoco.Icon.USER,
					active: false,
					disabled: false,
				},
				{
					label: 'Second Link',
					to: '#',
					icon: Yoco.Icon.BASKET,
					active: true,
				},
				{
					label: 'Third Link',
					to: '/',
					icon: Yoco.Icon.BELL,
					disabled: true,
				},
			],
		}
	},
	methods: {
		handleMenuClick() {
			alert('Link Clicked')
		},
		setIsNarrow(isNarrow) {
			this.isNarrow = isNarrow
		},
	},
}
</script>
