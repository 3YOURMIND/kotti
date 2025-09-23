import { z } from 'zod'

export namespace KottiTag {
	export const propsSchema = z.object({
		colorStyle: z
			.enum([
				'blue-filled',
				'blue-light',
				'gray-filled',
				'gray-light',
				'green-filled',
				'green-light',
				'mint-filled',
				'mint-light',
				'orange-filled',
				'orange-light',
				'purple-filled',
				'purple-light',
				'red-filled',
				'red-light',
				'slate-filled',
				'slate-light',
				'violet-filled',
				'violet-light',
				'yellow-filled',
				'yellow-light',
			])
			.default('gray-light'),
		hideActions: z.boolean().optional().default(false),
		isDisabled: z.boolean().default(false),
		label: z.string().optional(),
		text: z.string().optional(),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
