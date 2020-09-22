import { baseValidator } from '../common/base-validator'
import { resolveDefault } from '../common/resolve-default'
import { Result } from '../types'

import { TypeBase, Type } from '.'

export type TypeArray = TypeBase<Array<unknown>> & {
	type: Type.ARRAY
}

export const createArray = <OPTION extends TypeArray>(
	option: OPTION,
): Result<OPTION, ArrayConstructor> => ({
	...resolveDefault(option),
	type: Array,
	validator: baseValidator(option, (value: unknown) => Array.isArray(value)),
})
