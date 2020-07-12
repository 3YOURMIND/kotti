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
				@click="deleteNotification(notification.id)"
			>
				<i class="yoco" v-text="'close'" />
			</div>
		</div>
	</div>
</template>

<script>
import { TimeConversion } from '@metatypes/units'

import { generateId, notId } from './utilities.js'

const DEFAULT_DURATION_IN_SECONDS = 3

export default {
	name: 'KtToaster',
	data() {
		return { queue: [] }
	},
	created() {
		let notification
		while ((notification = this.$yodifyBuffer.pop()))
			this.addNotification(notification)

		this.$root.$on('vue-yodify', this.addNotification)
	},
	beforeDestroy() {
		this.$root.$off('vue-yodify', this.addNotification)
	},
	methods: {
		addNotification({
			id = generateId(),
			text,
			type,
			duration = DEFAULT_DURATION_IN_SECONDS *
				TimeConversion.MILLISECONDS_PER_SECOND,
		}) {
			this.queue.push({ id, text, type })

			if (typeof window !== 'undefined' && window.document)
				window.setTimeout(() => this.deleteNotification(id), duration)
		},
		deleteNotification(id) {
			this.queue = this.queue.filter(notId({ id }))
		},
		iconClass(notificationStatus) {
			return `vue-yodify__icon vue-yodify__icon--${notificationStatus}`
		},
		iconText(type) {
			if (type === 'error') return 'circle_cross'
			if (type === 'warning') return 'circle_attention'
			return 'circle_check'
		},
	},
}
</script>

<style lang="scss" scoped>
.vue-yodify {
	position: fixed;
	top: 0;
	right: 0.8rem;
	z-index: 9999;
}

.vue-yodify__notification {
	display: flex;
	justify-content: space-between;
	width: 448px;
	margin: 1.2rem 0;
	overflow: hidden;
	background-color: white;
	border-radius: 0.2rem;
	box-shadow: 0 0.1rem 0.4rem rgba(0, 0, 0, 0.24);
}

.vue-yodify__icon,
.vue-yodify__close {
	display: flex;
	flex: 0 0 2rem;
	align-items: center;
	justify-content: center;
	min-height: 2rem;
}
.vue-yodify__icon {
	&--success {
		background: #64ad13;
	}
	&--error {
		background: #d91919;
	}
	&--warning {
		background: #ff7800;
	}
	.yoco {
		font-size: 1rem;
		color: #ffffff;
	}
}
.vue-yodify__content {
	display: flex;
	flex: 1;
	align-items: center;
	height: 100%;
	min-height: 1.2rem;
	padding: 0.4rem;
}
.vue-yodify__close {
	.yoco {
		font-size: 1rem;
		color: #8a8a8a;
	}
	&:hover {
		cursor: pointer;
		background-color: rgba(0, 0, 0, 0.1);
	}
}

// reset some commonly overwritten styles
.vue-yodify,
.vue-yodify * {
	box-sizing: initial;
	line-height: initial;
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
