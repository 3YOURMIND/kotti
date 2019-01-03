<template>
	<div :style="{ color: themeColor.textColor }">
		<div :class="objectClass">
			<img
				:src="themeColor.logoUrl"
				v-if="themeColor.logoUrl && !isNarrow"
				:height="themeColor.logoHeight"
			/>
			<div v-if="!themeColor.logoUrl && !isNarrow" v-text="labelText" />
			<i class="yoco" v-text="iconText" @click="$KtNavbar.toggle()" />
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
		isNarrow: { type: Boolean, default: false },
		labelText: { type: String, default: null },
	},
	methods: {
		handleToggleNarrowClicked() {
			this.$emit('toggleNarrowBar')
		},
	},
	inject: {
		themeColor: {
			from: 'KtNavbarTheme',
			default: () => {
				return {
					textColor: '#ffffff',
					logoHeight: '1.2rem',
					logoUrl: null,
				}
			},
		},
	},
	computed: {
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
