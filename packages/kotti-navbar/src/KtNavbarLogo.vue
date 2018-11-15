<template>
	<div :style="{ color: themeColor.textColor }">
		<div :class="objectClass">
			<img :src="themeColor.logoUrl" v-if="!isNarrow" />
			<i
				v-if="!isNarrow"
				class="yoco"
				v-text="'triangle_left'"
				@click="handleToggleNarroClicked"
			/>
			<i
				v-if="isNarrow"
				class="yoco"
				v-text="'burger'"
				@click="handleToggleNarroClicked"
			/>
		</div>
		<div class="navbar-logo--mobile"><img :src="themeColor.logoUrl" /></div>
	</div>
</template>

<script>
export default {
	name: 'KtNavbarLogo',
	props: {
		isNarrow: { type: Boolean, default: false },
	},
	methods: {
		handleToggleNarroClicked() {
			this.$emit('toggleNarrowBar')
		},
	},
	inject: {
		themeColor: {
			from: 'KtNavbarTheme',
			default: () => {
				return {
					textColor: '#fff',
					logoUrl: null,
				}
			},
		},
	},
	computed: {
		objectClass() {
			return {
				'navbar-logo': true,
				'navbar-logo--narrow': this.isNarrow,
			}
		},
	},
}
</script>
