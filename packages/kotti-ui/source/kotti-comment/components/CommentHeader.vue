<template>
	<div class="kt-comment__header">
		<div class="kt-comment__header__left-wrapper">
			<span class="kt-comment__header__user-name" v-text="user.name" />
			<span v-if="isInternal && !isReply" class="kt-comment__header__internal">
				<i class="yoco" v-text="Yoco.Icon.PERMISSION" />
				{{ translations.internalLabel }}
			</span>
		</div>
		<div class="kt-comment__header__right-wrapper">
			<span
				v-if="isModified"
				class="kt-comment__header__modified"
				v-text="translations.editedLabel"
			/>
			<span class="kt-comment__header__created-at" v-text="createdAt" />
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
.kt-comment__header {
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

	&__created-at,
	&__modified {
		color: var(--text-03);
	}

	&__internal {
		display: flex;
		gap: var(--unit-1);
		color: var(--text-02);

		.yoco {
			font-size: 0.9rem;
		}
	}

	&__user-name {
		color: var(--text-01);
	}
}
</style>
