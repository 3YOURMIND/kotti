<template>
	<KtNavbar :theme="theme" :menu="globalMenu" :isNarrow="isNarrow">
		<div slot="navbar-footer">
			<a href="https://github.com/3YOURMIND/kotti" class="github-link">
				<img src="~/assets/img/icon_github.svg" width="24" height="24"/>
			</a>
		</div>
	</KtNavbar>
</template>

<style lang="scss">
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
				{ icon: 'layer', label: 'Foundations', to: '/foundations/layout' },
				{ icon: 'dashboard', label: 'Components', to: '/components/avatars' },
				{ icon: 'support', label: 'Patterns', to: '/patterns/forms' },
				{ icon: 'version', label: 'Changelog', to: '/changelog' },
				{ icon: 'markup', label: 'Design Kit', to: '/designkit' },
			],
			theme: { logo: { wide: LogoSvg, narrow: LogoIconSvg, to: '/' } },
		}
	},
}
</script>
