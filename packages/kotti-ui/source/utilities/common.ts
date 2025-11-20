import type { App, Component, FunctionPlugin } from 'vue'
import { type z } from 'zod'

import type { Kotti } from '../types'
import { DecimalSeparator } from '../types/decimal-separator'

/**
 * Takes a Vue Component and assigns a meta object which
 * describes various properties of the component
 */
export const attachMeta = <
	C extends Component,
	T extends Record<string, unknown>,
	ZOD extends z.ZodTypeAny | null,
>(
	component: C,
	meta: Kotti.Meta<ZOD>,
	other?: T,
): C & { meta: Kotti.Meta<ZOD> & T } =>
	Object.assign(component, { meta: Object.assign({}, meta, other) })

/**
 * Checks if the given HTML element, or any of its children, is in focus
 * @param element The HTML element
 */
export const isInFocus = (element: HTMLElement | null): boolean =>
	document.activeElement instanceof HTMLElement &&
	(document.activeElement === element ||
		(element?.contains(document.activeElement) ?? false))

/**
 * Triggers blur() on the given HTML element if it, or any of its children, is in focus
 * @param element The HTML element
 */
export const blurElement = (element: HTMLElement | null): void => {
	if (document.activeElement instanceof HTMLElement && isInFocus(element))
		document.activeElement.blur()
}
/**
 * Checks if the given HTML element or Vue component is/contains the specified event target
 * @param component The HTML element or Vue component
 * @param eventTarget The target of the event being checked
 *
 * This function doesn't work if the event target is (inside) an SVG Element
 * {@link https://web.archive.org/web/20231208174614/https://gomakethings.com/detecting-click-events-on-svgs-with-vanilla-js-event-delegation/}
 */
export const isOrContainsEventTarget = (
	component: HTMLElement | { $el: HTMLElement } | null,
	eventTarget: EventTarget | null,
): boolean => {
	if (component === null) return false
	const element = '$el' in component ? component.$el : component

	return (
		element === eventTarget ||
		(eventTarget instanceof HTMLElement && element.contains(eventTarget))
	)
}

/**
 * Takes a Vue Component and assigns an install function to it
 * this makes sure that it can be used with Vue.use(component)
 */
export const makeInstallable = <C extends Component>(
	component: C,
): C & { install: FunctionPlugin<Record<string, never>> } => {
	const { name } = component
	if (name === undefined) {
		throw new Error('makeInstallable was passed a component without a name')
	}

	return Object.assign(component, {
		install: (app: App) => app.component(name, component),
	})
}

export const isNumberInRange = ({
	maximum,
	minimum,
	value,
}: {
	maximum: number | null
	minimum: number | null
	value: number | null
}): boolean => {
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
