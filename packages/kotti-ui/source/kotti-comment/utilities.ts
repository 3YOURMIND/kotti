import escape from 'lodash/escape'

export const defaultParser = (message: string) => escape(message)

export const defaultPostEscapeParser = (message: string) =>
	message.replace(/\n/g, '</br>')

export const resizeTextarea = (textarea: HTMLTextAreaElement | null) => {
	textarea?.setAttribute('style', 'height: auto')
	textarea?.setAttribute('style', `height: ${textarea.scrollHeight}px`)
}
