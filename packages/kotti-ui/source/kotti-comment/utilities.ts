import escape from 'lodash/escape'

import { isInFocus } from '../utilities'

export const blurElement = (element: HTMLElement | null) => {
	if (document.activeElement instanceof HTMLElement && isInFocus(element))
		document.activeElement.blur()
}

export const defaultParser = (message: string) => escape(message)

export const defaultPostEscapeParser = (message: string) =>
	message.replace(/\n/g, '</br>')

export const resizeTextarea = (textarea: HTMLTextAreaElement | null) => {
	textarea?.setAttribute('style', 'height: auto')
	textarea?.setAttribute('style', `height: ${textarea.scrollHeight}px`)
}
