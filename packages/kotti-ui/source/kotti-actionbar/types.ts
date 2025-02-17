import { z } from 'zod'

import { yocoIconSchema } from '@3yourmind/yoco'

export namespace KottiActionbar {
	export const menuItemSchema = z.object({
		active: z.boolean().default(false),
		disabled: z.boolean().default(false),
		icon: yocoIconSchema,
		label: z.string(),
		to: z.unknown().nullable(),
	})
	export type MenuItem = z.output<typeof menuItemSchema>

	export const propsSchema = z.object({
		headerTitle: z.string().nullable().default(null),
		menu: z.array(menuItemSchema).default(() => []),
		menuStyle: z
			.object({
				iconPosition: z.enum(['left', 'right']),
			})
			.default({
				iconPosition: 'left',
			}),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
