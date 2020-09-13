import { baseValidator } from '../common/base-validator'
import { resolveDefault } from '../common/resolve-default'
import { Result } from '../types'
import { isNumber } from '../utilities'

import { TypeBase, Type } from '.'

export type TypeFloat = TypeBase & {
	type: Type.FLOAT
}

export const createFloat = <OPTION extends TypeFloat>(
	option: OPTION,
): Result<OPTION, NumberConstructor> => ({
	...resolveDefault(option),
	type: Number,
	validator: baseValidator(option, (value: unknown) => isNumber(value)),
})
