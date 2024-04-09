import escape from 'lodash/escape'

export const defaultParser = (message: string): string => escape(message)

export const defaultPostEscapeParser = (message: string): string =>
	message.replaceAll('\n', '</br>')

export const resizeTextarea = (textarea: HTMLTextAreaElement | null): void => {
	textarea?.setAttribute('style', 'height: auto')
	textarea?.setAttribute(
		'style',
		`height: ${textarea.scrollHeight.toString()}px`,
	)
}
