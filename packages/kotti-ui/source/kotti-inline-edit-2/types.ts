import escape from 'lodash/escape'
import { z } from 'zod'

export const DEFAULT_POST_PARSER = (_: any): any => _
export namespace KottiInlineEdit2 {
	export const propsSchema = z.object({
		dangerouslyOverrideParser: z
			.function()
			.args(z.string())
			.returns(z.string())
			.default(escape),
		placeholder: z.string().nullable().default(null),
		isMultiLine: z.boolean().default(false),
		label: z.string().nullable().default(null),
		postEscapeParser: z
			.function()
			.args(z.string())
			.returns(z.string())
			.default(DEFAULT_POST_PARSER),
		value: z.union([z.string(), z.number()]),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>
	export type Translations = {
		placeholder: string
	}
}
