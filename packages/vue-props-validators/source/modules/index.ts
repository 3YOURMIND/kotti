import { REQUIRED } from '../constants'

import { TypeEnum } from './enum'
import { TypeFloat } from './float'
import { TypeInteger } from './integer'
import { TypeString } from './string'

export type TypeBase = {
	default: typeof REQUIRED | (() => unknown)
	nullable: boolean
}

export type Option = TypeEnum | TypeFloat | TypeInteger | TypeString
