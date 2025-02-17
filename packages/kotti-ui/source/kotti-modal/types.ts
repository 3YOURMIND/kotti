import { z } from 'zod'

import { createLooseZodEnumSchema } from '../zod-utilities/enums'

export namespace KottiModal {
	export enum Size {
		EXTRA_LARGE = 'xl',
		LARGE = 'lg',
		MEDIUM = 'md',
		SMALL = 'sm',
	}

	export const propsSchema = z.object({
		isOpen: z.boolean().default(false),
		preventCloseOutside: z.boolean().default(false),
		size: createLooseZodEnumSchema(Size).default(Size.MEDIUM),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
