<template>
	<KtNavbar
		:isNarrow="isNarrow"
		:sections="globalMenu"
		:quickLinks="quickLinksData"
		@linkClick="redirectRouter($event)"
		@logoClick="$router.push('/')"
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
	display: flex;
	justify-content: center;
	width: 100%;
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
						link: 'https://github.com/3YOURMIND/kotti/issues/new/choose',
					},
					{
						title: 'Yoco Icon',
						link: 'https://3yourmind.github.io/yoco',
					},
				],
			},
		}
	},
	methods: {
		redirectRouter(link) {
			this.$router.push(link.path)
		},
		isCurrentPage(path) {
			return path === '/'
				? this.$route.path === '/'
				: this.$route.path.includes(path)
		},
	},
	provide() {
		return {
			KtTheme: {
				navbarBackgroundColor: '#122C56',
				navbarTextColor: 'rgba(255,255,255,.54)',
				navbarTextActiveColor: 'rgba(255,255,255, 1)',
				logoUrl: LogoSvg,
				logoHeight: '40px',
			},
		}
	},
	computed: {
		globalMenu() {
			return [
				{
					title: 'Guide',
					links: [
						{
							icon: 'file',
							title: 'Overview',
							path: '/',
							isActive: this.isCurrentPage('/'),
						},
						{
							icon: 'version',
							title: 'Changelog',
							path: '/changelog',
							isActive: this.isCurrentPage('/changelog'),
						},
					],
				},
				{
					title: 'Usage',
					links: [
						{
							icon: 'layer',
							title: 'Foundations',
							path: '/foundations/layout',
							isActive: this.isCurrentPage('/foundations'),
						},
						{
							icon: 'json',
							title: 'Tokens',
							path: '/tokens/index',
							isActive: this.isCurrentPage('/tokens'),
						},
						{
							icon: 'dashboard',
							title: 'Components',
							path: '/components/avatars',
							isActive: this.isCurrentPage('/components'),
						},
						{
							icon: 'sidebar',
							title: 'Patterns',
							path: '/patterns/actionbar',
							isActive: this.isCurrentPage('/patterns'),
						},
						{
							icon: 'markup',
							title: 'DesignKit',
							path: '/designkit',
							isActive: this.isCurrentPage('/designkit'),
						},
					],
				},
			]
		},
	},
}
</script>
