<template>
	<nav :class="objectClass('navbar')">
		<div :class="objectClass('navbar-wrapper')">
			<div :class="navbarToggleClass" @click="toggleMobileMenu">
				<i class="yoco" v-text="'burger'"/>
			</div>
			<div class="navbar-header">
				<slot name="navbar-header">
						<div :class="objectClass('navbar-logo')" @click="$emit('clickLogo')">
							<img :src="logoUrl" class="navbar-logo-img"/>
							<img :src="theme.logo.wide" class="navbar-logo-img--mobile"/>
						</div>
				</slot>
			</div>
			<div class="navbar-narrow-toggle" @click="toggleNarrowBar"/>
			<div class="navbar-body">
				<div :class="objectClass('navbar-menu')">
					<slot name="navbar-body">
						<ul>
								<router-link
									v-for="item in menu"
									:exact="item.exact"
									:key="item.index"
									:to="item.to"
									tag="li">
									<i class="yoco" v-text="item.icon" />
									<span v-if="!isNarrowNavBar" v-text="item.label"/>
								</router-link>
						</ul>
					</slot>
				</div>
			</div>
			<div :class="objectClass('navbar-footer')">
				<slot name="navbar-footer" />
			</div>
			<div class="navbar-dropdown" v-if="mobileMenuToggle" v-on-clickaway="clickawayMobileMenu" >
				<div class="navbar-menu">
					<ul>
						<router-link
							v-for="item in menu"
							:exact="item.exact"
							:key="item.index"
							:to="item.to"
							tag="li">
							<i class="yoco" v-text="item.icon" />
							<span v-if="!isNarrowNavBar" v-text="item.label"/>
						</router-link>
					</ul>
					<slot name="navbar-menu" />
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import { mixin as clickaway } from '../../../src/mixin/vue-clickaway'

export default {
	name: 'KtNavbar',
	mixins: [clickaway],
	activeClassName: { type: String, default: null },
	props: {
		isNarrow: { type: Boolean, default: false },
		menu: { type: Array, required: true },
		theme: {
			type: Object,
			default: () => ({
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
		navbarToggleClass() {
			return {
				'navbar-toggle': true,
				'navbar-toggle--active': this.mobileMenuToggle,
			}
		},
		logoUrl() {
			return this.isNarrowNavBar && this.theme.logo.narrow
				? this.theme.logo.narrow
				: this.theme.logo.wide
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
