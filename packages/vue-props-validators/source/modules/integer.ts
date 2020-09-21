import { baseValidator } from '../common/base-validator'
import { resolveDefault } from '../common/resolve-default'
import { Result } from '../types'
import { isNumber } from '../utilities'

import { TypeBase, Type } from '.'

export type TypeInteger = TypeBase<number> & {
	maximum?: number
	minimum?: number
	type: Type.INTEGER
}

export const createInteger = <OPTION extends TypeInteger>(
	option: OPTION,
): Result<OPTION, NumberConstructor> => ({
	...resolveDefault(option),
	type: Number,
	validator: baseValidator(
		option,
		(value: unknown) =>
			isNumber(value) &&
			Number.isSafeInteger(value) &&
			(option.maximum === undefined || value <= option.maximum) &&
			(option.minimum === undefined || value >= option.minimum),
	),
})
