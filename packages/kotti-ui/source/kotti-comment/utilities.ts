import escape from 'lodash/escape'

export const blurElement = (element: HTMLElement | null) => {
	if (document.activeElement instanceof HTMLElement && isInFocus(element))
		document.activeElement.blur()
}

export const defaultParser = (message: string) => escape(message)

export const defaultPostEscapeParser = (message: string) =>
	message.replace(/\n/g, '</br>')

/**
 * Checks whether `element` or any of its children is in focus
 */
export const isInFocus = (element: HTMLElement | null): boolean =>
	document.activeElement instanceof HTMLElement &&
	(document.activeElement === element ||
		(element?.contains(document.activeElement) ?? false))

export const resizeTextarea = (textarea: HTMLTextAreaElement | null) => {
	textarea?.setAttribute('style', 'height: auto')
	textarea?.setAttribute('style', `height: ${textarea.scrollHeight}px`)
}
