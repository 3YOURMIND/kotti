<template>
	<div class="code-switch">
		<div class="switcher" @click="showCode = !showCode" v-text="currentCode" />
		<slot v-if="showCode" name="vue" />
		<slot v-else name="style" />
	</div>
</template>

<script>
export default {
	name: 'ShowCase',
	props: {
		vueSlotLabel: String,
		styleSlotLabel: String,
	},
	data() {
		return {
			showCode: true,
		}
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
