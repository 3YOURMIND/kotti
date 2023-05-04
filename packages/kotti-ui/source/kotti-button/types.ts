import { yocoIconSchema } from '@3yourmind/yoco'
import { z } from 'zod'

export namespace KottiButton {
	export enum Type {
		DANGER = 'danger',
		DEFAULT = 'default',
		PRIMARY = 'primary',
		SECONDARY = 'secondary',
		TEXT = 'text',
	}
	export const typeSchema = z.nativeEnum(Type)

	export enum Size {
		LARGE = 'large',
		MEDIUM = 'medium',
		SMALL = 'small',
	}
	export const sizeSchema = z.nativeEnum(Size)

	export enum IconPosition {
		LEFT = 'left',
		RIGHT = 'right',
	}
	export const iconPosition = z.nativeEnum(IconPosition)

	export enum ToggleStatus {
		ON = 'on',
		OFF = 'off',
	}

	export const toggleStatusSchema = z.nativeEnum(ToggleStatus)

	export const propsSchema = z.object({
		helpText: z.string().nullable().default(null),
		icon: yocoIconSchema.nullable().default(null),
		iconPosition: iconPosition.default(IconPosition.LEFT),
		isBlock: z.boolean().default(false),
		isLoading: z.boolean().default(false),
		isMultiline: z.boolean().default(false),
		isSubmit: z.boolean().default(false),
		label: z.string().nullable().default(null),
		size: sizeSchema.default(Size.MEDIUM),
		toggleStatus: toggleStatusSchema.nullable().default(null),
		type: typeSchema.default(Type.DEFAULT),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
