<template>
	<nav class="kt-navbar" :class="{ 'kt-navbar--narrow': $KtNavbar.isNarrow }">
		<div class="kt-navbar-wrapper">
			<div class="kt-navbar-toggle" @click="toggleMobileMenu">
				<i class="yoco" v-text="'burger'" />
			</div>
			<div class="kt-navbar__header">
				<KtNavbarLogo :labelText="labelText" @logoClick="$emit('logoClick')">
					<slot name="navbar-logo">
						<img :src="logoUrl" alt="logo" />
					</slot>
				</KtNavbarLogo>
			</div>
			<kt-navbar-notification
				v-if="notification"
				:count="notification.count"
				:title="notification.title"
				:link="notification.link"
			/>
			<div class="kt-navbar__body">
				<KtNavbarMenu
					:sections="sections"
					@menuLinkClick="$emit('linkClick', $event)"
				/>
				<kt-navbar-quick-link
					v-if="quickLinks"
					:title="quickLinks.title"
					:links="quickLinks.links"
				/>
			</div>
			<div class="kt-navbar__footer">
				<slot name="navbar-footer" />
			</div>
			<div class="kt-navbar__dropdown" v-if="mobileMenuToggle">
				<KtNavbarMenu
					:sections="sections"
					@menuLinkClick="$emit('linkClick', $event)"
					v-on-clickaway="clickawayMobileMenu"
				/>
				<kt-navbar-quick-link
					v-if="quickLinks"
					:title="quickLinks.title"
					:links="quickLinks.links"
					v-on-clickaway="clickawayMobileMenu"
				/>
			</div>
		</div>
	</nav>
</template>

<script>
import { mixin as clickaway } from 'vue-clickaway'
import color from 'color'
import KtNavbarLogo from './KtNavbarLogo'
import KtNavbarMenu from './KtNavbarMenu'
import KtNavbarNotification from './KtNavbarNotification'
import KtNavbarQuickLink from './KtNavbarQuickLink'

export default {
	name: 'KtNavbar',
	mixins: [clickaway],
	components: {
		KtNavbarLogo,
		KtNavbarMenu,
		KtNavbarNotification,
		KtNavbarQuickLink,
	},
	props: {
		sections: { type: Array, required: true },
		notification: { type: Object, default: null },
		quickLinks: { type: Object, default: null },
		labelText: { type: String, default: null },
		logoUrl: { type: String },
	},
	data() {
		return {
			mobileMenuToggle: false,
		}
	},
	methods: {
		objectClass(className) {
			return {
				[className]: true,
				[`${className}--narrow`]: this.$KtNavbar.isNarrow,
			}
		},
		clickawayMobileMenu() {
			this.mobileMenuToggle = false
		},
		toggleMobileMenu() {
			this.mobileMenuToggle = !this.mobileMenuToggle
		},
	},
	created() {
		this.$parent.$on('clickawayKtNavbarMobileMenu', this.clickawayMobileMenu)
	},
}
</script>
<style lang="scss">
$mobile-navbar-height: 2.4rem;
$narrow-navbar-width: 3.4rem;

:root {
	--navbar-background: var(--primary-90);
	--navbar-border: var(--primary-50);
	--navbar-color: var(--primary-20);
	--navbar-color-active: var(--white);
}

.kt-navbar {
	flex: 0 0 $navbar-width;
	background-color: var(--navbar-background);
	color: var(--navbar-color);
	border-right: 1px solid var(--navbar-border);
	bottom: 0;
	left: 0;
	top: 0;
	position: relative;
	z-index: $zindex-1;
	min-height: 100vh;
	width: $navbar-width;
}

.kt-navbar-wrapper {
	position: fixed;
	display: flex;
	height: 100%;
	flex-wrap: nowrap;
	flex-direction: column;
	width: $navbar-width;
}

.kt-navbar-toggle {
	height: $mobile-navbar-height;
	display: none;
	color: #fff;
	flex: 0 0 2.4rem;
	justify-content: center;
	text-align: center;
	align-items: center;
	width: 2.4rem;
	cursor: pointer;
}

.kt-navbar__header {
	flex: 1 1 auto;
	border-bottom: 1px solid var(--navbar-border);
	cursor: pointer;
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
	background-color: var(--navbar-background);
	position: absolute;
	top: $mobile-navbar-height;
	width: 100%;
	display: none;
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
	.kt-navbar-logo__logo {
		display: block;
		padding: 0;
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
			right: 0.4rem;
			position: absolute;
		}
	}
	.kt-navbar-quick-links {
		text-align: center;
		padding: 0.8rem 0;
		&__link {
			display: block;
		}
	}
}

// Mobile version
@media (max-width: $size-md) {
	.kt-navbar {
		height: 2.4rem;
		min-height: auto;
		z-index: $zindex-4;
		border: 0;
		flex: 0 0 $mobile-navbar-height;
		width: auto;
	}
	.kt-navbar-wrapper {
		width: 100%;
		padding: 0;
		position: relative;
		flex-direction: row;
		flex: 0 0 $mobile-navbar-height;
		height: $mobile-navbar-height;
		border-bottom: 1px solid var(--navbar-border);
	}
	.kt-navbar__header {
		width: auto;
		padding: 0.2rem 0;
		border: 0;
	}
	.kt-navbar__footer {
		display: flex;
		border: 0;
		flex: 0 0 2.4rem;
		justify-content: center;
		align-items: center;
	}
	.kt-navbar-logo {
		display: none;
		&--mobile {
			display: flex;
		}
		&__logo {
			background-position: center;
		}
	}
	.kt-navbar-notification {
		display: none;
		&--mobile {
			border: 0;
			margin: 0.6rem 0;
			height: 1.2rem;
			width: 1.2rem;
			text-align: center;
			border-radius: 1.2rem;
			display: block;
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
