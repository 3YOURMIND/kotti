<template>
	<div
		:class="avatarClasses"
		:data-tooltip="name"
  	@click="onAvatarContainerClick"
  >
		<div v-if="avatarAvailable">
			<img :src="src" @error="imgFallBack()" />
		</div>
		<div v-else :class="avatarFallbackClasses">
			<div class="avatar-fallback__head" />
			<div class="avatar-fallback__body" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Kt-Avatar',
	props: {
		name: {
			type: String,
			default: '',
		},
		src: {
			type: String,
			default: '',
		},
		selected: {
			type: Boolean,
			default: false,
		},
		small: {
			type: Boolean,
			default: false,
		},
		showTooltip: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			avatarFallback: true,
		};
	},
	computed: {
		avatarAvailable() {
			return this.src !== '' && this.avatarFallback;
		},
		avatarClasses() {
			return {
				avatar: true,
				'avatar--selected': this.selected,
				'avatar--sm': this.small,
				'tooltip tooltip-bottom': this.showTooltip,
			};
		},
		avatarFallbackClasses() {
			return {
				'avatar-fallback': true,
				'avatar-fallback--small': this.small,
			};
		},
	},
	methods: {
		imgFallBack() {
			this.avatarFallback = false;
		},
		onAvatarContainerClick($event) {
			this.$emit('click', $event);
		},
	},
};
</script>

<style lang="scss" scoped>
@import '../kotti-style/src/_variables.scss';
@import '../kotti-style/src/_avatar.scss';
</style>
