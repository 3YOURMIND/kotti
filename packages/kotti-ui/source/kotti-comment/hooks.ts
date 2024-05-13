import type { Ref } from 'vue'
import { watch } from 'vue'

import type { KottiComment } from './types'
import { resizeTextarea } from './utilities'

export const useResizeTextarea = (
	textareaRef: Ref<HTMLTextAreaElement | null>,
	value: Ref<KottiComment.TextArea.PropsInternal['value']>,
): void => {
	watch(
		[textareaRef, value],
		() => {
			resizeTextarea(textareaRef.value)
		},
		{
			immediate: true,
			flush: 'post',
		},
	)
}
