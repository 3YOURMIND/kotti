<template>
	<div class="kt-actionbar">
		<div class="kt-actionbar-wrapper">
			<div class="kt-actionbar-header">
				<h1 v-text="subsection.title" />
			</div>
			<div class="kt-actionbar-body">
				<div class="kt-actionbar-menu has-icon-right">
					<ul>
						<nuxt-link
							v-for="(page, index) in subsection.pages"
							:key="index"
							:to="`/${subsection.path}/${page.path}`"
						>
							<li>
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
						</nuxt-link>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import type { Section, Subsection } from '../data/menu'
import { menu, Tag } from '../data/menu'
import { useRoute } from '../hooks/use-route'

const tagTitles: Record<Tag, string> = {
	[Tag.CSS]: 'Not a component, just CSS',
	[Tag.DEPRECATED]: 'Please don’t use this anymore',
	[Tag.GUIDE]: 'Explains a concept in detail',
	[Tag.OUTDATED]: 'Do not blindly trust the information here',
	[Tag.TS]: 'Written in TypeScript and exposes type definitions',
	[Tag.ZOD]: 'Uses zod for complete validation of all props',
}

export default defineComponent({
	name: 'ActionBar',
	setup() {
		const route = useRoute()

		const path = computed(() => route.value.path)

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
			subsection,
			tagTitles,
		}
	},
})
</script>

<style lang="scss" scoped>
.nuxt-link-exact-active li {
	font-weight: 600;
	color: #2c66c4;

	i {
		color: #2c66c4;
	}
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
		color: var(--red-70);
		background: var(--red-20);
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
