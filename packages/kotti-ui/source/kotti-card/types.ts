import { z } from 'zod'

import { createLooseZodEnumSchema } from '../zod-utilities/enums'

export namespace KottiCard {
	export enum ImagePosition {
		BOTTOM = 'bottom',
		MIDDLE = 'middle',
		TOP = 'top',
	}

	export const propsSchema = z.object({
		component: z.string().default('div'),
		imgPosition: createLooseZodEnumSchema(ImagePosition).default(
			ImagePosition.TOP,
		),
		imgUrl: z.string().nullable().default(null),
		isImgLoading: z.boolean().default(false),
		isTextLoading: z.boolean().default(false),
		primaryActionDataTest: z.string().optional(),
		primaryActionLabel: z.string().nullable().default(null),
		secondaryActionDataTest: z.string().optional(),
		secondaryActionLabel: z.string().nullable().default(null),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
