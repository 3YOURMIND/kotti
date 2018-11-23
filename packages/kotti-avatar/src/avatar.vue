<template>
	<div
		:class="avatarClasses"
		:data-tooltip="name"
		@click="onAvatarContainerClick"
		:style="{ 'z-index': zIndex }"
	>
		<div v-if="avatarAvailable">
			<img class="avatar-img" :src="src" @error="imgFallBack" />
		</div>
		<div v-else :class="avatarFallbackClasses">
			<div class="avatar-fallback__head" />
			<div class="avatar-fallback__body" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'KtAvatar',
	props: {
		name: {
			type: String,
			default: null,
		},
		src: {
			type: String,
			default: null,
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
		hoverable: Boolean,
		zIndex: {
			type: String || Number,
			default: 'auto',
		},
	},
	data() {
		return {
			avatarFallback: true,
		}
	},
	computed: {
		avatarAvailable() {
			return this.src && this.avatarFallback
		},
		avatarClasses() {
			return {
				avatar: true,
				'avatar--selected': this.selected,
				'avatar--sm': this.small,
				'avatar--hover': this.hoverable,
				'tooltip tooltip-bottom': this.showTooltip,
			}
		},
		avatarFallbackClasses() {
			return {
				'avatar-fallback': true,
				'avatar-fallback--small': this.small,
			}
		},
	},
	methods: {
		imgFallBack() {
			this.avatarFallback = false
		},
		onAvatarContainerClick($event) {
			this.$emit('click', $event)
		},
	},
}
</script>
