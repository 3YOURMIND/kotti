<template>
	<div :style="{ color: themeColor.textColor }">
		<div :class="objectClass">
			<img
				:src="themeColor.logoUrl"
				v-if="themeColor.logoUrl && !isNarrow"
				:height="themeColor.logoHeight"
			/>
			<div v-if="!themeColor.logoUrl && !isNarrow">{{ labelText }}</div>
			<i class="yoco" v-text="iconText" @click="handleToggleNarrowClicked" />
		</div>
		<div class="navbar-logo--mobile"><img :src="themeColor.logoUrl" /></div>
	</div>
</template>

<script>
export default {
	name: 'KtNavbarLogo',
	props: {
		isNarrow: { type: Boolean, default: false },
		labelText: { type: String, default: '' },
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
			return this.isNarrow ? 'burger' : 'triangle_left'
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
