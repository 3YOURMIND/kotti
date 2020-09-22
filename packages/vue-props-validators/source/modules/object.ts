import { baseValidator } from '../common/base-validator'
import { resolveDefault } from '../common/resolve-default'
import { Result } from '../types'

import { TypeBase, Type } from '.'

export type TypeObject = TypeBase<{ [key: string]: unknown }> & {
	type: Type.OBJECT
}

export const createObject = <OPTION extends TypeObject>(
	option: OPTION,
): Result<OPTION, ObjectConstructor> => ({
	...resolveDefault(option),
	type: Object,
	validator: baseValidator(
		option,
		(value: unknown) => value !== null && typeof value === 'object',
	),
})
