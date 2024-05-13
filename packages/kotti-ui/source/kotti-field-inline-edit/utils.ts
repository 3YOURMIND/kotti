import type { FieldInlineEditElement } from './types'

export const resizeField = ({
	inputRef,
}: {
	inputRef: FieldInlineEditElement | null
}): void => {
	inputRef?.setAttribute('style', 'height: auto')

	const scrollHeight = inputRef?.scrollHeight ?? null

	if (scrollHeight === null)
		throw new Error(`KtFieldInlinEdit: resizeTextArea: 'scrollHeight' is null.`)

	inputRef?.setAttribute('style', `height: ${scrollHeight.toString()}px`)
}
