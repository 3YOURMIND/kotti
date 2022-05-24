<template>
	<div class="kt-comment__actions__reply" @click="$emit('click')">
		<i class="yoco" v-text="'comment'" />
		<span v-text="replyButtonText" />
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'

export default defineComponent({
	name: 'CommentAcionsReply',
	props: {},
	setup() {
		const translations = useTranslationNamespace('KtComment')

		return {
			replyButtonText: computed(() => translations.value.replyButton),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-comment__actions__reply {
	display: flex;
	flex: 0 0 auto;
	align-items: center;
	padding: 0 var(--unit-01);

	> *:not(:last-child) {
		margin-right: var(--unit-01);
	}
}
</style>
