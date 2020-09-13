import { baseValidator } from '../common/base-validator'
import { resolveDefault } from '../common/resolve-default'
import { Result } from '../types'

import { TypeBase, Type } from '.'

export type TypeBoolean = TypeBase & {
	type: Type.BOOLEAN
}

export const createBoolean = <OPTION extends TypeBoolean>(
	option: OPTION,
): Result<OPTION, BooleanConstructor> => ({
	...resolveDefault(option),
	type: Boolean,
	validator: baseValidator(
		option,
		(value: unknown) => typeof value === 'boolean',
	),
})
