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
					:logoUrl="logoUrl"
					:isNarrow="isNarrowNavBar"
					:textColor="themeColor.textColor"
					@toggleNarrowBar="toggleNarrowBar"
				/>
			</div>
			<kt-navbar-notification
				v-if="showNotification"
				:isNarrow="isNarrowNavBar"
				:number="10"
				:textColor="themeColor.textColor"
				:borderColor="themeColor.borderColor"
			/>
			<div :class="objectClass('navbar-body')">
				<kt-navbar-menu
					:menu="menu"
					:textColor="themeColor.textColor"
					:activeColor="themeColor.activeColor"
					:isNarrow="isNarrowNavBar"
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
					:menu="menu"
					:textColor="themeColor.textColor"
					:activeColor="themeColor.activeColor"
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

export default {
	name: 'KtNavbar',
	mixins: [clickaway],
	components: {
		KtNavbarLogo,
		KtNavbarMenu,
		KtNavbarNotification,
	},
	props: {
		isNarrow: { type: Boolean, default: false },
		menu: { type: Array, required: true },
		showNotification: { type: Boolean, default: false },
		theme: {
			type: Object,
			default: () => ({
				color: {
					backgroundColor: null,
					textColor: null,
				},
				logo: {
					wide: null,
					narrow: null,
				},
			}),
		},
	},
	data() {
		return {
			isNarrowNavBarToggle: this.isNarrow,
			mobileMenuToggle: false,
			defaultThemeColor: {
				backgroundColor: '#122C56',
				textColor: 'rgba(255,255,255, 0.84)',
				borderColor: '#rgba(255,255,255, 0.14)',
			},
		}
	},
	created() {
		this.$parent.$on('clickawayKtNavbarMobileMenu', this.clickawayMobileMenu)
	},
	computed: {
		isNarrowNavBar() {
			if (this.isNarrowNavBarToggle === null) {
				return this.isNarrow
			}
			return this.isNarrowNavBarToggle
		},
		navbarActiveToggleStyle() {
			return {
				'background-color': this.mobileMenuToggle
					? this.themeColor.borderColor
					: '',
			}
		},
		logoUrl() {
			return this.isNarrowNavBar && this.theme.logo.narrow
				? this.theme.logo.narrow
				: this.theme.logo.wide
		},
		themeColor() {
			return this.theme.color ? this.theme.color : this.defaultThemeColor
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
}
</script>
