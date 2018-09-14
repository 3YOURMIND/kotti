<template>
	<div class="d-flex responsive">
		<slot name="navbar">
			<KtNavbar :menu="menuData" :theme="themeData">
				<div slot="navbar-footer">
					<KtUserMenu
						userName="Jony'O Five"
						userStatus="Invisible"
						:sections="userMenuData" />
				</div>
			</KtNavbar>
		</slot>
		<slot name="actionbar" v-if="hasActionbar">
			<KtActionBar/>
		</slot>

		<div class="workspace">
			<slot name="workspace">
			</slot>
		</div>
	</div>
</template>

<script>
import KtNavbar from '../../../packages/kotti-navbar'
import KtActionBar from '../../../packages/kotti-actionbar'
import KtUserMenu from '../../../packages/kotti-user-menu'

export default {
	name: 'KtContainer',
	layout: 'container',
	components: {
		KtNavbar,
		KtUserMenu,
		KtActionBar,
	},
	computed: {
		containerClass() {
			return {
				'kt-container': true,
				'kt-container--actionbar': this.hasActionbar,
			}
		},
	},
	data() {
		return {
			hasActionbar: true,
			menuData: [
				{
					to: '#',
					label: 'Navbar',
					icon: 'dashboard',
				},
				{
					to: 'components/navbar',
					label: 'Component',
					icon: 'layer',
				},
				{
					to: 'components/navbar',
					label: 'Calendar',
					icon: 'calendar',
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
						{
							link: '#',
							title: 'Org Panel',
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
						{
							link: '#',
							title: 'View More',
						},
					],
				},
			],
			themeData: {
				logo: {
					wide: 'https://picsum.photos/200/60',
					narrow: 'https://picsum.photos/60/60',
				},
			},
		}
	},
}
</script>


<style lang="scss" scoped>
.kt-container {
	display: grid;
	grid-template-columns: auto 1fr;
	grid-template-rows: 100vh;
	&--actionbar {
		grid-template-columns: auto 16rem 1fr;
	}
}
.workspace__content {
	display: block;
	background: #ddd;
	height: 800px;
	overflow: auto;
}
@media (max-width: 480px) {
	.kt-container {
		display: flex;
		flex-direction: column;
	}
}
</style>
