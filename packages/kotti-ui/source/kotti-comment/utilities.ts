import escape from 'lodash/escape'
import identity from 'lodash/identity'

export const defaultParser = (message: string) => escape(message)
export const defaultPostEscapeParser = (message: string) => message
