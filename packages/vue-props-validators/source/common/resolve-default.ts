import { REQUIRED } from '../constants'
import { Option } from '../modules'

export const resolveDefault = (
	option: Option,
): Option['default'] extends typeof REQUIRED
	? { required: true }
	: { default: Option['default'] } =>
	option.default === REQUIRED ? { required: true } : { default: option.default }
