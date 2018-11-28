<template>
	<KtNavbar
		:isNarrow="isNarrow"
		:sections="dynamicMenu"
		:quickLinks="quickLinksData"
		@KtNavbarLogoClicked="$router.push('/')"
		@KtNavbarLinkClicked="redirectRouter($event)"
	>
		<div slot="navbar-footer">
			<a href="https://github.com/3YOURMIND/kotti" class="github-link">
				<img src="~/assets/img/icon_github.svg" width="24" height="24" />
			</a>
		</div>
	</KtNavbar>
</template>

<style lang="scss" scoped>
.github-link {
	display: inline-block;
	width: 100%;
	text-align: center;
}
li.nuxt-link-active {
	background: rgba(0, 0, 0, 0.2);
	border-radius: 0.1rem;
	font-weight: 600;
}
</style>

<script>
import KtNavbar from '../../packages/kotti-navbar'
import LogoSvg from '~/assets/img/nav_logo.svg'
import LogoIconSvg from '~/assets/img/nav_icon.svg'

export default {
	name: 'KtNavbarComponent',
	components: {
		KtNavbar,
	},
	props: {
		isNarrow: { type: Boolean, default: false },
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
			globalMenu: [
				{
					links: [
						{
							icon: 'layer',
							title: 'Foundations',
							path: '/foundations/layout',
						},
					],
				},
				{
					links: [
						{
							icon: 'dashboard',
							title: 'Components',
							path: '/components/avatars',
						},
					],
				},
				{
					links: [
						{ icon: 'sidebar', title: 'Patterns', path: '/patterns/actionbar' },
					],
				},
				{
					links: [{ icon: 'version', title: 'Changelog', path: '/changelog' }],
				},
				{ links: [{ icon: 'markup', title: 'DesignKit', path: '/designkit' }] },
			],
		}
	},
	methods: {
		redirectRouter(link) {
			this.$router.push(link.path)
		},
	},
	provide() {
		return {
			KtNavbarTheme: {
				backgroundColor: '#122C56',
				borderColor: 'rgba(255,255,255,.24)',
				textColor: 'rgba(255,255,255,.54)',
				activeColor: 'rgba(255,255,255, 1)',
				logoUrl: LogoSvg,
				logoHeight: '40px',
			},
		}
	},
	computed: {
		dynamicMenu() {
			const menu = this.globalMenu
			const currentPage = this.$route.name ? this.$route.name.split('-') : ''
			return menu.map(menuItem => ({
				...menuItem,
				links: menuItem.links.map(link => ({
					...link,
					isActive: currentPage[0] === link.title.toLowerCase(),
				})),
			}))
		},
	},
}
</script>
