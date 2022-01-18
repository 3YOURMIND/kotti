import { z } from 'zod'

export namespace KottiAvatar {
	export enum Size {
		LARGE = 'lg',
		MEDIUM = 'md',
		SMALL = 'sm',
	}

	export const propsSchema = z.object({
		isHoverable: z.boolean().default(false),
		name: z.string().nullable().default(null),
		size: z.nativeEnum(Size).default(Size.MEDIUM),
		src: z.string().nullable().default(null),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
