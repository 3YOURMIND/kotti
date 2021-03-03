<template>
	<div class="kt-navbar__quick-links">
		<div
			v-if="!isNarrow"
			class="kt-navbar__quick-links__title"
			v-text="title"
		/>
		<a
			v-for="(item, index) in links"
			:key="index"
			class="kt-navbar__quick-links__link"
			:href="item.link"
			rel="noopener noreferrer"
			target="_blank"
		>
			<span v-if="!isNarrow" v-text="item.title" />
			<i class="yoco" v-text="Yoco.Icon.LINK" />
		</a>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent } from '@vue/composition-api'

import { useTranslationNamespace } from '../../kotti-translation/hooks'
import { Kotti } from '../../types'

export default defineComponent<{
	links: Kotti.Navbar.QuickLink[]
}>({
	name: 'KtNavbarQuickLink',
	props: {
		links: { required: true, type: Array },
	},
	setup(props, { root }) {
		const translations = useTranslationNamespace('KtNavbar')

		return {
			// @ts-expect-error legacy GlobalVue.$KtNavbar hack
			isNarrow: computed(() => root.$KtNavbar.isNarrow),
			title: computed(() => translations.value.quickLinksTitle),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-navbar__quick-links {
	padding: 1.2rem 1rem;
	margin: 0.4rem 0;

	&__link {
		display: flex;
		align-items: center;

		&:hover {
			color: var(--navbar-color-light);
		}

		.yoco {
			font-size: 0.8rem;
		}
	}

	&__title {
		font-size: 0.6rem;
		font-weight: 700;
		text-transform: uppercase;
		opacity: 0.64;
	}
}
</style>
