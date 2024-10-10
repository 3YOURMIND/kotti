import { z } from 'zod'

import { Yoco } from '@3yourmind/yoco'

import { createLooseZodEnumSchema } from '../zod-utilities/enums'

export module KottiHeading {
	export enum Type {
		ACTION = 'action',
		TOGGLE = 'toggle',
	}

	export const propsSchema = z.object({
		actionText: z.string().nullable().default(null),
		icon: createLooseZodEnumSchema(Yoco.Icon).nullable().default(null),
		text: z.string(),
		toggleCloseText: z.string().default('Close'),
		toggleStatus: z.boolean().default(false),
		toggleText: z.string().default('View'),
		type: createLooseZodEnumSchema(Type).nullable().default(null),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
