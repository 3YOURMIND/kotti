import { REQUIRED } from '../constants'
import { Option } from '../modules'

export const resolveDefault = <OPTION extends Option>(option: OPTION) =>
	(option.default === REQUIRED
		? { required: true }
		: { default: option.default }) as OPTION['default'] extends typeof REQUIRED
		? { required: true }
		: { default: OPTION['default'] }
