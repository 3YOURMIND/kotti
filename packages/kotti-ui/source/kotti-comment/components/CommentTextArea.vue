<template>
	<div class="kt-comment-text-area">
		<div
			ref="containerRef"
			class="kt-comment-text-area__container"
			:data-test="`${dataTest}.input-container`"
			@focusin="hasFocus = true"
			@focusout="hasFocus = false"
			@keydown.esc.stop.prevent="onCancel"
		>
			<textarea
				ref="textareaRef"
				class="form-input"
				:placeholder="placeholder"
				rows="1"
				:tabindex="tabIndex"
				:value="value"
				@input="onInput"
			/>
			<div class="kt-comment-text-area__actions">
				<template v-if="allowInternal && !isReply">
					<KtButton
						:data-test="`${dataTest}.toggle-internal-button`"
						:tabIndex="hasFocus ? tabIndex : -1"
						v-bind="toggleInternalButtonProps"
						type="text"
						@click="onToggleInternal"
					/>
					<div class="kt-comment-text-area__actions-divider" />
				</template>
				<KtButton
					:data-test="`${dataTest}.confirm-button`"
					:disabled="isEmpty"
					:icon="Yoco.Icon.SEND"
					:tabIndex="hasFocus ? tabIndex : -1"
					type="text"
					@click.stop.prevent="onConfirm"
				/>
			</div>
		</div>
		<div v-if="showCancelMessage" class="kt-comment-text-area__footer">
			<span v-text="translations.cancelMessage" />
			<!-- eslint-disable-next-line vue/no-useless-mustaches -->
			{{ ' ' }}
			<a
				:tabIndex="cancelMessageTabindex"
				@click.stop.prevent="onCancel"
				@keydown.enter.stop.prevent="onCancel"
				@keydown.esc.stop.prevent="onCancel"
				@keydown.space.stop.prevent="onCancel"
				v-text="translations.clickToCancelLabel"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import isNil from 'lodash/isNil.js'
import { computed, defineComponent, onMounted, onUnmounted, ref } from 'vue'

import { KottiButton } from '../../kotti-button/types'
import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { makeProps } from '../../make-props'
import { blurElement, isOrContainsEventTarget } from '../../utilities'
import { useResizeTextarea } from '../hooks'
import { KottiComment } from '../types'

export default defineComponent({
	name: 'CommentTextArea',
	props: makeProps(KottiComment.TextArea.schema),
	emits: ['cancel', 'confirm', 'input', 'toggleInternal'],
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtComment')

		const containerRef = ref<HTMLDivElement | null>(null)
		const hasFocus = ref(false)
		const showCancelMessage = ref(false)
		const textareaRef = ref<HTMLTextAreaElement | null>(null)

		useResizeTextarea(
			textareaRef,
			computed(() => props.value),
		)

		const blurTextarea = () => {
			blurElement(containerRef.value)
		}
		const focusTextarea = () => {
			textareaRef.value?.focus()
			showCancelMessage.value = true
		}

		const onCancel = () => {
			emit('cancel')
			blurTextarea()
			showCancelMessage.value = false
		}

		const onClick = (event: MouseEvent | KeyboardEvent) => {
			if (event.target === null) return

			const isClickInside = isOrContainsEventTarget(
				containerRef.value,
				event.target,
			)

			if (isClickInside) focusTextarea()
		}

		onMounted(() => {
			if (props.autofocus) focusTextarea()
			window.addEventListener('click', onClick)
		})

		onUnmounted(() => {
			window.removeEventListener('click', onClick)
		})

		return {
			cancelMessageTabindex: computed(() =>
				isNil(props.tabIndex) ? 0 : props.tabIndex,
			),
			containerRef,
			hasFocus,
			isEmpty: computed(() => props.value.trim() === ''),
			onCancel,
			onConfirm: () => {
				emit('confirm')
				blurTextarea()
			},
			onInput: (event: Event) => {
				emit('input', (event.target as HTMLTextAreaElement).value)
			},
			onToggleInternal: () => {
				emit('toggleInternal')
			},
			showCancelMessage,
			textareaRef,
			toggleInternalButtonProps: computed(
				(): Pick<
					KottiButton.PropsInternal,
					'helpText' | 'icon' | 'toggleStatus'
				> =>
					props.isInternal
						? {
								helpText: translations.value.lockedHelpText,
								icon: Yoco.Icon.PERMISSION_LOCKED,
								toggleStatus: KottiButton.ToggleStatus.ON,
							}
						: {
								helpText: translations.value.unlockedHelpText,
								icon: Yoco.Icon.PERMISSION_UNLOCKED,
								toggleStatus: KottiButton.ToggleStatus.OFF,
							},
			),
			translations,
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-comment-text-area {
	width: 100%;

	&__actions {
		display: flex;
		column-gap: var(--unit-1);
		margin-bottom: var(--unit-1);
	}

	&__actions-divider {
		width: var(--unit-q);
		background: var(--ui-02);
	}

	&__container {
		display: flex;
		flex-direction: column;
		row-gap: var(--unit-4);
		align-items: flex-end;
		padding: var(--unit-3) var(--unit-4) 0 var(--unit-4);
		background: var(--ui-background);
		border: 1px solid var(--ui-02);
		border-radius: var(--field-border-radius);

		&:focus-within {
			border-color: var(--interactive-05);
			box-shadow: 0 0 0 1px var(--interactive-05);
		}

		textarea {
			padding: 0;
			resize: none;
			border: none;
		}
	}

	&__footer {
		font-size: 12px;
		line-height: 20px;

		span {
			color: var(--text-03);
		}

		a {
			cursor: pointer;
		}
	}
}
</style>
