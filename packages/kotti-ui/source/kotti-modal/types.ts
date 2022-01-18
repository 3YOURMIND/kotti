import { z } from 'zod'

export namespace KottiModal {
	export enum Size {
		EXTRA_LARGE = 'xl',
		LARGE = 'lg',
		MEDIUM = 'md',
		SMALL = 'sm',
	}

	export const propsSchema = z.object({
		preventCloseOutside: z.boolean().default(false),
		size: z.nativeEnum(Size).default(Size.MEDIUM),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
