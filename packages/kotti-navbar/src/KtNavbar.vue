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
					:isNarrow="isNarrowNavBar"
					@toggleNarrowBar="toggleNarrowBar"
				/>
			</div>
			<kt-navbar-notification
				v-if="notification"
				:isNarrow="isNarrowNavBar"
				:count="notification.count"
				:title="notification.title"
				:link="notification.link"
			/>
			<div :class="objectClass('navbar-body')">
				<kt-navbar-menu :sections="sections" :isNarrow="isNarrowNavBar" />
				<kt-navbar-quick-link
					v-if="quickLinks"
					:isNarrow="isNarrowNavBar"
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
import { mixin as clickaway } from '../../../src/mixin/vue-clickaway'
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
		isNarrow: { type: Boolean, default: false },
		sections: { type: Array, required: true },
		notification: { type: Object, default: null },
		quickLinks: { type: Object, default: null },
	},
	inject: {
		themeColor: {
			from: 'KtNavbarTheme',
			default: () => ({
				backgroundColor: '#122C56',
				textColor: 'rgba(255,255,255, 0.8)',
				activeColor: 'rgba(255,255,255, 1)',
				borderColor: '#rgba(255,255,255, 0.14)',
				logoUrl: null,
			}),
		},
	},
	data() {
		return {
			isNarrowNavBarToggle: this.isNarrow,
			mobileMenuToggle: false,
		}
	},
	computed: {
		isNarrowNavBar() {
			return this.isNarrowNavBarToggle === null
				? this.isNarrow
				: this.isNarrowNavBarToggle
		},
		navbarActiveToggleStyle() {
			return {
				'background-color': this.mobileMenuToggle
					? this.themeColor.borderColor
					: '',
			}
		},
	},
	methods: {
		objectClass(className) {
			return {
				[className]: true,
				[`${className}--narrow`]: this.isNarrowNavBar,
			}
		},
		clickawayMobileMenu() {
			this.mobileMenuToggle = false
		},
		toggleMobileMenu() {
			this.mobileMenuToggle = !this.mobileMenuToggle
		},
		toggleNarrowBar() {
			this.isNarrowNavBarToggle = !this.isNarrowNavBarToggle
		},
		navbarNarrowBarEvent() {
			this.$emit('toggleKtNavbarNarrowEvent', this.isNarrowNavBarToggle)
		},
	},
	watch: {
		isNarrowNavBar: {
			immediate: true,
			handler: 'navbarNarrowBarEvent',
		},
	},
	created() {
		this.$parent.$on('clickawayKtNavbarMobileMenu', this.clickawayMobileMenu)
	},
}
</script>
