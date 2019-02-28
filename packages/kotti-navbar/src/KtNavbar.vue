<template>
	<nav
		:class="objectClass('navbar')"
		:style="{
			background: themeColor.backgroundColor,
			'border-color': themeColor.borderColor,
		}"
	>
		<div
			:class="objectClass('navbar-wrapper')"
			:style="{ 'border-color': themeColor.borderColor }"
		>
			<div
				class="navbar-toggle"
				:style="navbarActiveToggleStyle"
				@click="toggleMobileMenu"
			>
				<i
					class="yoco"
					v-text="'burger'"
					:style="{ color: themeColor.textColor }"
				/>
			</div>
			<div
				:class="objectClass('navbar-header')"
				:style="{ 'border-color': themeColor.borderColor }"
			>
				<kt-navbar-logo
					:labelText="labelText"
					@logoClick="$emit('logoClick')"
				/>
			</div>
			<kt-navbar-notification
				v-if="notification"
				:count="notification.count"
				:title="notification.title"
				:link="notification.link"
			/>
			<div :class="objectClass('navbar-body')">
				<kt-navbar-menu
					:sections="sections"
					@menuLinkClick="$emit('linkClick', $event)"
				/>
				<kt-navbar-quick-link
					v-if="quickLinks"
					:title="quickLinks.title"
					:links="quickLinks.links"
				/>
			</div>
			<div
				:class="objectClass('navbar-footer')"
				:style="{ 'border-color': themeColor.borderColor }"
			>
				<slot name="navbar-footer" />
			</div>
			<div
				class="navbar-dropdown"
				v-if="mobileMenuToggle"
				:style="{ background: themeColor.backgroundColor }"
			>
				<kt-navbar-menu
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
	},
	inject: {
		KtTheme: {
			default: {
				navbarBackgroundColor: '#122C56',
				navbarTextColor: 'rgba(255,255,255,.54)',
				navbarTextActiveColor: 'rgba(255,255,255, 1)',
			},
		},
	},
	data() {
		return {
			mobileMenuToggle: false,
		}
	},
	computed: {
		navbarActiveToggleStyle() {
			return {
				'background-color': this.mobileMenuToggle
					? this.themeColor.borderColor
					: '',
			}
		},
		themeColor() {
			return {
				backgroundColor: this.KtTheme.navbarBackgroundColor,
				textColor: this.KtTheme.navbarTextColor,
				borderColor: color(this.KtTheme.navbarBackgroundColor).isDark()
					? 'rgba(255,255,255,0.24)'
					: 'rgba(0,0,0,0.24)',
			}
		},
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
