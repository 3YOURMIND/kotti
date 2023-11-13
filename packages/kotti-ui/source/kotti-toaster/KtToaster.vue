<template>
	<div class="vue-yodify">
		<div
			v-for="notification in queue"
			:key="notification.id"
			class="vue-yodify__notification"
		>
			<div :class="iconClass(notification.type)">
				<i class="yoco" v-text="iconText(notification.type)" />
			</div>
			<div class="vue-yodify__content" v-text="notification.text" />
			<div
				class="vue-yodify__close"
				@click="deleteNotificationById(notification.id)"
			>
				<i class="yoco" v-text="'close'" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { TimeConversion } from '@metatypes/units'
import {
	getCurrentInstance,
	defineComponent,
	onUnmounted,
	ref,
	onMounted,
	onBeforeMount,
} from '@vue/composition-api'

import { isBrowser } from '../utilities'

import { DEFAULT_YODIFY_NOTIFICATION_DURATION_IN_SECONDS } from './constants'
import { KottiToaster } from './types'
import { generateId, notId } from './utilities.js'

export default defineComponent({
	name: 'KtToaster',
	setup() {
		const root = getCurrentInstance()

		const yodifyBuffer =
			// @ts-expect-error see usage of `Vue.prototype.$yodifyBuffer = []` on root index file
			(root?.$yodifyBuffer as Array<KottiToaster.NotificationInternal>) ?? []

		const queue = ref<Array<KottiToaster.NotificationInternal>>([])

		const addNotification = ({
			id = generateId(),
			text,
			type,
			duration = DEFAULT_YODIFY_NOTIFICATION_DURATION_IN_SECONDS *
				TimeConversion.MILLISECONDS_PER_SECOND,
		}: KottiToaster.NotificationInternal) => {
			debugger
			queue.value.push({ id, text, type })

			if (isBrowser)
				window.setTimeout(() => deleteNotificationById(id), duration)
		}

		const deleteNotificationById = (
			id: NonNullable<KottiToaster.NotificationInternal['id']>,
		) => {
			queue.value = queue.value.filter((notification) =>
				notId(id)(notification?.id),
			)
		}

		onBeforeMount(() => {
			if (!root) throw new Error('Root is undefined')

			root.$on('vue-yodify', addNotification)
		})

		onMounted(() => {
			let notification
			while ((notification = yodifyBuffer.pop())) {
				addNotification(notification)
			}
		})

		onUnmounted(() => {
			if (root) root.$off('vue-yodify', addNotification)
		})

		return {
			addNotification,
			deleteNotificationById,
			iconClass: (type: KottiToaster.Type) =>
				`vue-yodify__icon vue-yodify__icon--${type}`,
			iconText: (type: KottiToaster.Type) => {
				switch (type) {
					case KottiToaster.Type.ERROR:
						return Yoco.Icon.CIRCLE_CROSS
					case KottiToaster.Type.WARNING:
						return Yoco.Icon.CIRCLE_ATTENTION
					case KottiToaster.Type.SUCCESS:
					default:
						return Yoco.Icon.CIRCLE_CHECK
				}
			},
			queue,
			yodifyBuffer,
		}
	},
})
</script>

<style lang="scss" scoped>
// reset some commonly overwritten styles
.vue-yodify,
.vue-yodify * {
	box-sizing: initial;
	line-height: initial;
}

.vue-yodify {
	position: fixed;
	top: 0;
	right: 0.8rem;
	z-index: 9999;

	&__notification {
		display: flex;
		justify-content: space-between;
		width: 448px;
		margin: 1.2rem 0;
		overflow: hidden;
		background-color: var(--white);
		border-radius: 0.2rem;
		box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.24);
	}

	&__icon,
	&__close {
		display: flex;
		flex: 0 0 2rem;
		align-items: center;
		justify-content: center;
		min-height: 2rem;
	}

	&__icon {
		.yoco {
			font-size: 1rem;
			color: var(--white);
		}

		&--info {
			background: var(--support-info);
		}

		&--error {
			background: var(--support-error);
		}
		&--success {
			background: var(--support-success);
		}

		&--warning {
			background: var(--support-warning);
		}
	}

	&__content {
		display: flex;
		flex: 1;
		align-items: center;
		height: 100%;
		min-height: 1.2rem;
		padding: 0.4rem;
	}

	&__close {
		.yoco {
			font-size: 1rem;
			color: #8a8a8a;
		}
		&:hover {
			cursor: pointer;
			background-color: rgba(0, 0, 0, 0.1);
		}
	}
}

// support for mobile device
@media (max-width: 460px) {
	.vue-yodify__notification {
		width: 96%;
		margin: 2%;
	}
	.vue-yodify {
		right: 0;
		width: 100%;
	}
}
</style>
