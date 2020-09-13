import { baseValidator } from '../common/base-validator'
import { resolveDefault } from '../common/resolve-default'
import { Result } from '../types'
import { isNumber } from '../utilities'

import { TypeBase, Type } from '.'

export type TypeInteger = TypeBase & {
	type: Type.INTEGER
}

export const createInteger = <OPTION extends TypeInteger>(
	option: OPTION,
): Result<OPTION, NumberConstructor> => ({
	...resolveDefault(option),
	type: Number,
	validator: baseValidator(
		option,
		(value: unknown) => isNumber(value) && Number.isSafeInteger(value),
	),
})
