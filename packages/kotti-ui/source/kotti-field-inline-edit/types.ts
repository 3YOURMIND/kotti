import { z } from 'zod'

import { KottiFieldTextArea } from '../kotti-field-text-area/types'
import { KottiFieldText } from '../kotti-field-text/types'
import { KottiField } from '../kotti-field/types'

export namespace KottiFieldInlineEdit {
	export namespace Shared {
		export enum Mode {
			HEADER = 'header',
			MULTI_LINE = 'multi-line',
			REGULAR = 'regular',
			TEXT_LINE = 'text-line',
		}

		export const propsSchema = KottiField.propsSchema
			.merge(
				KottiField.potentiallySupportedPropsSchema.pick({ tabIndex: true }),
			)
			.omit({
				helpDescription: true,
				helpText: true,
				label: true,
				size: true,
			})
			.extend({
				isEditing: z.boolean().default(false),
				mode: z.nativeEnum(Mode).default(Mode.REGULAR),
			})
	}

	export namespace Header {
		export const propsSchema = Shared.propsSchema.merge(
			KottiFieldText.propsSchema.pick({ value: true, placeholder: true }),
		)

		export type Props = z.input<typeof propsSchema>
		export type PropsInternal = z.output<typeof propsSchema>
	}

	export namespace MultiLine {
		export const propsSchema = Shared.propsSchema.merge(
			KottiFieldTextArea.propsSchema.pick({ value: true, placeholder: true }),
		)
		export type Props = z.input<typeof propsSchema>
		export type PropsInternal = z.output<typeof propsSchema>
	}

	export namespace Regular {
		export const propsSchema = Shared.propsSchema
			.merge(
				KottiFieldText.propsSchema.pick({ value: true, placeholder: true }),
			)
			/**
			 * It's the only mode that supports label, helpText and helpDescription
			 */
			.merge(
				KottiField.propsSchema.pick({
					label: true,
					helpText: true,
					helpDescription: true,
				}),
			)
		export type Props = z.input<typeof propsSchema>
		export type PropsInternal = z.output<typeof propsSchema>
	}

	export namespace TextLine {
		export const propsSchema = Shared.propsSchema.merge(
			KottiFieldText.propsSchema.pick({ value: true, placeholder: true }),
		)

		export type Props = z.input<typeof propsSchema>
		export type PropsInternal = z.output<typeof propsSchema>
	}

	export type Value = KottiFieldText.Value

	export type Translations = {
		placeholder: string
	}

	export type PropsInternal<M extends Shared.Mode> =
		M extends Shared.Mode.HEADER
			? Header.PropsInternal
			: M extends Shared.Mode.MULTI_LINE
			? MultiLine.PropsInternal
			: M extends Shared.Mode.REGULAR
			? Regular.PropsInternal
			: TextLine.PropsInternal
}
