<template>
	<KtNavbar
		v-bind="{ isNarrow, sections, quickLinks }"
		:logoUrl="navLogo"
		@logoClick="onLogoClick"
		@setIsNarrow="setIsNarrow"
	>
		<template #navbar-footer>
			<a class="github-link" href="https://github.com/3YOURMIND/kotti">
				<img height="24" src="/assets/github.svg" width="24" />
			</a>
		</template>
	</KtNavbar>
</template>

<script lang="ts">
import { usePageContext } from 'vike-vue/usePageContext'
import { computed, defineComponent, ref } from 'vue'

import type { Kotti } from '@3yourmind/kotti-ui'
import { KtNavbar } from '@3yourmind/kotti-ui'

import navLogo from '~/assets/logo.svg'
import { menu } from '~/data/menu'

const LOCALSTORAGE_IS_NAVBAR_NARROW_KEY = 'kotti-documentation-is-navbar-narrow'

const saveSavedFieldsToLocalStorage = (isNarrow: boolean) => {
	try {
		if (typeof window !== 'undefined')
			window.localStorage.setItem(
				LOCALSTORAGE_IS_NAVBAR_NARROW_KEY,
				JSON.stringify(isNarrow),
			)
	} catch {
		// eslint-disable-next-line no-console
		console.warn('could not save to localStorage')
	}
}

export default defineComponent({
	name: 'TheNavbar',
	components: {
		KtNavbar,
	},
	setup() {
		const pageContext = usePageContext()

		const isNarrow = ref<boolean>(
			(() => {
				try {
					if (typeof window !== 'undefined') {
						const value = window.localStorage.getItem(
							LOCALSTORAGE_IS_NAVBAR_NARROW_KEY,
						)
						if (value) return JSON.parse(value)
					}
				} catch {
					// eslint-disable-next-line no-console
					console.warn('could not read localStorage')
				}
				return false
			})(),
		)

		return {
			isNarrow,
			navLogo,
			onLogoClick: () => {
				window.location.href = '/'
			},
			quickLinks: [
				{
					link: 'https://github.com/3YOURMIND/kotti/issues/new/choose',
					title: 'Create New Issue',
				},
				{
					link: 'https://www.npmjs.com/package/@3yourmind/kotti-ui',
					title: 'NPM',
				},
				{
					link: 'https://github.com/3YOURMIND/kotti/issues',
					title: 'Issues',
				},
				{
					link: 'https://github.com/3YOURMIND/kotti#readme',
					title: 'Readme',
				},
			],
			sections: computed(() =>
				menu.map(
					(section): Kotti.Navbar.Section => ({
						links: section.subsections.map(
							(subsection): Kotti.Navbar.SectionLink => ({
								component: 'a',
								icon: subsection.icon,
								isActive:
									subsection.path === ''
										? pageContext.urlPathname === '/'
										: pageContext.urlPathname.startsWith(`/${subsection.path}`),
								props: {
									href: [`/${subsection.path}`, subsection.pages[0]?.path]
										.filter(Boolean)
										.join('/'),
								},
								title: subsection.title,
							}),
						),
						title: section.title,
					}),
				),
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
