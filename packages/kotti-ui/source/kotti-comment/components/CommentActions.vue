<template>
	<div class="kt-comment__content__actions">
		<CommentActionsReply @click="handleReplyClick" />
		<CommentActionsOptions :options="options" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { Kotti } from '../../types'

import CommentActionsOptions from './CommentActionsOptions.vue'
import CommentActionsReply from './CommentActionsReply.vue'

export default defineComponent<{
	options: Kotti.Popover.Props['options']
	userData: Kotti.Comment.UserData
}>({
	name: 'CommentActions',
	props: {
		options: { type: Array, required: true },
		userData: { type: Object, required: true },
	},
	components: {
		CommentActionsOptions,
		CommentActionsReply,
	},
	setup(props, { emit }) {
		return {
			handleReplyClick: () => emit('replyClick', props.userData),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-comment__content__actions {
	display: flex;
	justify-content: space-between;
	margin: 0.2rem 0;
	font-size: 0.7rem;
	font-weight: 600;
	line-height: 1.2rem;
	color: var(--link-02);

	> * {
		&:hover {
			color: var(--link-03);
			cursor: pointer;
		}
	}

	.yoco {
		font-size: 0.9rem;
	}
}
</style>
