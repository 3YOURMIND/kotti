import { REQUIRED } from '../constants'

import { TypeArray } from './array'
import { TypeBoolean } from './boolean'
import { TypeEnum } from './enum'
import { TypeFloat } from './float'
import { TypeInteger } from './integer'
import { TypeObject } from './object'
import { TypeString } from './string'

export type TypeBase<TYPE> = {
	default: typeof REQUIRED | (() => TYPE | null)
	nullable: boolean
}

export enum Type {
	ARRAY = 'array',
	BOOLEAN = 'boolean',
	ENUM = 'enum',
	FLOAT = 'float',
	INTEGER = 'integer',
	OBJECT = 'object',
	STRING = 'string',
}

export type Option =
	| TypeArray
	| TypeBoolean
	| TypeEnum
	| TypeFloat
	| TypeInteger
	| TypeObject
	| TypeString
