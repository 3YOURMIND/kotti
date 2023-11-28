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
					v-if="quickLinks.length"
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
					:isNarrow="isNarrow"
					:sections="sections"
					@menuLinkClick="$emit('linkClick', $event)"
				/>

				<NavbarQuickLink
					v-if="quickLinks.length"
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
import { useTippy } from '@3yourmind/vue-use-tippy'
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, provide, ref } from '@vue/composition-api'
import { Instance } from 'tippy.js'

import { makeProps } from '../make-props'

import NavbarLogo from './components/NavbarLogo.vue'
import NavbarMenu from './components/NavbarMenu.vue'
import NavbarNotification from './components/NavbarNotification.vue'
import NavbarQuickLink from './components/NavbarQuickLink.vue'
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
	setup(props: KottiNavbar.PropsInternal, { emit }) {
		const mobileMenuRef = ref<HTMLElement | null>(null)
		const navbarRef = ref<HTMLElement | null>(null)
		const tippyTriggerRef = ref<HTMLElement | null>(null)
		const tippyInstanceRef = ref<Instance | null>(null)

		provide(
			KT_NAVBAR_CONTEXT,
			computed(() => ({ isNarrow: props.isNarrow, theme: props.theme })),
		)

		useTippy(
			navbarRef,
			computed(() => ({
				arrow: false,
				appendTo: () => document.body,
				content: mobileMenuRef.value ?? undefined,
				interactive: true,
				maxWidth: 'none',
				offset: [0, 0],
				onCreate(instance) {
					tippyInstanceRef.value = instance
				},
				placement: 'bottom-start',
				theme: `kt-navbar-${props.theme ?? 'default'}`,
				trigger: 'click',
				triggerTarget: tippyTriggerRef.value,
			})),
		)

		return {
			classes: computed(() => ({
				'kt-navbar--narrow': props.isNarrow,
				[`kt-navbar--theme-${props.theme}`]: props.theme !== null,
			})),
			hideMobileMenu: () => {
				tippyInstanceRef.value?.hide()
			},
			mobileMenuRef,
			navbarRef,
			setIsNarrow: (isNarrow: boolean) => emit('setIsNarrow', isNarrow),
			tippyTriggerRef,
			Yoco,
		}
	},
})
</script>

<style lang="scss">
@import '../kotti-style/_variables.scss';

.tippy-box[data-theme~='kt-navbar-default'],
.tippy-box[data-theme~='kt-navbar-dark'],
.tippy-box[data-theme~='kt-navbar-light'],
.tippy-box[data-theme~='kt-navbar-reverse'] {
	--kt-navbar-background: var(--primary-70);
	--kt-navbar-color: var(--primary-10);

	width: 100vw;
	color: var(--kt-navbar-color);
	background-color: var(--kt-navbar-background);
	border-radius: 0 0 0.2rem 0.2rem;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);

	// HACK: tippy box has a 5px offset that I can not get rid of using its props
	transform: translateX(-5px);
}

.tippy-box[data-theme~='kt-navbar-dark'] {
	--kt-navbar-background: var(--gray-90);
	--kt-navbar-color: var(--gray-10);
}

.tippy-box[data-theme~='kt-navbar-light'] {
	--kt-navbar-background: var(--white);
	--kt-navbar-color: var(--primary-90);
}

.tippy-box[data-theme~='kt-navbar-reverse'] {
	--kt-navbar-background: var(--primary-10);
	--kt-navbar-color: var(--primary-80);
}
</style>

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';

$navbar-width: 12rem;
$mobile-navbar-height: 2.4rem;
$narrow-navbar-width: 3.4rem;

.kt-navbar {
	--navbar-background: var(--primary-70);
	--navbar-border: var(--primary-60);
	--navbar-color: var(--primary-10);
	--navbar-color-light: var(--primary-20);
	--navbar-color-active: var(--white);
	--user-menu-background: var(--primary-60);

	flex: 0 0 $navbar-width;
	width: $navbar-width;
	min-height: 100vh;
	color: var(--navbar-color);
	background: var(--navbar-background);
	border-right: 1px solid var(--navbar-border);

	&--theme-reverse {
		--navbar-background: var(--primary-10);
		--navbar-border: var(--primary-20);
		--navbar-color: var(--primary-80);
		--navbar-color-light: var(--primary-60);
		--navbar-color-active: var(--primary-100);
		--user-menu-background: var(--primary-20);
	}

	&--theme-light {
		--navbar-background: var(--white);
		--navbar-border: var(--gray-20);
		--navbar-color: var(--primary-90);
		--navbar-color-light: var(--primary-50);
		--navbar-color-active: var(--primary-80);
		--user-menu-background: var(--gray-10);
	}

	&--theme-dark {
		--navbar-background: var(--gray-90);
		--navbar-border: var(--gray-70);
		--navbar-color: var(--gray-20);
		--navbar-color-light: var(--gray-10);
		--navbar-color-active: var(--primary-10);
		--user-menu-background: var(--gray-70);
	}

	a:active,
	a:focus {
		color: var(--navbar-color-active);
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
		color: var(--navbar-color-light);
		cursor: pointer;

		&:hover {
			color: var(--navbar-color-active);
		}

		.yoco {
			font-size: 1.2rem;
		}
	}

	&__header {
		flex: 0 0 auto;
		cursor: pointer;
		border-bottom: 1px solid var(--navbar-border);
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
		border-top: 1px solid var(--navbar-border);
	}

	&__dropdown {
		display: none;
	}

	&--narrow {
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

		::v-deep .kt-navbar-menu {
			padding: 0.4rem 0;
			margin: 0.8rem 0.2rem;
			text-align: center;
		}

		::v-deep .kt-navbar-notification {
			justify-content: center;
			padding: 0.8rem 0;

			&__number {
				position: absolute;
				right: 0.4rem;
			}
		}

		::v-deep .kt-navbar-quick-links {
			padding: 0.8rem 0;
			text-align: center;
		}

		::v-deep .kt-navbar-quick-link {
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
			border-bottom: 1px solid var(--navbar-border);
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
			border: 0;
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

	::v-deep .kt-navbar-notification {
		display: none;

		&--mobile {
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
}
</style>
