import { yocoIconSchema } from '@3yourmind/yoco'
import { Instance as TippyInstance } from 'tippy.js'
import { z } from 'zod'

const baseOptionSchema = z.object({
	dataTest: z.string().optional(),
	icon: yocoIconSchema.optional(),
	isClickable: z.boolean().default(false),
	isDisabled: z.boolean().default(false),
	isSelected: z.boolean().optional(),
	label: z.string(),
	onClick: z.function(z.tuple([]), z.void()).optional(),
})

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

	export enum Trigger {
		/**
		 * Trigger By:
		 * - mouse click
		 * - tab + enter
		 *
		 * Untrigger By:
		 * - second mouse-click
		 * - second enter
		 */
		CLICK = 'click',
		/**
		 * Trigger By:
		 * - hover
		 * - tab
		 *
		 * Untrigger By:
		 * - hover away
		 * - clickaway
		 * - tab away
		 */
		HOVER = 'hover',
		MANUAL = 'manual',
	}

	export enum ClickBehavior {
		/**
		 * hide popper when any element other than the trigger is clicked
		 */
		HIDE_ON_CLICK_AWAY = 'hide-on-click-away',
		/**
		 * hide the tippy only if trigger is clicked
		 */
		HIDE_ON_TOGGLE = 'hide-on-toggle',
		/**
		 * never hide the popper on clicks outside trigger/tippy
		 */
		IGNORE = 'ignore',
	}

	export type Ref = {
		open: TippyInstance['show']
		close: TippyInstance['hide']
	}

	export const optionSchema = baseOptionSchema.pick({
		dataTest: true,
		icon: true,
		isDisabled: true,
		isSelected: true,
		label: true,
		onClick: true,
	})

	export const propsSchema = z.object({
		options: z.array(optionSchema).default(() => []),
		placement: z.nativeEnum(Placement).default(Placement.AUTO),
		size: z.nativeEnum(Size).default(Size.AUTO),
		trigger: z.nativeEnum(Trigger).default(Trigger.CLICK),
		/** what happens if the user clicks outside of the tippy/trigger element */
		clickBehavior: z.nativeEnum(ClickBehavior).nullable().default(null),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}

export namespace IconTextItem {
	export const propsSchema = baseOptionSchema.pick({
		dataTest: true,
		icon: true,
		isClickable: true,
		isDisabled: true,
		isSelected: true,
		label: true,
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
