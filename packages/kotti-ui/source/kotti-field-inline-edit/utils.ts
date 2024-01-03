import { FieldInlineEditElement } from './types'

export const resizeField = ({
	inputRef,
}: {
	inputRef: FieldInlineEditElement | null
}) => {
	inputRef?.setAttribute('style', 'height: auto')

	const scrollHeight = inputRef?.scrollHeight ?? null

	if (scrollHeight === null)
		throw new Error(
			`KtFieldInlinEdit: resizeTextArea: Undefined 'scrollHeight': ${scrollHeight}.`,
		)

	inputRef?.setAttribute('style', `height: ${scrollHeight.toString()}px`)
}
