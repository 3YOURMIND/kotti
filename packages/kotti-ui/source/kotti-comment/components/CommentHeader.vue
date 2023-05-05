<template>
	<div class="kt-comment__comment-header">
		<div class="kt-comment__comment-header__left-wrapper">
			<span class="kt-comment__comment-header__name" v-text="userName" />
			<span
				v-if="isInternalThread"
				class="kt-comment__comment-header__internal-thread"
			>
				<i class="yoco" v-text="Yoco.Icon.PERMISSION" />
				{{ translations.internalThreadLabel }}
			</span>
		</div>
		<div class="kt-comment__comment-header__right-wrapper">
			<span
				v-if="isModified"
				class="kt-comment__comment-header__modified"
				v-text="translations.editedLabel"
			/>
			<span
				class="kt-comment__comment-header__creation-date"
				v-text="createdTime"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { defineComponent } from '@vue/composition-api'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { makeProps } from '../../make-props'
import { KottiComment } from '../types'

export default defineComponent<KottiComment.Header.PropsInternal>({
	name: 'CommentHeader',
	props: makeProps(KottiComment.Header.schema),
	setup() {
		const translations = useTranslationNamespace('KtComment')

		return {
			translations,
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-comment__comment-header {
	display: flex;
	align-items: flex-start;
	justify-content: space-between;
	font-size: 14px;
	font-weight: 500;
	line-height: 20px;

	&__left-wrapper {
		display: flex;
		flex-wrap: wrap;
		column-gap: var(--unit-3);
		align-items: center;
	}

	&__right-wrapper {
		display: flex;
		flex-wrap: wrap-reverse;
		column-gap: var(--unit-4);
		align-items: center;
		justify-content: flex-end;
	}

	&__creation-date,
	&__modified {
		color: var(--text-03);
	}

	&__internal-thread {
		display: flex;
		gap: var(--unit-1);
		color: var(--text-02);

		.yoco {
			font-size: 0.9rem;
		}
	}

	&__name {
		color: var(--text-01);
	}
}
</style>
