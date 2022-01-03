import { yocoIconSchema } from '@3yourmind/yoco'
import { z } from 'zod'

export namespace KottiPopover {
	/**
	 * @see `@popperjs/core`
	 */
	export enum Placement {
		AUTO = 'auto',
		AUTO_END = 'auto-end',
		AUTO_START = 'auto-start',
		BOTTOM = 'bottom',
		BOTTOM_END = 'bottom-end',
		BOTTOM_START = 'bottom-start',
		LEFT = 'left',
		LEFT_END = 'left-end',
		LEFT_START = 'left-start',
		RIGHT = 'right',
		RIGHT_END = 'right-end',
		RIGHT_START = 'right-start',
		TOP = 'top',
		TOP_END = 'top-end',
		TOP_START = 'top-start',
	}

	export enum Size {
		AUTO = 'auto',
		SMALL = 'sm',
		MEDIUM = 'md',
		LARGE = 'lg',
		EXTRA_LARGE = 'xl',
	}

	const baseOptionSchema = z.object({
		dataTest: z.string().optional(),
		icon: yocoIconSchema.optional(),
		isActive: z.boolean().optional(),
		isSelected: z.boolean().optional(),
		label: z.string(),
	})

	// onClick is optional for disabled items
	export const optionSchema = z.union([
		baseOptionSchema.merge(
			z.object({
				isDisabled: z.literal(true),
				onClick: z.function(z.tuple([]), z.void()).optional(),
			}),
		),
		baseOptionSchema.merge(
			z.object({
				isDisabled: z.literal(false).optional(),
				onClick: z.function(z.tuple([]), z.void()),
			}),
		),
	])

	export const propsSchema = z.object({
		forceShowPopover: z.boolean().nullable().default(null),
		options: z.array(optionSchema).default(() => []),
		placement: z.nativeEnum(Placement).default(Placement.BOTTOM),
		size: z.nativeEnum(Size).default(Size.AUTO),
	})

	export type PropsInternal = z.output<typeof propsSchema>
	export type Props = z.input<typeof propsSchema>
}
