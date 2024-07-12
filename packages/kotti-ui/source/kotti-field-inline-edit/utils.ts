import { nextTick } from 'vue'
import type { FieldInlineEditElement } from './types'

export const resizeField = async ({
	inputRef,
}: {
	inputRef: FieldInlineEditElement | null
}): Promise<void> => {
	inputRef?.setAttribute('style', 'height: auto')

	// ensure that DOM has updated properly before scrollHeight is retrieved
	await nextTick()

	const scrollHeight = inputRef?.scrollHeight ?? null

	if (scrollHeight === null)
		throw new Error(`KtFieldInlinEdit: resizeTextArea: 'scrollHeight' is null.`)

	inputRef?.setAttribute('style', `height: ${scrollHeight.toString()}px`)
}
