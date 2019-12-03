<template>
	<nav class="kt-navbar">
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
	// inject: {
	// 	KtTheme: {
	// 		default: {
	// 			navbarBackgroundColor: '#122C56',
	// 			navbarTextColor: 'rgba(255,255,255,.54)',
	// 			navbarTextActiveColor: 'rgba(255,255,255, 1)',
	// 		},
	// 	},
	// },
	inject: ['KtTheme'],
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
$narrow-navbar-width: 3.2rem;

.kt-navbar {
	flex: 0 0 $navbar-width;
	background-color: $primary-600;
	border-right: 1px solid #000;
	bottom: 0;
	left: 0;
	top: 0;
	position: relative;
	z-index: $zindex-1;
	min-height: 100vh;
	&--narrow {
		flex: 0 0 $narrow-navbar-width;
	}
}

.kt-navbar-wrapper {
	position: fixed;
	width: $navbar-width;
	display: flex;
	height: 100%;
	flex-wrap: nowrap;
	flex-direction: column;
	&--narrow {
		flex: 0 0 $narrow-navbar-width;
		width: $narrow-navbar-width;
	}
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
	&:hover {
		cursor: pointer;
		background: rgba(0, 0, 0, 0.24);
	}
	&--active {
		background: $primary-700;
	}
}

.kt-navbar__header {
	flex: 1 1 auto;
	border-bottom: 1px solid rgba(#fff, 0.26);
	&--narrow {
		padding: 1rem 0;
		text-align: center;
	}
	&:hover {
		cursor: pointer;
	}
}

.kt-navbar__body {
	flex: 1 1 100%;
	overflow-y: auto;
	&--narrow {
		padding: 0;
	}
}

.kt-navbar__footer {
	flex: 0 0 auto;
	padding: 0.8rem;
	border-top: 1px solid rgba(#fff, 0.26);
	&--narrow {
		display: flex;
		justify-content: center;
	}
}

.kt-navbar__dropdown {
	position: absolute;
	top: $mobile-navbar-height;
	padding: 0.8rem 0;
	width: 100%;
	display: none;
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.26);
}

@media (max-width: $size-md) {
	.kt-navbar {
		height: 2.4rem;
		min-height: auto;
		z-index: $zindex-4;
		border: 0;
		flex: 0 0 $mobile-navbar-height;
	}
	.kt-navbar-wrapper {
		width: 100%;
		padding: 0;
		position: relative;
		flex-direction: row;
		flex: 0 0 $mobile-navbar-height;
		height: $mobile-navbar-height;
		border-bottom: 1px solid #ddd;
	}
	.kt-navbar__header {
		width: 100%;
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
		&--logo {
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
			background: rgba(#fff, 0.26);
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
