<template>
	<div class="code-switch">
		<div class="switcher" v-text="currentCode" @click="showCode = !showCode" />
		<slot name="vue" v-if="showCode" />
		<slot name="style" v-else />
	</div>
</template>

<script>
export default {
	name: 'ShowCase',
	data() {
		return {
			showCode: true,
		}
	},
	props: {
		vueSlotLabel: String,
		styleSlotLabel: String,
	},
	computed: {
		currentCode() {
			return this.showCode
				? this.vueSlotLabel || 'Kotti-UI'
				: this.styleSlotLabel || 'Kotti-Style'
		},
	},
}
</script>

<style lang="scss" scoped>
.code-switch {
	position: relative;
	display: inline-block;
	width: 100%;
	padding-top: 0.5rem;

	.switcher {
		position: absolute;
		top: 0;
		left: 0;
		padding: 0.2rem 0.5rem;
		font-size: 12px;
		color: #fff;
		background: rgba(0, 0, 0, 0.4);
	}

	.switcher:hover {
		cursor: pointer;
		background: rgba(44, 100, 204, 0.6);
	}
}
</style>
