import { baseValidator } from '../common/base-validator'
import { resolveDefault } from '../common/resolve-default'
import { Result } from '../types'

import { TypeBase, Type } from '.'

export type TypeString = TypeBase & {
	type: Type.STRING
}

export const createString = <OPTION extends TypeString>(
	option: OPTION,
): Result<OPTION, StringConstructor> => ({
	...resolveDefault(option),
	type: String,
	validator: baseValidator(
		option,
		(value: unknown) => typeof value === 'string',
	),
})
