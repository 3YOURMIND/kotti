<template>
	<nav ref="navbarRef" class="kt-navbar" :class="classes">
		<div class="kt-navbar-wrapper">
			<div ref="tippyTriggerRef" class="kt-navbar-toggle">
				<i class="yoco" v-text="Yoco.Icon.BURGER" />
			</div>
			<div class="kt-navbar__header">
				<NavbarLogo
					:isNarrow="isNarrow"
					:logoUrl="logoUrl"
					@logoClick="$emit('logoClick')"
					@setIsNarrow="setIsNarrow"
				/>
			</div>
			<NavbarNotification
				v-if="notification"
				:count="notification.count"
				:isNarrow="isNarrow"
				:link="notification.link"
				:title="notification.title"
			/>
			<div class="kt-navbar__body">
				<NavbarMenu
					:isNarrow="isNarrow"
					:sections="sections"
					@menuLinkClick="$emit('linkClick', $event)"
				/>
				<NavbarQuickLink
					v-if="quickLinks.length > 0"
					:isNarrow="isNarrow"
					:links="quickLinks"
				/>
			</div>
			<div
				ref="mobileMenuRef"
				class="kt-navbar__dropdown"
				@click="hideMobileMenu"
			>
				<NavbarMenu
					:sections="sections"
					@menuLinkClick="$emit('linkClick', $event)"
				/>

				<NavbarQuickLink
					v-if="quickLinks.length > 0"
					:isNarrow="isNarrow"
					:links="quickLinks"
				/>
			</div>
			<div class="kt-navbar__footer">
				<slot name="navbar-footer" />
			</div>
		</div>
	</nav>
</template>

<script lang="ts">
import castArray from 'lodash/castArray.js'
import { computed, defineComponent, provide, ref, watch } from 'vue'

import { useTippy } from '@3yourmind/vue-use-tippy'
import { Yoco } from '@3yourmind/yoco'

import { makeProps } from '../make-props'

import NavbarLogo from './components/NavbarLogo.vue'
import NavbarMenu from './components/NavbarMenu.vue'
import NavbarNotification from './components/NavbarNotification.vue'
import NavbarQuickLink from './components/NavbarQuickLink.vue'
import { NAVBAR_THEME } from './constants'
import { KT_NAVBAR_CONTEXT } from './constants'
import { KottiNavbar } from './types'

export default defineComponent({
	name: 'KtNavbar',
	components: {
		NavbarLogo,
		NavbarMenu,
		NavbarNotification,
		NavbarQuickLink,
	},
	props: makeProps(KottiNavbar.propsSchema),
	emits: ['linkClick', 'logoClick', 'setIsNarrow'],
	setup(props, { emit }) {
		const mobileMenuRef = ref<HTMLElement | null>(null)
		const navbarRef = ref<HTMLElement | null>(null)
		const tippyTriggerRef = ref<HTMLElement | null>(null)

		provide(
			KT_NAVBAR_CONTEXT,
			computed(() => ({ isNarrow: props.isNarrow, theme: props.theme })),
		)

		watch(
			() => props.theme,
			(newTheme) => {
				if (typeof document === 'undefined') return // SSR
				const rootElement = document.querySelector(':root') as HTMLElement

				rootElement.style.setProperty(
					'--kt-navbar-background',
					NAVBAR_THEME[newTheme].background,
				)
				rootElement.style.setProperty(
					'--kt-navbar-border',
					NAVBAR_THEME[newTheme].border,
				)
				rootElement.style.setProperty(
					'--kt-navbar-color',
					NAVBAR_THEME[newTheme].color,
				)
				rootElement.style.setProperty(
					'--kt-navbar-color-active',
					NAVBAR_THEME[newTheme].colorActive,
				)
				rootElement.style.setProperty(
					'--kt-navbar-color-light',
					NAVBAR_THEME[newTheme].colorLight,
				)
				rootElement.style.setProperty(
					'--user-menu-background-active',
					NAVBAR_THEME[newTheme].userMenuBackgroundActive,
				)
				rootElement.style.setProperty(
					'--user-menu-background',
					NAVBAR_THEME[newTheme].userMenuBackground,
				)
				rootElement.style.setProperty(
					'--user-menu-color',
					NAVBAR_THEME[newTheme].userMenuColor,
				)
			},
			{ immediate: true },
		)

		const { tippy } = useTippy(
			navbarRef,
			computed(() => ({
				appendTo: () => document.body,
				arrow: false,
				content: mobileMenuRef.value ?? undefined,
				interactive: true,
				maxWidth: 'none',
				offset: [0, 0],
				placement: 'bottom-start',
				theme: `kt-navbar-${props.theme}`,
				trigger: 'click',
				triggerTarget: tippyTriggerRef.value,
			})),
		)

		return {
			classes: computed(() => ({
				[`kt-navbar--theme-${props.theme}`]: true,
				'kt-navbar--narrow': props.isNarrow,
			})),
			hideMobileMenu: () => {
				if (tippy.value === null) return
				const tippys = castArray(tippy.value)

				for (const tippy of tippys) {
					tippy.hide()
				}
			},
			mobileMenuRef,
			navbarRef,
			setIsNarrow: (isNarrow: boolean) => {
				emit('setIsNarrow', isNarrow)
			},
			tippyTriggerRef,
			Yoco,
		}
	},
})
</script>

<style lang="scss">
@import '../kotti-style/_variables.scss';

.tippy-box[data-theme^='kt-navbar'] {
	width: 100vw;
	color: var(--kt-navbar-color);
	background-color: var(--kt-navbar-background);
	border-radius: 0 0 0.2rem 0.2rem;
	box-shadow: 0 2px 4px rgb(0 0 0 / 26%);

	// HACK: tippy box has a 5px offset that I can not get rid of using its props
	transform: translateX(-5px);
}
</style>

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';

$navbar-width: 12rem;
$mobile-navbar-height: 2.4rem;
$narrow-navbar-width: 3.4rem;

.kt-navbar {
	flex: 0 0 $navbar-width;
	width: $navbar-width;
	min-height: 100vh;
	color: var(--kt-navbar-color);
	background: var(--kt-navbar-background);
	border-right: 1px solid var(--kt-navbar-border);

	a:active,
	a:focus {
		color: var(--kt-navbar-color-active);
	}

	&-wrapper {
		position: fixed;
		display: flex;
		flex-flow: column nowrap;
		width: $navbar-width;
		height: 100%;
	}

	&-toggle {
		display: none;
		flex: 0 0 2.4rem;
		align-items: center;
		justify-content: center;
		width: 2.4rem;
		height: $mobile-navbar-height;
		color: var(--kt-navbar-color-light);
		cursor: pointer;

		&:hover {
			color: var(--kt-navbar-color-active);
		}

		.yoco {
			font-size: 1.2rem;
		}
	}

	&__header {
		flex: 0 0 auto;
		cursor: pointer;
	}

	&__body {
		flex: 1 1 100%;
		overflow-y: auto;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	&__footer {
		flex: 0 0 auto;
		padding: 0.8rem;
		border-top: 1px solid var(--kt-navbar-border);
	}

	&__dropdown {
		display: none;
	}

	&--narrow {
		// Needed to make the expanded user menu fully visible
		z-index: 5;
		flex: 0 0 $narrow-navbar-width;

		.kt-navbar-wrapper {
			flex: 0 0 $narrow-navbar-width;
			width: $narrow-navbar-width;
		}

		.kt-navbar__header {
			text-align: center;
		}

		.kt-navbar__body {
			padding: 0;
		}

		.kt-navbar__footer {
			display: flex;
			justify-content: center;
		}

		:deep(.kt-navbar-menu) {
			padding: 0.4rem 0;
			text-align: center;
		}

		:deep(.kt-navbar-notification) {
			justify-content: center;
			padding: 0.8rem 0;
		}

		:deep(.kt-navbar-notification__number) {
			position: absolute;
			right: 0.4rem;
		}

		:deep(.kt-navbar-quick-links) {
			padding: 0.8rem 0;
			text-align: center;
		}

		:deep(.kt-navbar-quick-link) {
			display: block;
		}
	}
}

@media (width <= $size-md) {
	.kt-navbar {
		flex: 0 0 $mobile-navbar-height;
		width: auto;
		height: 2.4rem;
		min-height: auto;
		border: 0;

		&-wrapper {
			position: relative;
			flex: 0 0 $mobile-navbar-height;
			flex-direction: row;
			justify-content: space-between;
			width: 100%;
			height: $mobile-navbar-height;
			padding: 0;
			border-bottom: 1px solid var(--kt-navbar-border);
		}

		&-toggle {
			display: flex;
		}

		&__header {
			display: flex;
			flex: 1;
			align-items: center;
			justify-content: center;
			width: auto;
			padding: 0.2rem 0;
		}

		&__footer {
			display: flex;
			flex: 0 0 2.4rem;
			align-items: center;
			justify-content: center;
			border: 0;
		}

		&__body {
			display: none;
		}

		&__dropdown {
			display: block;
		}
	}

	:deep(.kt-navbar-notification) {
		display: none;
	}

	:deep(.kt-navbar-notification--mobile) {
		display: block;
		width: 1.2rem;
		height: 1.2rem;
		margin: 0.6rem 0;
		text-align: center;
		border: 0;
		border-radius: 1.2rem;

		.yoco {
			font-size: 1rem;
		}
	}
}
</style>
