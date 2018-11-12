<template>
	<KtNavbar
		:isNarrow="isNarrow"
		:menu="globalMenu"
		:theme="theme"
		@clickLogo="$router.push('/')"
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
			globalMenu: [
				{
					links: [
						{
							icon: 'layer',
							title: 'Foundations',
							link: '/foundations/layout',
						},
					],
				},
				{
					links: [
						{
							icon: 'dashboard',
							title: 'Components',
							link: '/components/avatars',
						},
					],
				},
				{
					links: [
						{ icon: 'sidebar', title: 'Patterns', link: '/patterns/comments' },
					],
				},
				{
					links: [
						{
							icon: 'version',
							title: 'Changelog',
							link: '/changelog',
						},
					],
				},
				{
					links: [
						{
							icon: 'markup',
							title: 'Design Kit',
							link: '/designkit',
						},
					],
				},
			],
			theme: {
				color: {
					backgroundColor: '#122C56',
					borderColor: 'rgba(#555, 24)',
					textColor: 'rgba(255,255,255,.54)',
				},
				logo: { wide: LogoSvg, narrow: LogoIconSvg },
			},
		}
	},
}
</script>
