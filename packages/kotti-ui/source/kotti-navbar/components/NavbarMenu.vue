<template>
	<div class="kt-navbar-menu">
		<div v-for="(item, index) in parsedSections" :key="index">
			<div
				v-if="item.title"
				class="kt-navbar-menu__section"
				v-text="isNarrow ? '' : item.title"
			/>
			<component
				:is="link.component"
				v-for="(link, linkIndex) in item.links"
				:key="linkIndex"
				v-bind="link.props"
				class="kt-navbar-menu__item"
				:class="{ active: link.isActive, narrow: isNarrow }"
				@click="$emit('menuLinkClick', link)"
			>
				<NavbarTooltip v-if="isNarrow" :icon="link.icon" :label="link.title" />
				<div v-else class="yoco" v-text="link.icon" />
				<span
					v-if="!isNarrow"
					:data-test="`kt-navbar-section-item-${link.title.toLowerCase()}`"
					v-text="link.title"
				/>
			</component>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { makeProps } from '../../make-props'
import { KottiNavbar } from '../types'

namespace KottiNavbarMenu {
	export const propsSchema = KottiNavbar.propsSchema.pick({
		isNarrow: true,
		sections: true,
	})
}

import NavbarTooltip from './NavbarTooltip.vue'

export default defineComponent({
	name: 'KtNavbarMenu',
	components: {
		NavbarTooltip,
	},
	props: makeProps(KottiNavbarMenu.propsSchema),
	setup(props) {
		return {
			parsedSections: computed(() =>
				KottiNavbarMenu.propsSchema.shape.sections.parse(props.sections),
			),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-navbar-menu {
	box-sizing: border-box;
	padding: 0.4rem 1rem;
	text-align: left;

	&__section {
		display: block;
		padding: 0.2rem 0;
		margin-top: 0.4rem;
		font-size: 0.85em;
		font-weight: 700;
		color: var(--kt-navbar-color-light);
		text-transform: uppercase;
	}

	&__item {
		display: flex;
		align-items: center;
		padding: 0.6rem 0;
		font-size: 0.75rem;
		color: inherit;

		&:hover {
			color: var(--kt-navbar-color-active);
			cursor: pointer;
		}

		&.narrow {
			justify-content: center;
		}

		&.active {
			font-weight: 600;
			color: var(--kt-navbar-color-active);
		}
	}

	&__item span {
		margin-left: 0.8rem;
	}

	.yoco {
		font-size: 1rem;
	}
}
</style>
