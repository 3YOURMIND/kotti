<template>
	<KtNavbar
		v-bind="{ isNarrow, sections, quickLinks }"
		:logoUrl="navLogo"
		@linkClick="handleLinkClick"
		@logoClick="$router.push('/')"
	>
		<div slot="navbar-footer">
			<a class="github-link" href="https://github.com/3YOURMIND/kotti">
				<img height="24" src="~/assets/img/icon_github.svg" width="24" />
			</a>
		</div>
	</KtNavbar>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { defineComponent } from '@vue/composition-api'
import { Route } from 'vue-router'

import navLogo from '../assets/img/nav_logo.svg'
import { menu } from '../data/menu'
import { useRoute } from '../hooks/use-route'
import { useRouter } from '../hooks/use-router'

export default defineComponent({
	name: 'NavBar',
	props: {
		isNarrow: { type: Boolean, default: false },
	},
	setup() {
		const route = useRoute()
		const router = useRouter()

		return {
			handleLinkClick(link: Route) {
				router.value.push(link.path)
			},
			navLogo,
			quickLinks: [
				{
					title: 'Create New Issue',
					link: 'https://github.com/3YOURMIND/kotti/issues/new/choose',
				},
				{
					title: 'NPM',
					link: 'https://www.npmjs.com/package/@3yourmind/kotti-ui',
				},
				{
					title: 'Issues',
					link: 'https://github.com/3YOURMIND/kotti/issues',
				},
				{
					title: 'Readme',
					link: 'https://github.com/3YOURMIND/kotti#readme',
				},
			],
			sections: menu.map((section): {
				title: string | null
				links: Array<{
					icon: Yoco.Icon
					title: string
					path: string
					isActive: boolean
				}>
			} => ({
				links: section.subsections.map((subsection) => ({
					icon: subsection.icon,
					title: subsection.title,
					path: `/${subsection.path}${
						subsection.pages.length >= 1 ? `/${subsection.pages[0].path}` : ''
					}`,
					isActive:
						subsection.path === ''
							? route.value.path === '/'
							: route.value.path.startsWith(`/${subsection.path}`),
				})),
				title: section.title,
			})),
		}
	},
})
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