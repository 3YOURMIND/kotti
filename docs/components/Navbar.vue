<template>
	<KtNavbar
		:isNarrow="isNarrow"
		:quickLinks="quickLinksData"
		:sections="globalMenu"
		@linkClick="redirectRouter($event)"
		@logoClick="$router.push('/')"
	>
		<div slot="navbar-footer">
			<a class="github-link" href="https://github.com/3YOURMIND/kotti">
				<img height="24" src="~/assets/img/icon_github.svg" width="24" />
			</a>
		</div>
	</KtNavbar>
</template>

<script>
import KtNavbar from '../../packages/kotti-navbar'

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
							path: '/tokens/introduction',
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
}
</script>

<style lang="scss" scoped>
.github-link {
	display: flex;
	justify-content: center;
	width: 100%;
}
li.nuxt-link-active {
	font-weight: 600;
	background: rgba(0, 0, 0, 0.2);
	border-radius: 0.1rem;
}
</style>
