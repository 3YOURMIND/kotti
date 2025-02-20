import { z } from 'zod'

import { createLooseZodEnumSchema } from '../zod-utilities/enums'

export namespace KottiLine {
	export enum Position {
		CENTER = 'center',
		LEFT = 'left',
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
