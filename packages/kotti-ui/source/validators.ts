import { Yoco } from '@3yourmind/yoco'
import { cloneDeep } from 'lodash'
import { z } from 'zod'

export const yocoIconSchema = z.nativeEnum(Yoco.Icon)

export const isYocoIcon = (value: unknown): value is Yoco.Icon =>
	yocoIconSchema.safeParse(value).success

/**
 * Easily validate vue props, improve error messages drastically
 *
 * This augments/replaces Vue’s prop.validator approach by using zod and therefore actually
 * prints errors to the console that can actually help developers rather than just say
 * "hey you failed the validator, good luck!" as vue would do by default.
 *
 * @example
 * sections: {
 * 	required: true,
 * 	type: Array,
 * 	validator: propValidator(KottiUserMenu.propsInternalSchema, 'sections'),
 * }
 */
export const propValidator = <
	SCHEMA extends z.ZodObject<z.ZodRawShape>,
	KEY extends keyof z.infer<SCHEMA>,
>(
	schema: SCHEMA,
	key: KEY,
) => {
	const validator = (value: unknown) => {
		const result = schema.pick({ [key]: true }).safeParse({ [key]: value })

		if (result.success) return true

		/* eslint-disable no-console */
		console.group(`propValidator found issues with prop “${key}”`)

		console.error(result.error)

		if (Array.isArray(value)) console.table(cloneDeep(value))
		else console.log(cloneDeep(value))

		console.trace()

		console.groupEnd()
		/* eslint-enable no-console */

		return false
	}

	// assign name for better debugging and to improve props rendering in the documentation
	Object.defineProperty(validator, 'name', {
		value: `propValidator('${key}')`,
		writable: false,
	})

	return validator
}
