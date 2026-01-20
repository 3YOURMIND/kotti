<template>
	<KtActionbar :headerTitle="subsection.title">
		<template #actionbar-body>
			<ul class="kt-actionbar-nav has-icon-right">
				<a
					v-for="(page, index) in subsection.pages"
					:key="index"
					:href="`/kotti/${subsection.path}/${page.path}`"
				>
					<li
						:class="{
							'kt-actionbar-nav__item': true,
							'kt-actionbar-nav__item--is-active': isActive(
								`/kotti/${subsection.path}/${page.path}`,
							),
						}"
					>
						<span v-text="page.label" />
						<span
							v-for="(tag, tagIndex) in page.tags"
							:key="tagIndex"
							class="tag"
							:class="`tag--is-${tag}`"
							:title="tagTitles[tag]"
							v-text="tag"
						/>
						<i class="yoco">chevron_right</i>
					</li>
				</a>
			</ul>
		</template>
	</KtActionbar>
</template>

<script lang="ts">
import { usePageContext } from 'vike-vue/usePageContext'
import { computed, defineComponent } from 'vue'

import { KtActionbar } from '@3yourmind/kotti-ui'

import type { Section, Subsection } from '~/data/menu'
import { menu, Tag } from '~/data/menu'

const tagTitles: Record<Tag, string> = {
	[Tag.CSS]: 'Not a component, just CSS',
	[Tag.DEPRECATED]: 'Please don’t use this anymore',
	[Tag.GUIDE]: 'Explains a concept in detail',
	[Tag.OUTDATED]: 'Do not blindly trust the information here',
	[Tag.TS]: 'Written in TypeScript and exposes type definitions',
	[Tag.ZOD]: 'Uses zod for complete validation of all props',
}

export default defineComponent({
	name: 'TheActionbar',
	components: {
		KtActionbar,
	},
	setup() {
		const pageContext = usePageContext()

		const path = computed(() => pageContext.urlPathname)

		const subsection = computed((): Subsection => {
			const match = menu
				.flatMap((menuItem: Section) => menuItem.subsections)
				.find((link) =>
					link.path === ''
						? path.value === ''
						: path.value.startsWith(`/${link.path}`),
				)

			if (!match)
				throw new Error(
					`Actionbar.vue: Could not find Subsection “${path.value}”`,
				)

			return match
		})

		return {
			isActive: (path: string) => {
				const { urlPathname } = pageContext
				return path === '/'
					? urlPathname === path
					: urlPathname.startsWith(path)
			},
			subsection,
			tagTitles,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-actionbar-nav__item {
	display: flex;
	align-items: center;

	i {
		color: var(--text-01);
	}
}

.has-icon-right i {
	margin-left: auto;
}

.tag {
	padding: 0.1rem 0.2rem;
	margin-left: 0.2rem;
	font-size: 0.6em;
	font-weight: 600;
	line-height: 1em;
	text-transform: uppercase;
	border-radius: 0.2rem;

	&--is-css {
		color: var(--green-70);
		background: var(--green-20);
	}

	&--is-deprecated {
		color: var(--support-error-bg);
		background: var(--support-error);
	}

	&--is-guide {
		color: var(--yellow-70);
		background: var(--yellow-20);
	}

	&--is-outdated {
		color: var(--orange-70);
		background: var(--orange-20);
	}

	&--is-ts {
		color: var(--primary-70);
		background: var(--primary-20);
	}

	&--is-zod {
		color: var(--primary-90);
		background: var(--primary-40);
	}
}
</style>
