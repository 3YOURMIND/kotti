<template>
	<nav :class="objectClass('navbar')">
		<div :class="objectClass('navbar-wrapper')">
			<div :class="navbarToggleClass" @click="toggleMobieMenu">
				<i class="yoco" v-text="'burger'"/>
			</div>
			<div class="navbar-header">
				<slot name="navbar-header">
					<div class="navbar-logo">
						<img :src="theme.logoUrl" />
					</div>
				</slot>
			</div>
			<div class="navbar-narrow-toggle" @click="toggleNarrowBar"/>
			<div class="navbar-body">
				<div :class="objectClass('navbar-menu')">
					<ul>
						<router-link :exact="item.exact" tag="li" v-for="item in menu" :key="item.index" :to="item.to">
							<i class="yoco" v-text="item.icon" />
							<span v-text="item.label" v-if="!isNarrowNavBar"/>
						</router-link>
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
						<router-link :exact="item.exact" tag="li" v-for="item in menu" :key="item.index" :to="item.to">
							<i class="yoco" v-text="item.icon" />
							<span v-text="item.label" />
						</router-link>
					</ul>
					<slot name="navbar-menu" />
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import { mixin as clickaway } from '../../mixin/vue-clickaway'

export default {
	name: 'KtNavbar',
	mixins: [clickaway],
	props: {
		isNarrow: { type: Boolean, default: false },
		menu: { type: Array, required: true },
		theme: {
			type: Object,
			default: () => {
				logoUrl: null
			},
		},
	},
	data(props) {
		return {
			isNarrowNavBarToggle: props.isNarrow,
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
		toggleMobieMenu() {
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
