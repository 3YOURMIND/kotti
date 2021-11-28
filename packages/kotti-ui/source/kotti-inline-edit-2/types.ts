import escape from 'lodash/escape'
import { z } from 'zod'

import { Kotti } from '../types'
export const DEFAULT_ESCAPE_PARSER = (
	messageWithSpecialCharacterAndMultiLines: string,
) => escape(messageWithSpecialCharacterAndMultiLines).replace(/\n/gm, '<br/>')

// TODO: after the MR for zod on KtFields, we want to use the schemas here
// to extract props like `size`
export namespace KottiInlineEdit2 {
	export const propsSchema = z.object({
		placeholder: z.string().nullable().default(null),
		isMultiLine: z.boolean().default(false),
		label: z.string().nullable().default(null),
		size: z.nativeEnum(Kotti.Field.Size).default(Kotti.Field.Size.MEDIUM),
		/**
		 * function to escape special characters, new lines and convert them
		 * to proper html
		 *
		 * @default DEFAULT_ESCAPE_PARSER
		 * first uses lodash/escape @see {@link https://lodash.com/docs/4.17.15#escape}
		 * then converts multi-lines into breaks
		 */
		stringToHtmlParser: z
			.function()
			.args(z.string())
			.returns(z.string())
			.default(DEFAULT_ESCAPE_PARSER),
		value: z.string().nullable().default(null),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>
	export type Translations = {
		placeholder: string
	}

	export namespace Events {
		export type UpdateEditableValue = KottiInlineEdit2.PropsInternal['value']
	}
}
