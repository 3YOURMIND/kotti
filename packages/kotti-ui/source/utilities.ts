import { VueConstructor } from 'vue'

import { Kotti } from './types'
import { DecimalSeparator } from './types/kotti'

/**
 * Takes a Vue Component and assigns a meta object which
 * describes various properties of the component
 */
export const attachMeta = <T>(
	component: VueConstructor<Vue>,
	meta: Kotti.Meta,
	other?: T,
) => Object.assign(component, { meta: Object.assign({}, meta, other) })

export const isBrowser = Boolean(
	typeof window !== 'undefined' && window.document,
)

/**
 * Takes a Vue Component and assigns an install function to it
 * this makes sure that it can be used with Vue.use(component)
 */
export const makeInstallable = (component: VueConstructor<Vue>) =>
	Object.assign(component, {
		install: (Vue) => Vue.component(component.name, component),
	} as Vue.PluginObject<Record<string, never>>)

export const isNumberInRange = ({
	maximum,
	minimum,
	value,
}: {
	maximum: number | null
	minimum: number | null
	value: number | null
}) => {
	if (value === null) return true

	const fitsMinimum = minimum === null || value >= minimum
	const fitsMaximum = maximum === null || value <= maximum

	return fitsMinimum && fitsMaximum
}

/**
 * RegExp character set for use within other regular expressions
 */
export const DECIMAL_SEPARATORS_CHARACTER_SET = [
	'[',
	...Object.values(DecimalSeparator),
	']',
].join('')
