<template>
	<KtNavbar
		v-bind="{ isNarrow, sections, quickLinks }"
		:logoUrl="navLogo"
		@linkClick="handleLinkClick"
		@logoClick="$router.push('/')"
		@setIsNarrow="setIsNarrow"
	>
		<div slot="navbar-footer">
			<a class="github-link" href="https://github.com/3YOURMIND/kotti">
				<img height="24" src="~/assets/img/icon_github.svg" width="24" />
			</a>
		</div>
	</KtNavbar>
</template>

<script lang="ts">
import { Kotti } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from '@vue/composition-api'

import navLogo from '../assets/img/nav_logo.svg'
import { menu } from '../data/menu'
import { useRoute } from '../hooks/use-route'
import { useRouter } from '../hooks/use-router'

const LOCALSTORAGE_IS_NAVBAR_NARROW_KEY = 'kotti-documentation-is-navbar-narrow'

const saveSavedFieldsToLocalStorage = (isNarrow: boolean) => {
	try {
		if (typeof window !== 'undefined' && window.document)
			window.localStorage.setItem(
				LOCALSTORAGE_IS_NAVBAR_NARROW_KEY,
				JSON.stringify(isNarrow),
			)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.warn('could not save to localStorage')
	}
}

export default defineComponent({
	name: 'NavBar',
	setup() {
		const route = useRoute()
		const router = useRouter()

		const isNarrow = ref<boolean>(
			(() => {
				try {
					if (typeof window !== 'undefined' && window.document) {
						const value = window.localStorage.getItem(
							LOCALSTORAGE_IS_NAVBAR_NARROW_KEY,
						)
						if (value) return JSON.parse(value)
					}
				} catch (error) {
					// eslint-disable-next-line no-console
					console.warn('could not read localStorage')
				}
				return false
			})(),
		)

		return {
			handleLinkClick(link: Kotti.Navbar.SectionLink & { to: string }) {
				router.value.push(link.to)
			},
			isNarrow,
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
			sections: menu.map(
				(section): Kotti.Navbar.Section => ({
					links: section.subsections.map(
						(subsection): Kotti.Navbar.SectionLink & { to: string } => ({
							icon: subsection.icon,
							isActive:
								subsection.path === ''
									? route.value.path === '/'
									: route.value.path.startsWith(`/${subsection.path}`),
							title: subsection.title,
							to: `/${subsection.path}${
								subsection.pages.length >= 1
									? `/${subsection.pages[0].path}`
									: ''
							}`,
						}),
					),
					title: section.title,
				}),
			),
			setIsNarrow: (value: boolean) => {
				saveSavedFieldsToLocalStorage(value)
				isNarrow.value = value
			},
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
</style>
