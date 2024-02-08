import { Ref, watch } from 'vue'

import { KottiComment } from './types'
import { resizeTextarea } from './utilities'

export const useResizeTextarea = (
	textareaRef: Ref<HTMLTextAreaElement | null>,
	value: Ref<KottiComment.TextArea.PropsInternal['value']>,
) => {
	watch([textareaRef, value], () => resizeTextarea(textareaRef.value), {
		immediate: true,
		flush: 'post',
	})
}
