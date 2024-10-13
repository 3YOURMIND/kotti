<template>
	<LayoutContainer>
		<template #navbar>
			<KtNavbar
				:isNarrow="isNarrow"
				logoUrl="https://via.placeholder.com/160x50"
				:notification="navbarNotification"
				:quickLinks="quickLinksData"
				:sections="navbarMenu"
				:theme="theme"
				@setIsNarrow="setIsNarrow"
			>
				<template #navbar-footer>
					<KtUserMenu
						:sections="userMenuData"
						userName="Jony'O Five"
						userStatus="Invisible"
						@click="handleMenuClick($event)"
					/>
				</template>
			</KtNavbar>
		</template>
		<template #actionbar>
			<KtActionbar
				headerTitle="LayoutContainer Example"
				:menu="actionbarMenu"
			/>
		</template>
		<template #workspace>
			<KtFieldSingleSelect
				v-model="theme"
				hideClear
				isOptional
				label="Navbar Theme"
				:options="[
					{ label: 'Reversed theme', value: Kotti.Navbar.Theme.REVERSE },
					{ label: 'Light theme', value: Kotti.Navbar.Theme.LIGHT },
					{ label: 'Dark theme', value: Kotti.Navbar.Theme.DARK },
					{ label: 'Default', value: Kotti.Navbar.Theme.DEFAULT },
				]"
			/>
		</template>
	</LayoutContainer>
</template>

<script>
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Kotti } from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'

import LayoutContainer from '~/components/LayoutContainer.vue'

/* eslint-disable perfectionist/sort-objects */
export default {
	name: 'DocumentationPageExamplesLayouts',
	components: {
		LayoutContainer,
	},
	layout: 'empty',
	data() {
		return {
			isNarrow: false,
			theme: Kotti.Navbar.Theme.DEFAULT,
			Kotti,
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
							icon: Yoco.Icon.DASHBOARD,
							isActive: true,
							props: {
								href: '#',
							},
							title: 'Dashboard',
						},
						{
							icon: Yoco.Icon.CLOSE,
							isActive: true,
							component: 'nuxt-link',
							props: {
								to: '/usage/layouts/navbar',
							},
							title: 'Close Example',
						},
					],
					title: null,
				},
				{
					links: [
						{
							icon: Yoco.Icon.INVOICE,
							isActive: false,
							props: {
								href: '#',
							},
							title: 'Orders',
						},
						{
							icon: Yoco.Icon.REQUEST,
							isActive: false,
							props: {
								href: '#',
							},
							title: 'Quotes',
						},
					],
					title: 'Order Management',
				},
				{
					links: [
						{
							icon: Yoco.Icon.BOX_3D,
							isActive: false,
							props: {
								href: '#',
							},
							title: 'Parts',
						},
						{
							icon: Yoco.Icon.CALENDAR,
							isActive: false,
							props: {
								href: '#',
							},
							title: 'Schedule',
						},
					],
					title: 'Agile MES',
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
							props: {
								href: '#',
							},
							title: 'User Panel',
						},
						{
							props: {
								href: '#',
							},
							title: 'Service Panel',
						},
					],
					title: 'Switch To',
				},
				{
					links: [
						{
							props: {
								href: '#',
							},
							title: '2YOURMIND Service',
						},
						{
							props: {
								href: '#',
							},
							title: '3YOURMIND Service',
						},
						{
							props: {
								href: '#',
							},
							title: '4YOURMIND Service',
						},
					],
					title: 'Recent Service',
				},
				{
					links: [
						{
							props: {
								href: '#',
							},
							title: 'Settings',
						},
						{
							component: 'nuxt-link',
							props: {
								to: '/usage/layouts/navbar',
							},
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
			// eslint-disable-next-line no-alert
			window.alert('Link Clicked')
		},
		setIsNarrow(isNarrow) {
			this.isNarrow = isNarrow
		},
	},
}
/* eslint-enable perfectionist/sort-objects */
</script>
