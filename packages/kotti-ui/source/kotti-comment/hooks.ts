import type { Ref } from 'vue'
import { watch } from 'vue'

import type { KottiComment } from './types'
import { resizeTextarea } from './utilities'

export const useResizeTextarea = (
	textareaRef: Ref<HTMLTextAreaElement | null>,
	modelValue: Ref<KottiComment.TextArea.PropsInternal['modelValue']>,
): void => {
	watch(
		[textareaRef, modelValue],
		() => {
			resizeTextarea(textareaRef.value)
		},
		{
			flush: 'post',
			immediate: true,
		},
	)
}
