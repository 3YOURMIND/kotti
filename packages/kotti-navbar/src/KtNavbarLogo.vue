<template>
	<div :style="{ color: textColor }">
		<div :class="objectClass">
			<img :src="logoUrl" v-if="!isNarrow" />
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
		<div class="navbar-logo--mobile"><img :src="logoUrl" /></div>
	</div>
</template>

<script>
export default {
	name: 'KtNavbarLogo',
	props: {
		textColor: { type: String, default: null },
		isNarrow: { type: Boolean, default: false },
		logoUrl: { type: String, default: null },
	},
	methods: {
		handleToggleNarroClicked() {
			this.$emit('toggleNarrowBar')
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
