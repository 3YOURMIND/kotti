import { z } from 'zod'

export namespace KottiLine {
	export enum Position {
		LEFT = 'left',
		CENTER = 'center',
		RIGHT = 'right',
	}

	export const propsSchema = z.object({
		isInteractive: z.boolean().default(false),
		position: z.nativeEnum(Position).default(Position.CENTER),
		text: z.string().nullable().default(null),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
