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
			<div v-if="!isNarrow" class="yoco" v-text="Yoco.Icon.LINK" />
			<span v-if="!isNarrow" v-text="item.title" />
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
import type { PropType } from 'vue'
import { computed, defineComponent } from 'vue'

import { Yoco } from '@3yourmind/yoco'

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
	padding: 0.1rem;
	margin-top: 0.4rem;

	&__title {
		font-size: 13px;
		font-weight: 600;
		text-transform: uppercase;
		opacity: 0.6;
	}
}

.kt-navbar-quick-link {
	display: flex;
	align-items: center;
	padding: 0.1rem 0.5rem;
	color: var(--kt-navbar-color-light);

	span {
		margin-left: var(--unit-2);
		font-weight: 400;
	}

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
