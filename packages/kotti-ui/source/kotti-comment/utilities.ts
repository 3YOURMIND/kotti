import escape from 'lodash/escape'

export const defaultParser = (message: string) => escape(message)
export const defaultPostEsapeParser = (message: string) => message
