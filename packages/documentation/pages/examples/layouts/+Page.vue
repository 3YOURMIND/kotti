<template>
	<div class="kt-container">
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
		<KtActionbar headerTitle="LayoutContainer Example" :menu="actionbarMenu" />
		<div class="workspace">
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
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import {
	Kotti,
	KtActionbar,
	KtFieldSingleSelect,
	KtNavbar,
	KtUserMenu,
} from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'

import { success } from '~/utilities/toaster'

export default defineComponent({
	name: 'DocumentationPageExamplesLayouts',
	components: {
		KtActionbar,
		KtFieldSingleSelect,
		KtNavbar,
		KtUserMenu,
	},
	setup() {
		const isNarrow = ref(false)
		return {
			actionbarMenu: [
				{
					active: false,
					disabled: false,
					icon: Yoco.Icon.USER,
					label: 'First Link',
					to: '/examples/layouts',
				},
				{
					active: true,
					icon: Yoco.Icon.BASKET,
					label: 'Second Link',
					to: '#',
				},
				{
					disabled: true,
					icon: Yoco.Icon.BELL,
					label: 'Third Link',
					to: '/',
				},
			],
			handleMenuClick() {
				success({ text: 'Link Clicked' })
			},
			isNarrow,
			Kotti,
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
							component: 'a',
							icon: Yoco.Icon.CLOSE,
							isActive: true,
							props: {
								href: '/usage/layouts/navbar',
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
				link: '#',
				title: 'Message',
			},
			quickLinksData: [
				{
					link: 'https://jira.3yourmind.com/secure/RapidBoard.jspa?rapidView=52',
					title: 'Create New Issue',
				},
			],
			setIsNarrow(_isNarrow: boolean) {
				isNarrow.value = _isNarrow
			},
			theme: ref(Kotti.Navbar.Theme.DEFAULT),
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
							component: 'a',
							props: {
								href: '/usage/layouts/navbar',
							},
							title: 'Logout (Close Example)',
						},
					],
					title: null,
				},
			],
		}
	},
})
</script>
