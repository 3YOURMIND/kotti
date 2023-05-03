<template>
	<div class="kt-comment__content__actions">
		<div class="kt-comment__content__actions__reply" @click="handleReplyClick">
			<i class="yoco" v-text="'comment'" />
			<span v-text="replyButtonText" />
		</div>
		<KtPopover
			v-if="options.length > 0"
			class="kt-comment__actions__more-options"
			:options="options"
			placement="bottom"
			trigger="click"
		>
			<i class="yoco" v-text="'dots'" />
		</KtPopover>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { Kotti } from '../../types'

export default defineComponent<{
	options: Kotti.Popover.Props['options']
	userData: Kotti.Comment.UserData
}>({
	name: 'CommentActions',
	props: {
		options: { type: Array, required: true },
		userData: { type: Object, required: true },
	},
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtComment')

		return {
			handleReplyClick: () => emit('replyClick', props.userData),
			replyButtonText: computed(() => translations.value.replyButton),
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

	&__reply {
		display: flex;
		flex: 0 0 auto;
		align-items: center;
		padding: 0 var(--unit-01);

		> *:not(:last-child) {
			margin-right: var(--unit-01);
		}
	}

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
