import { z } from 'zod'

import { createLooseZodEnumSchema } from '../zod-utilities/enums'

export module KottiLine {
	export enum Position {
		LEFT = 'left',
		CENTER = 'center',
		RIGHT = 'right',
	}

	export const propsSchema = z.object({
		isInteractive: z.boolean().default(false),
		position: createLooseZodEnumSchema(Position).default(Position.CENTER),
		text: z.string().nullable().default(null),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
