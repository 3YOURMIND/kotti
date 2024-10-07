<template>
	<div class="kt-navbar-quick-links">
		<div v-if="!isNarrow" class="kt-navbar-quick-links__title" v-text="title" />
		<a
			v-for="(item, index) in links"
			:key="index"
			class="kt-navbar-quick-link"
			:href="item.link"
			rel="noopener noreferrer"
			target="_blank"
		>
			<span v-if="!isNarrow" v-text="item.title" />
			<div v-if="!isNarrow" class="yoco" v-text="Yoco.Icon.LINK" />
			<NavbarTooltip
				v-else
				class="kt-navbar-quick-link__tooltip"
				:icon="Yoco.Icon.LINK"
				:label="item.title"
			/>
		</a>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import type { KottiNavbar } from '../types'

import NavbarTooltip from './NavbarTooltip.vue'

export default defineComponent({
	name: 'KtNavbarQuickLink',
	components: {
		NavbarTooltip,
	},
	props: {
		isNarrow: { default: false, type: Boolean },
		links: {
			required: true,
			type: Array as PropType<Array<KottiNavbar.QuickLink>>,
		},
	},
	setup() {
		const translations = useTranslationNamespace('KtNavbar')

		return {
			title: computed(() => translations.value.quickLinksTitle),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-navbar-quick-links {
	padding: 1.2rem 1rem;
	margin: 0.4rem 0;

	&__title {
		font-size: 0.6rem;
		font-weight: 700;
		text-transform: uppercase;
		opacity: 0.64;
	}
}

.kt-navbar-quick-link {
	display: flex;
	align-items: center;
	color: var(--kt-navbar-color-light);

	&:hover {
		color: var(--kt-navbar-color-active);
	}

	:deep(.yoco) {
		font-size: 0.8rem;
	}

	&__tooltip {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
	}
}
</style>
