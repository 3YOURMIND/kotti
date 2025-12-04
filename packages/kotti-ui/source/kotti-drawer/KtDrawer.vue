<template>
	<transition mode="out-in" name="kt-drawer">
		<!-- eslint-disable-next-line vue/require-toggle-inside-transition -->
		<div class="kt-drawer__mask" @click.self="onOutsideDrawerClick">
			<div :class="drawerClass" :style="drawerWidth">
				<div class="kt-drawer__header">
					<slot name="drawer-header" />
				</div>
				<div class="kt-drawer__body">
					<slot name="drawer-body" />
				</div>
				<div class="kt-drawer__footer">
					<slot name="drawer-footer" />
				</div>
				<div class="kt-drawer__handle" @click="onDrawerHandleClick">
					<i v-if="isExpanded" class="yoco" v-text="Yoco.Icon.CHEVRON_RIGHT" />
					<i v-else class="yoco" v-text="Yoco.Icon.CHEVRON_LEFT" />
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { makeProps } from '../make-props'

import { KottiDrawer } from './types'

export default defineComponent({
	name: 'KtDrawer',
	props: makeProps(KottiDrawer.propsSchema),
	emits: ['close'],
	setup(props, { emit }) {
		const isExpanded = ref(false)

		return {
			drawerClass: computed(() => ({
				'kt-drawer__container': true,
				'kt-drawer__container--is-expanded': isExpanded.value,
				'kt-drawer__container--is-wide': props.isWide,
			})),
			drawerWidth: computed(() => {
				return props.defaultWidth === null || props.expandWidth === null
					? {}
					: { width: isExpanded.value ? props.expandWidth : props.defaultWidth }
			}),
			isExpanded,
			onDrawerHandleClick: () => {
				isExpanded.value = !isExpanded.value
			},
			onOutsideDrawerClick: () => {
				if (!props.disallowCloseOutside) {
					emit('close')
				}
			},
			Yoco,
		}
	},
})
</script>

<style lang="scss">
:root {
	--kt-drawer-default-width: 18.8rem;
	--kt-drawer-wide-width: 26.8rem;
}
</style>

<style lang="scss" scoped>
@import '../kotti-style/_variables';

.kt-drawer {
	&__mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: $zindex-4;
		display: flex;
		width: 100%;
		height: 100%;
		background-color: rgb(0 0 0 / 50%);
		transition: opacity 0.5s ease;
	}

	&__container {
		position: absolute;
		top: 0;
		right: 0;
		display: flex;
		flex-direction: column;
		width: var(--kt-drawer-default-width);
		height: 100%;
		padding: var(--unit-6);
		padding-left: var(--unit-8);
		overflow-y: auto;
		background-color: var(--ui-background);
		box-shadow: 0 2px 8px rgb(0 0 0 / 33%);
		transition: all 0.3s ease;

		&--is-expanded {
			width: 50%;
		}

		&--is-wide {
			width: var(--kt-drawer-wide-width);

			&.kt-drawer__container--is-expanded {
				width: 75%;
			}
		}
	}

	&__handle {
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

	&__header {
		flex: 0 0 auto;
	}

	&__body {
		flex: 1 1 auto;
		padding: 0 0.8rem;
		margin: 0 -0.8rem 0.8rem -0.8rem; /* stylelint-disable-line */
		overflow-y: auto;
	}

	&__footer {
		flex: 0 0 auto;
		align-self: flex-end;
		width: 100%;
	}

	/* Vue Transition classes */

	&-enter {
		opacity: 0;
		transition: opacity 0.5s;
	}

	&-leave-active {
		opacity: 0;
	}

	&-enter .kt-drawer__container,
	&-leave-active .kt-drawer__container {
		transform: translate(20em, 0);
	}
}

@media (width < $size-sm) {
	.kt-drawer {
		&__container,
		&__container--is-wide {
			top: auto;
			bottom: 0;
			width: 100%;
			height: 80%;
			padding: var(--unit-4);
			padding-top: var(--unit-8);

			&.kt-drawer__container--is-expanded {
				width: 100%;
				height: 100%;
			}
		}

		&__handle {
			top: 0;
			left: 50%;
			margin-top: 0.2rem;
			margin-left: -0.75rem;
			transform: rotate(90deg);
		}

		&-enter .kt-drawer__container,
		&-leave-active .kt-drawer__container {
			transform: translate(0, 20rem);
		}
	}
}
</style>
