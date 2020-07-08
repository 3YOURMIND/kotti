<template>
	<KtNavbar
		v-bind="{ isNarrow, sections, quickLinks }"
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
import { defineComponent } from '@vue/composition-api'
import { Route } from 'vue-router'

import { Yoco } from '../../packages/next/types'
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
			quickLinks: {
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
			sections: menu.map((section): {
				title: string
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
