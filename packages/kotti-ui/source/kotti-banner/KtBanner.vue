<script lang="ts">
import { computed, defineComponent } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { KtButton } from '../kotti-button'
import { makeProps } from '../make-props'

import { KottiBanner } from './types'

export default defineComponent({
	name: 'KtBanner',
	components: {
		KtButton,
	},
	props: makeProps(KottiBanner.propsSchema),
	emits: ['action', 'close'],
	setup(props, { emit, slots }) {
		const styles = computed((): KottiBanner.Style => {
			switch (props.type) {
				case 'error':
					return {
						backgroundColor: 'var(--banner-error-bg)',
						darkColor: 'var(--banner-error-dark)',
						icon: Yoco.Icon.CIRCLE_CROSS,
						lightColor: 'var(--banner-error-light)',
					}

				case 'info':
					return {
						backgroundColor: 'var(--banner-info-bg)',
						darkColor: 'var(--banner-info-dark)',
						icon: Yoco.Icon.CIRCLE_I,
						lightColor: 'var(--banner-info-light)',
					}

				case 'success':
					return {
						backgroundColor: 'var(--banner-success-bg)',
						darkColor: 'var(--banner-success-dark)',
						icon: Yoco.Icon.CIRCLE_CHECK,
						lightColor: 'var(--banner-success-light)',
					}

				case 'warning':
					return {
						backgroundColor: 'var(--banner-warning-bg)',
						darkColor: 'var(--banner-warning-dark)',
						icon: Yoco.Icon.CIRCLE_ATTENTION,
						lightColor: 'var(--banner-warning-light)',
					}

				default:
					return props.type
			}
		})

		return {
			hasActionSlot: computed((): boolean => Boolean(slots.action)),
			hasFooter: computed((): boolean => Boolean(slots.footer)),
			hasHeader: computed(
				(): boolean => props.header !== null || Boolean(slots.header),
			),
			onAction: (event: MouseEvent) => {
				emit('action', event)
			},
			onClose: (event: MouseEvent) => {
				emit('close', event)
			},
			styles,
		}
	},
})
</script>

<template>
	<div class="kt-banner" :style="{ borderColor: styles.lightColor }">
		<div
			v-if="styles.icon !== null"
			class="kt-banner__icon"
			:style="{
				color: styles.darkColor,
				backgroundColor: styles.backgroundColor,
			}"
		>
			<i class="yoco" v-text="styles.icon" />
		</div>
		<div class="kt-banner__text" :class="{ 'ml-1': styles.icon === null }">
			<div v-if="hasHeader" class="kt-banner__header">
				<slot name="header">
					{{ header }}
				</slot>
			</div>
			<div>
				<slot name="text">
					{{ text }}
				</slot>
			</div>
			<div v-if="hasFooter">
				<slot name="footer" />
			</div>
		</div>
		<div v-if="hasActionSlot" class="kt-banner__action">
			<slot name="action" />
		</div>
		<div v-else-if="action" class="kt-banner__action">
			<KtButton :label="action" type="text" @click="onAction" />
		</div>
		<div v-if="isCloseable" class="kt-banner__close" @click="onClose">
			<i class="yoco">close</i>
		</div>
	</div>
</template>

<style>
:root {
	--banner-error-bg: var(--support-error-bg);
	--banner-error-light: var(--support-error-light);
	--banner-error-dark: var(--support-error-dark);
	--banner-info-bg: var(--support-info-bg);
	--banner-info-light: var(--support-info-light);
	--banner-info-dark: var(--support-info-dark);
	--banner-warning-bg: var(--support-warning-bg);
	--banner-warning-light: var(--support-warning-light);
	--banner-warning-dark: var(--support-warning-dark);
	--banner-success-bg: var(--support-success-bg);
	--banner-success-light: var(--support-success-light);
	--banner-success-dark: var(--support-success-dark);
}
</style>

<style lang="scss" scoped>
.kt-banner {
	display: flex;
	gap: var(--unit-2);
	padding: var(--unit-1);
	user-select: none;
	background-color: var(--ui-background);
	border: 1px solid transparent;
	border-radius: var(--unit-2);

	&__icon,
	&__close,
	&__action {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&__icon,
	&__close {
		width: var(--unit-7);
		height: var(--unit-7);

		.yoco {
			font-size: var(--unit-5);
		}
	}

	&__close,
	&__action {
		.yoco {
			color: var(--icon-02);
			pointer-events: none;
		}

		&:hover .yoco {
			color: var(--icon-01);
		}
	}

	&__action {
		align-self: flex-start;
		margin-top: -2px;
	}

	&__icon {
		border-radius: var(--border-radius);
	}

	&__header {
		font-weight: 700;
		user-select: text;
	}

	&__text {
		display: flex;
		flex: 1 0;
		flex-direction: column;
		gap: var(--unit-1);
		margin-top: 4px;
		line-height: var(--unit-5);
		user-select: text;
	}
}
</style>
