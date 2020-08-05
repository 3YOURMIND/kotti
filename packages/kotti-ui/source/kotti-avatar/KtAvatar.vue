<template>
	<div
		:class="avatarClasses"
		:data-tooltip="name"
		@click="onAvatarContainerClick"
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

<style lang="scss">
@import '../kotti-style/_variables.scss';

:root {
	--avatar-color: var(--interactive-01);
}

.avatar {
	position: relative;
	display: inline-flex;
	width: 2.4rem;
	height: 2.4rem;
	background: $lightgray-400;
	border: 0.1rem solid #fff;
	border-radius: 100%;
}

.avatar--hover:hover {
	cursor: pointer;
	border: 0.1rem solid var(--avatar-color);
}

.avatar-img {
	width: 100%;
	height: 100%;
	border-radius: 100%;
	object-fit: cover;
}

.avatar-group {
	display: flex;
	flex-direction: row-reverse;
	align-items: center;
	justify-content: center;

	.avatar {
		margin-right: 0.2rem;
	}

	&.stack .avatar:not(:first-of-type) {
		margin-left: -0.8rem;
	}

	.avatar.avatar-number {
		align-items: center;
		margin-left: 0.2rem;
		background: $lightgray-400;
		span {
			width: 100%;
			text-align: center;
		}
	}

	&.stack .avatar.avatar-number {
		margin-left: -0.8rem;
	}
}

.avatar--sm {
	width: 1.6rem;
	height: 1.6rem;
}

.avatar--selected {
	background: #2c64cc;
}

.avatar-fallback {
	&__head {
		position: absolute;
		top: 0.5rem;
		left: 0.8rem;
		width: 0.6rem;
		height: 0.6rem;
		background: #fff;
		border-radius: 100%;
	}

	&__body {
		position: absolute;
		top: 1.3rem;
		left: 0.5rem;
		width: 1.2rem;
		height: 0.4rem;
		background: #fff;
		border-radius: 50% 50% 0 0;
	}
}

.avatar-fallback--small {
	.avatar-fallback__head {
		top: 0.3rem;
		left: 0.5rem;
		width: 0.4rem;
		height: 0.4rem;
	}

	.avatar-fallback__body {
		top: 0.8rem;
		left: 0.3rem;
		width: 0.8rem;
		height: 0.3rem;
	}
}
</style>
