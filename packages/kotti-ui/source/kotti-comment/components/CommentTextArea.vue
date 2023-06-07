<template>
	<div class="kt-comment__text-area">
		<div
			ref="containerRef"
			class="kt-comment__text-area__container"
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
			<div class="kt-comment__text-area__actions">
				<template v-if="allowInternal && !isReply">
					<KtButton
						:data-test="`${dataTest}.toggle-internal-button`"
						:icon="Yoco.Icon.PERMISSION_LOCKED"
						:tabIndex="hasFocus ? tabIndex : -1"
						:toggleStatus="internalToggleStatus"
						type="text"
						@click="onToggleInternal"
					/>
					<div class="kt-comment__text-area__actions__divider" />
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
		<span
			v-if="hasFocus"
			class="kt-comment__text-area__footer"
			@mousedown="onCancel()"
			v-text="translations.cancelMessage"
		/>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import {
	computed,
	defineComponent,
	onMounted,
	onUnmounted,
	ref,
} from '@vue/composition-api'

import { KottiButton } from '../../kotti-button/types'
import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { makeProps } from '../../make-props'
import { useResizeTextarea } from '../hooks'
import { KottiComment } from '../types'
import { blurElement, isEventTarget, isInFocus } from '../utilities'

export default defineComponent<KottiComment.TextArea.PropsInternal>({
	name: 'CommentTextArea',
	props: makeProps(KottiComment.TextArea.schema),
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtComment')

		const containerRef = ref<HTMLDivElement | null>(null)
		const hasFocus = ref<boolean>(false)
		const textareaRef = ref<HTMLTextAreaElement | null>(null)

		useResizeTextarea(
			textareaRef,
			computed(() => props.value),
		)

		const blurTextarea = () => blurElement(containerRef.value)
		const focusTextarea = () => textareaRef.value?.focus()

		const onCancel = () => {
			emit('cancel')
			blurTextarea()
		}

		const onClick = (event: MouseEvent | KeyboardEvent) => {
			if (event.target === null) return

			const isClickOutside = !isEventTarget(containerRef.value, event.target)

			if (isClickOutside) onCancel()
			else focusTextarea()
		}

		const onFocusChange = (event: FocusEvent) => {
			if (event.target === null) return

			if (!isInFocus(containerRef.value)) onCancel()
		}

		onMounted(() => {
			if (props.autofocus) focusTextarea()

			window.addEventListener('click', onClick)
			window.addEventListener('focus', onFocusChange, true)
		})

		onUnmounted(() => {
			window.removeEventListener('click', onClick)
			window.removeEventListener('focus', onFocusChange)
		})

		return {
			containerRef,
			hasFocus,
			internalToggleStatus: computed(() =>
				props.isInternal
					? KottiButton.ToggleStatus.ON
					: KottiButton.ToggleStatus.OFF,
			),
			isEmpty: computed(() => props.value.trim() === ''),
			onCancel,
			onConfirm: () => {
				emit('confirm')
				blurTextarea()
			},
			onInput: (event: { target: HTMLTextAreaElement }) =>
				emit('input', event.target.value),
			onToggleInternal: () => emit('toggleInternal'),
			textareaRef,
			translations,
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-comment__text-area {
	width: 100%;

	&__actions {
		display: flex;
		column-gap: var(--unit-1);
		margin-bottom: var(--unit-1);

		&__divider {
			width: var(--unit-q);
			background: var(--ui-02);
		}
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
		color: var(--text-03);
	}
}
</style>
