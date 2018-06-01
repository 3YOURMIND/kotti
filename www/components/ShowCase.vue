<template>
  <div class="code-switch">
    <div class="switcher" v-text="currentCode" @click="showCode=!showCode"/>
    <div class="code" v-if="showCode"><slot name="vue" /></div>
    <div class="code" v-else><slot class="code" name="style" /></div>
  </div>
</template>

<script>
export default {
	name: 'ShowCase',
	data() {
		return {
			showCode: true,
		};
	},
	computed: {
		currentCode() {
			return this.showCode ? 'Kotti-UI' : 'Kotti-Style';
		},
	},
};
</script>

<style lang="scss" scoped>
.code-switch {
	padding-top: 0.5rem;
	position: relative;
	display: inline-block;
	width: 100%;
	.switcher {
		position: absolute;
		top: 0;
		left: 0;
		color: #fff;
		font-size: 12px;
		background: rgba(0, 0, 0, 0.4);
		padding: 0.2rem 0.5rem;
	}
	.switcher:hover {
		background: rgba(44, 100, 204, 0.6);
		cursor: pointer;
	}
}
</style>
