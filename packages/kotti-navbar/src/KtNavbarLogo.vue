<template>
	<div :style="{ color: themeColor.textColor }">
		<div :class="objectClass" @click="$emit('logoClick')">
			<img
				:src="themeColor.logoUrl"
				v-if="themeColor.logoUrl && !isNarrow"
				:height="themeColor.logoHeight"
			/>
			<div v-if="!themeColor.logoUrl && !isNarrow" v-text="labelText" />
			<i class="yoco" v-text="iconText" @click.stop="$KtNavbar.toggle()" />
		</div>
		<div class="navbar-logo--mobile">
			<div v-if="!themeColor.logoUrl" v-text="labelText" />
			<img :src="themeColor.logoUrl" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtNavbarLogo',
	props: {
		labelText: { type: String, default: null },
	},
	methods: {
		handleToggleNarrowClicked() {
			this.$emit('toggleNarrowBar')
		},
	},
	inject: {
		KtTheme: {
			default: {
				navbarTextColor: 'rgba(255,255,255,.54)',
				logoUrl: null,
				logoHeight: '40px',
			},
		},
	},
	computed: {
		themeColor() {
			return {
				textColor: this.KtTheme.navbarTextColor,
				logoHeight: this.KtTheme.logoHeight,
				logoUrl: this.KtTheme.logoUrl,
			}
		},
		isNarrow() {
			return this.$KtNavbar.isNarrow
		},
		iconText() {
			return this.isNarrow ? 'burger' : 'hide_menu'
		},
		objectClass() {
			return {
				'navbar-logo': true,
				'navbar-logo--narrow': this.isNarrow,
			}
		},
	},
}
</script>
