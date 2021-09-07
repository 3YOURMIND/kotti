import { z } from 'zod'

import { SpecifyRequiredProps } from '../types/utilities'
import { yocoIconSchema } from '../validators'

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

	export const propsInternalSchema = z.object({
		icon: yocoIconSchema,
		isBlock: z.boolean(),
		isLoading: z.boolean(),
		isMultiline: z.boolean(),
		isSubmit: z.boolean(),
		label: z.string().nullable(),
		size: sizeSchema,
		type: typeSchema,
	})
	export type PropsInternal = z.infer<typeof propsInternalSchema>

	export type Props = SpecifyRequiredProps<PropsInternal, never>
}
