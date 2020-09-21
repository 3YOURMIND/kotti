import { REQUIRED } from '../constants'

import { TypeBoolean } from './boolean'
import { TypeEnum } from './enum'
import { TypeFloat } from './float'
import { TypeInteger } from './integer'
import { TypeString } from './string'

export type TypeBase<TYPE> = {
	default: typeof REQUIRED | (() => TYPE | null)
	nullable: boolean
}

export enum Type {
	BOOLEAN = 'boolean',
	ENUM = 'enum',
	FLOAT = 'float',
	INTEGER = 'integer',
	STRING = 'string',
}

export type Option =
	| TypeBoolean
	| TypeEnum
	| TypeFloat
	| TypeInteger
	| TypeString
