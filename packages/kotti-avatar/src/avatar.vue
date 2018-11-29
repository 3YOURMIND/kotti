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
		hoverable: { default: false, type: Boolean },
		name: { default: null, type: String },
		selected: { default: false, type: Boolean },
		showTooltip: { default: false, type: Boolean },
		small: { default: false, type: Boolean },
		src: { default: null, type: String },
		zIndex: { default: 'inherit', types: [String, Number] },
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
