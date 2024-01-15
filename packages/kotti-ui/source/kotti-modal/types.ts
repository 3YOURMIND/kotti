import { z } from 'zod'

export module KottiModal {
	export enum Size {
		EXTRA_LARGE = 'xl',
		LARGE = 'lg',
		MEDIUM = 'md',
		SMALL = 'sm',
	}

	export const propsSchema = z.object({
		isOpen: z.boolean().default(false),
		preventCloseOutside: z.boolean().default(false),
		size: z.nativeEnum(Size).default(Size.MEDIUM),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
