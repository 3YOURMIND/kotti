<template>
	<div class="actionbar">
		<div class="actionbar-wrapper">
			<div class="actionbar-header">
				<h1 v-text="subsection.title" />
			</div>
			<div class="actionbar-body">
				<div class="actionbar-menu has-icon-right">
					<ul>
						<nuxt-link
							v-for="page in subsection.pages"
							:key="page.to"
							:to="`/${subsection.path}/${page.path}`"
						>
							<li>
								<span v-text="page.label" />
								<span
									v-for="(tag, index) in page.tags"
									:key="index"
									class="tag"
									:class="`tag--is-${tag}`"
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
import { computed, defineComponent } from '@vue/composition-api'

import { Section, Subsection, menu } from '../data/menu'
import { useRoute } from '../hooks/use-route'

export default defineComponent({
	name: 'ActionBar',
	setup() {
		const route = useRoute()

		const path = computed(
			() => route.value.path.split('/')[1]?.toLowerCase() ?? null,
		)

		const subsection = computed(
			(): Subsection => {
				const match = menu
					.flatMap((menuItem: Section) => menuItem.subsections)
					.find((link) => link.path === path.value)

				if (!match) throw new Error('Actionbar.vue: Could not find Subsection')

				return match
			},
		)

		return {
			subsection,
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

	&--is-ts {
		color: var(--primary-70);
		background: var(--primary-20);
	}
}
</style>
