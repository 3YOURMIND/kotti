<template>
	<transition mode="out-in" name="drawer">
		<div class="drawer-mask" @click.self="onOutsideDrawerClick">
			<div :class="drawerClass" :style="drawerWidth">
				<div class="drawer-header">
					<slot name="drawer-header" />
				</div>
				<div class="drawer-body">
					<slot slot name="drawer-body" />
				</div>
				<div class="drawer-footer">
					<slot name="drawer-footer" />
				</div>
				<div class="drawer-handle" @click="onDrawerHandleClick">
					<i v-if="isExpanded" class="yoco"> chevron_right </i>
					<i v-else class="yoco"> chevron_left </i>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	name: 'KtDrawer',
	props: {
		closeOutside: {
			type: Boolean,
			default: true,
		},
		wide: {
			type: Boolean,
			default: false,
		},
		defaultWidth: {
			type: String,
			default: null,
		},
		expandWidth: {
			type: String,
			default: null,
		},
	},
	data() {
		return {
			isExpanded: false,
		}
	},
	computed: {
		drawerClass() {
			return {
				'drawer-container': true,
				'drawer-expand': this.isExpanded,
				'drawer-wide': this.wide,
			}
		},
		drawerWidth() {
			if (this.defaultWidth && this.expandWidth)
				return {
					width: this.isExpanded ? this.expandWidth : this.defaultWidth,
				}

			return {}
		},
	},
	methods: {
		onDrawerHandleClick() {
			this.isExpanded = !this.isExpanded
		},
		onOutsideDrawerClick() {
			if (this.closeOutside) {
				this.$emit('close')
			}
		},
	},
}
</script>

<style lang="scss">
@import '../kotti-style/_variables.scss';

// Drawer with Vue Transition
$default-drawer-width: 18.8rem;
$wide-drawer-width: 26.8rem;

.drawer-mask {
	position: fixed;
	top: 0;
	left: 0;
	z-index: $zindex-4;
	display: flex;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	transition: opacity 0.5s ease;
}

.drawer-handle {
	position: absolute;
	top: 50%;
	left: var(--unit-1);
	display: block;
	width: 1.5rem;
	height: 1.5rem;
	margin-top: -0.725rem;
	line-height: 1.5rem;
	color: var(--icon-02);
	cursor: pointer;

	&:hover {
		color: var(--interactive-03);
	}
}

.drawer-container {
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	flex-direction: column;
	width: $default-drawer-width;
	height: 100%;
	padding: var(--unit-6);
	padding-left: var(--unit-8);
	overflow-y: auto;
	background-color: var(--ui-background);
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;

	&.drawer-expand {
		width: 50%;
	}
}

.drawer-container.drawer-wide {
	width: $wide-drawer-width;

	&.drawer-expand {
		width: 75%;
	}
}

.drawer-header {
	flex: 0 0 auto;
}

.drawer-body {
	flex: 1 1 auto;
	padding: 0 0.8rem;
	margin: 0 -0.8rem 0.8rem -0.8rem;
	overflow-y: auto;
}

.drawer-footer {
	flex: 0 0 auto;
	align-self: flex-end;
	width: 100%;
}

.drawer-enter {
	opacity: 0;
	transition: opacity 0.5s;
}

.drawer-leave-active {
	opacity: 0;
}

.drawer-enter .drawer-container,
.drawer-leave-active .drawer-container {
	transform: translate(20em, 0);
}

@media (max-width: $size-sm) {
	.drawer-container,
	.drawer-container.drawer-wide {
		top: auto;
		bottom: 0;
		width: 100%;
		height: 80%;
		padding: var(--unit-4);
		padding-top: var(--unit-8);

		&.drawer-expand {
			width: 100%;
			height: 100%;
		}
	}

	.drawer-handle {
		top: 0;
		left: 50%;
		margin-top: 0.2rem;
		margin-left: -0.75rem;
		transform: rotate(90deg);
	}

	.drawer-enter .drawer-container,
	.drawer-leave-active .drawer-container {
		transform: translate(0, 20rem);
	}
}
</style>
