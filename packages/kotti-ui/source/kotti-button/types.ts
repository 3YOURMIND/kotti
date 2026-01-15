import { z } from 'zod'

import { yocoIconSchema } from '@3yourmind/yoco'

import { createLooseZodEnumSchema } from '../zod-utilities/enums'

export namespace Shared {
	export enum IconPosition {
		LEFT = 'left',
		RIGHT = 'right',
	}
	export const iconPositionSchema = createLooseZodEnumSchema(IconPosition)

	export enum Size {
		LARGE = 'large',
		MEDIUM = 'medium',
		SMALL = 'small',
	}
	export const sizeSchema = createLooseZodEnumSchema(Size)

	export const propsSchema = z.object({
		icon: yocoIconSchema.nullable().default(null),
		iconPosition: iconPositionSchema.default(IconPosition.LEFT),
		isLoading: z.boolean().default(false),
		isSubmit: z.boolean().default(false),
		size: sizeSchema.default(Size.MEDIUM),
	})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}

export namespace KottiButton {
	export import IconPosition = Shared.IconPosition
	export import iconPositionSchema = Shared.iconPositionSchema

	export import Size = Shared.Size
	export import sizeSchema = Shared.sizeSchema

	export enum ToggleStatus {
		OFF = 'off',
		ON = 'on',
	}
	export const toggleStatusSchema = createLooseZodEnumSchema(ToggleStatus)

	export enum Type {
		DANGER = 'danger',
		DEFAULT = 'default',
		PRIMARY = 'primary',
		SECONDARY = 'secondary',
		TEXT = 'text',
	}
	export const typeSchema = createLooseZodEnumSchema(Type)

	export const propsSchema = Shared.propsSchema.extend({
		helpText: z.string().nullable().default(null),
		isBlock: z.boolean().default(false),
		isMultiline: z.boolean().default(false),
		label: z.string().nullable().default(null),
		toggleStatus: toggleStatusSchema.nullable().default(null),
		type: typeSchema.default(Type.DEFAULT),
	})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}

export namespace KottiSplitButton {
	export import IconPosition = Shared.IconPosition
	export import iconPositionSchema = Shared.iconPositionSchema

	export import Size = Shared.Size
	export import sizeSchema = Shared.sizeSchema

	export enum Type {
		DEFAULT = 'default',
		PRIMARY = 'primary',
	}
	export const typeSchema = createLooseZodEnumSchema(Type)

	export const actionSchema = z.object({
		dataTest: z.string().optional(),
		icon: yocoIconSchema.nullable().default(null),
		isDisabled: z.boolean().default(false),
		label: z.string(),
		onClick: z.function(z.tuple([]), z.void()),
	})
	export type Action = z.output<typeof actionSchema>

	export const propsSchema = Shared.propsSchema.extend({
		actions: z.array(actionSchema).default(() => []),
		dataTest: z.string().nullable().default(null),
		isDisabled: z.boolean().default(false),
		label: z.string(),
		type: typeSchema.default(Type.DEFAULT),
	})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
