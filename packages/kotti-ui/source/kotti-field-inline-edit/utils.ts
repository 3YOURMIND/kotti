import { CompnentRef, FieldInlineEditElement } from './types'



export const isInFocus = (component: HTMLElement | null) =>
	document.activeElement instanceof HTMLElement &&
	(document.activeElement === component ||
		component?.contains(document.activeElement))

export const blurField = (fieldRef: CompnentRef) => {
	if (
		document.activeElement instanceof HTMLElement &&
		isInFocus(fieldRef?.$el ?? null)
	)
		document.activeElement.blur()
}

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
