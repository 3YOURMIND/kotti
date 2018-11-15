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
				v-if="notification.showNotification"
				:isNarrow="isNarrowNavBar"
				:number="notification.number"
			/>
			<div :class="objectClass('navbar-body')">
				<kt-navbar-menu :menu="menu" :isNarrow="isNarrowNavBar" />
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
				<kt-navbar-menu :menu="menu" v-on-clickaway="clickawayMobileMenu" />
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
		notification: {
			type: Object,
			default: () => ({
				showNotification: true,
				title: 'Notification',
				link: null,
				number: 0,
			}),
		},
	},
	inject: {
		themeColor: {
			from: 'KtNavbarTheme',
			default: () => {
				return {
					backgroundColor: '#122C56',
					textColor: 'rgba(255,255,255, 0.8)',
					activeColor: 'rgba(255,255,255, 1)',
					borderColor: '#rgba(255,255,255, 0.14)',
					logoUrl: null,
				}
			},
		},
	},
	data() {
		return {
			isNarrowNavBarToggle: this.isNarrow,
			mobileMenuToggle: false,
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
			return this.themeColor
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
