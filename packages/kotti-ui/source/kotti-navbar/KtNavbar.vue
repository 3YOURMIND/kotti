<template>
	<nav class="kt-navbar" :class="classes">
		<div class="kt-navbar-wrapper">
			<div class="kt-navbar-toggle" @click="toggleMobileMenu">
				<i class="yoco" v-text="'burger'" />
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
			<div v-if="mobileMenuToggle" class="kt-navbar__dropdown">
				<NavbarMenu
					:isNarrow="isNarrow"
					:sections="sections"
					@menuLinkClick="$emit('linkClick', $event)"
				/>
				<NavbarQuickLink
					v-if="quickLinks.length"
					v-on-clickaway="clickawayMobileMenu"
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
import { computed, defineComponent, provide, ref } from '@vue/composition-api'
import { mixin as clickaway } from 'vue-clickaway'

import { propValidator } from '../props'

import NavbarLogo from './components/NavbarLogo.vue'
import NavbarMenu from './components/NavbarMenu.vue'
import NavbarNotification from './components/NavbarNotification.vue'
import NavbarQuickLink from './components/NavbarQuickLink.vue'
import { IS_NAVBAR_NARROW } from './constants'
import { KottiNavbar } from './types'

export default defineComponent<KottiNavbar.PropsInternal>({
	name: 'KtNavbar',
	components: {
		NavbarLogo,
		NavbarMenu,
		NavbarNotification,
		NavbarQuickLink,
	},
	mixins: [clickaway],
	props: {
		isNarrow: {
			default: false,
			type: Boolean,
			validator: propValidator(KottiNavbar.propsInternalSchema, 'isNarrow'),
		},
		logoUrl: {
			required: true,
			type: String,
			validator: propValidator(KottiNavbar.propsInternalSchema, 'logoUrl'),
		},
		notification: {
			default: null,
			type: Object,
			validator: propValidator(KottiNavbar.propsInternalSchema, 'notification'),
		},
		quickLinks: {
			default: () => [],
			type: Array,
			validator: propValidator(KottiNavbar.propsInternalSchema, 'quickLinks'),
		},
		sections: {
			required: true,
			type: Array,
			validator: propValidator(KottiNavbar.propsInternalSchema, 'sections'),
		},
		theme: {
			default: null,
			type: String,
			validator: propValidator(KottiNavbar.propsInternalSchema, 'theme'),
		},
	},
	setup(props, { emit }) {
		const mobileMenuToggle = ref(false)

		provide(
			IS_NAVBAR_NARROW,
			computed(() => props.isNarrow),
		)
		return {
			classes: computed(() => ({
				'kt-navbar--narrow': props.isNarrow,
				[`kt-navbar--theme-${props.theme}`]: props.theme !== null,
			})),
			clickawayMobileMenu: () => (mobileMenuToggle.value = false),
			mobileMenuToggle,
			setIsNarrow: (isNarrow: boolean) => emit('setIsNarrow', isNarrow),
			toggleMobileMenu() {
				mobileMenuToggle.value = !mobileMenuToggle.value
			},
		}
	},
})
</script>

<style lang="scss">
@import '../kotti-style/_variables.scss';

$mobile-navbar-height: 2.4rem;
$narrow-navbar-width: 3.4rem;

.kt-navbar {
	--navbar-background: var(--primary-70);
	--navbar-border: var(--primary-60);
	--navbar-color: var(--primary-10);
	--navbar-color-light: var(--primary-20);
	--navbar-color-active: var(--white);

	--user-menu-border: var(--primary-80);
	--user-menu-background-active: var(--primary-70);
	--user-menu-background: var(--primary-60);
	--user-menu-color: var(--primary-10);

	position: relative;
	top: 0;
	bottom: 0;
	left: 0;
	z-index: $zindex-1;
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

		--user-menu-border: var(--primary-30);
		--user-menu-background-active: var(--primary-30);
		--user-menu-background: var(--primary-20);
		--user-menu-color: var(--primary-80);
	}

	&--theme-light {
		--navbar-background: var(--white);
		--navbar-border: var(--gray-20);
		--navbar-color: var(--primary-90);
		--navbar-color-light: var(--primary-50);
		--navbar-color-active: var(--primary-80);

		--user-menu-border: var(--gray-30);
		--user-menu-background-active: var(--gray-20);
		--user-menu-background: var(--gray-10);
		--user-menu-color: var(--primary-90);
	}

	&--theme-dark {
		--navbar-background: var(--gray-90);
		--navbar-border: var(--gray-70);
		--navbar-color: var(--gray-20);
		--navbar-color-light: var(--gray-10);
		--navbar-color-active: var(--primary-10);

		--user-menu-border: var(--gray-30);
		--user-menu-background-active: var(--gray-80);
		--user-menu-background: var(--gray-70);
		--user-menu-color: var(--gray-10);
	}

	a:active,
	a:focus {
		color: var(--navbar-color-active);
	}
}

.kt-navbar-wrapper {
	position: fixed;
	display: flex;
	flex-direction: column;
	flex-wrap: nowrap;
	width: $navbar-width;
	height: 100%;
}

.kt-navbar-toggle {
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

.kt-navbar__header {
	flex: 0 0 auto;
	cursor: pointer;
	border-bottom: 1px solid var(--navbar-border);
}

.kt-navbar__body {
	flex: 1 1 100%;
	overflow-y: auto;
}

.kt-navbar__footer {
	flex: 0 0 auto;
	padding: 0.8rem;
	border-top: 1px solid var(--navbar-border);
}

.kt-navbar__dropdown {
	position: absolute;
	top: $mobile-navbar-height;
	display: none;
	width: 100%;
	background-color: var(--navbar-background);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
}

// Narrowed navbar
.kt-navbar--narrow {
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

	.kt-navbar-menu {
		padding: 0.4rem 0;
		margin: 0.8rem 0.2rem;
		text-align: center;
	}

	.kt-navbar-notification {
		justify-content: center;
		padding: 0.8rem 0;
		&__number {
			position: absolute;
			right: 0.4rem;
		}
	}

	.kt-navbar-quick-links {
		padding: 0.8rem 0;
		text-align: center;
		&__link {
			display: block;
		}
	}
}

// Mobile version
@media (max-width: $size-md) {
	.kt-navbar {
		z-index: $zindex-4;
		flex: 0 0 $mobile-navbar-height;
		width: auto;
		height: 2.4rem;
		min-height: auto;
		border: 0;
	}

	.kt-navbar-wrapper {
		position: relative;
		flex: 0 0 $mobile-navbar-height;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
		height: $mobile-navbar-height;
		padding: 0;
		border-bottom: 1px solid var(--navbar-border);
	}

	.kt-navbar__header {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;

		width: auto;
		padding: 0.2rem 0;
		border: 0;
	}

	.kt-navbar__footer {
		display: flex;
		flex: 0 0 2.4rem;
		align-items: center;
		justify-content: center;
		border: 0;
	}

	.kt-navbar-notification {
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

	.kt-navbar__body {
		display: none;
	}

	.kt-navbar__dropdown {
		display: block;
	}

	.kt-navbar--narrow .kt-navbar-wrapper {
		padding: 0;
	}

	.kt-navbar-toggle {
		display: flex;
	}
}
</style>
