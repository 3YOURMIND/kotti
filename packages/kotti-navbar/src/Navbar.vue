<template>
	<nav :class="objectClass('navbar')">
		<div :class="objectClass('navbar-wrapper')">
			<div :class="navbarToggleClass" @click="toggleMobileMenu">
				<i class="yoco" v-text="'burger'"/>
			</div>
			<div class="navbar-header">
				<slot name="navbar-header">
					<a @click="$emit('clickLogo')">
						<div :class="objectClass('navbar-logo')">
							<img :src="logoUrl" class="navbar-logo-img"/>
							<img :src="theme.logo.wide" class="navbar-logo-img--mobile"/>
						</div>
					</a>
				</slot>
			</div>
			<div class="navbar-narrow-toggle" @click="toggleNarrowBar"/>
			<div class="navbar-body">
				<div :class="objectClass('navbar-menu')">
					<ul>
							<li v-for="item in menu"
							:exact="item.exact"
							:key="item.index"
							@click="handleMenuClick(item.to)">
								<i class="yoco" v-text="item.icon" />
								<span v-if="!isNarrowNavBar" v-text="item.label"/>
							</li>
					</ul>
					<slot name="navbar-body" />
				</div>
			</div>
			<div :class="objectClass('navbar-footer')">
				<slot name="navbar-footer" />
			</div>
			<div class="navbar-dropdown" v-if="mobileMenuToggle" v-on-clickaway="clickawayMobileMenu" >
				<div class="navbar-menu">
					<ul>
						<li :exact="item.exact"
							v-for="item in menu"
							:key="item.index"
							@click="handleMenuClick(item.to)">
							<i class="yoco" v-text="item.icon" />
							<span v-text="item.label" />
						</li>
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
		handleMenuClick(to) {
			if (!to || !this.$router)
				return console.warn(
					'KtNavbar: “this.$router” not available but “to” was passed.',
				)
			this.$router.push(to)
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
