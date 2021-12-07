// import { yocoIconSchema } from '@3yourmind/yoco'
import escape from 'lodash/escape'
import { z } from 'zod'
const DEFAULT_POST_PARSER = (_: any): any => _
export namespace KottiInlineEdit2 {
	export const propsSchema = z.object({
		invalidMessage: z.string().default('Click to edit'),
		isMultiLine: z.boolean().default(false),
		label: z.string().nullable().default(null),
		placeholder: z.string().nullable().default(null),
		value: z.string(),
		dangerouslyOverrideParser: z
			.function()
			.args(z.string())
			.returns(z.string())
			.default(escape),
		postEscapeParser: z.function().default(DEFAULT_POST_PARSER),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>
}
