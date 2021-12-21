import { z } from 'zod'

export namespace KottiCard {
	export enum ImagePosition {
		BOTTOM = 'bottom',
		MIDDLE = 'middle',
		TOP = 'top',
	}
	export const imagePositionSchema = z.nativeEnum(ImagePosition)

	export const propsSchema = z.object({
		imgPosition: imagePositionSchema.default(ImagePosition.TOP),
		imgUrl: z.string().default(''),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>
}
