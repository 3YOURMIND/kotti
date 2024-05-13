import { z } from 'zod'
import { yocoIconSchema } from '@3yourmind/yoco'

export module KottiActionbar {
	export const menuItemSchema = z.object({
		active: z.boolean().default(false),
		disabled: z.boolean().default(false),
		icon: yocoIconSchema,
		to: z.unknown().nullable(),
		label: z.string(),
	})

	export const propsSchema = z.object({
		headerTitle: z.string(),
		menu: z.array(menuItemSchema),
		menuStyle: z.object({
			iconPosition: z.enum(['left', 'right']),
		}),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
