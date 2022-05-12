import { z } from 'zod'

export namespace KottiCard {
	export enum ImagePosition {
		BOTTOM = 'bottom',
		MIDDLE = 'middle',
		TOP = 'top',
	}

	export const propsSchema = z.object({
		imgPosition: z.nativeEnum(ImagePosition).default(ImagePosition.TOP),
		imgUrl: z.string().nullable().default(null),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
