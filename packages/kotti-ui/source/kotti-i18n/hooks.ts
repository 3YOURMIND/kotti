import elementLocale from 'element-ui/lib/locale/index.js'
import type { Ref, UnwrapRef } from 'vue'
import { computed, inject, provide, reactive, watch } from 'vue'

import { DecimalSeparator } from '../types/decimal-separator'

import { KT_I18N_CONTEXT } from './constants'
import { deDE } from './locales/de-DE'
import { enUS } from './locales/en-US'
import { esES } from './locales/es-ES'
import { frFR } from './locales/fr-FR'
import { jaJP } from './locales/ja-JP'
import { ukUA } from './locales/uk-UA'
import type { KottiI18n } from './types'
import { fixDeepMerge } from './utilities'

export const useI18nContext = (): KottiI18n.ContextInternal => {
	const context = inject<KottiI18n.Context | null>(KT_I18N_CONTEXT, null)

	if (context === null)
		// eslint-disable-next-line no-console
		console.warn(
			'useI18nContext: Missing Translation Context, falling back to English',
		)

	return reactive({
		currencyMap: computed<UnwrapRef<KottiI18n.Context['currencyMap']>>(
			() => context?.currencyMap.value ?? {},
		),
		locale: computed<UnwrapRef<KottiI18n.Context['locale']>>(
			() => context?.locale.value ?? 'en-US',
		),
		messages: computed<UnwrapRef<KottiI18n.Context['messages']>>(
			() => context?.messages.value ?? enUS,
		),
		numberFormat: computed<UnwrapRef<KottiI18n.Context['numberFormat']>>(
			() =>
				context?.numberFormat.value ?? {
					decimalSeparator: DecimalSeparator.DOT,
				},
		),
	})
}

export const useTranslationNamespace = <NS extends keyof KottiI18n.Messages>(
	namespace: NS,
): Ref<Readonly<KottiI18n.Messages[NS]>> => {
	const context = useI18nContext()

	return computed(() => context.messages[namespace])
}

interface DefaultObject<R extends Record<string, unknown>> {
	default: DefaultObject<R> | R
}

/**
 * HACK: This function works around a CJS/ESM/EsModule interop issue.
 *
 * The objects we import at `element-ui/lib/locale/lang/[a-z]{2}.js` are EsModules
 * (exports.__esModule = true). Due to current javascript flavour shenanigans,
 * the imported object that we need can be found at the root, at the `.default` key,
 * or even at the `.default.default` key.
 * To mitigate we iterate down the potential default chain until we arrive at the
 * right position.
 */
const accessDefaultKey = <R extends Record<string, unknown>>(
	obj: DefaultObject<R>,
): R => {
	if (!('default' in obj)) return obj

	let current: DefaultObject<R> | R = obj

	// Practically, this should terminate after at most 2 iterations. Make it 10 for good measure
	for (let i = 0; i < 10; i++) {
		current = current.default as DefaultObject<R> | R
		if (!('default' in current)) {
			return current
		}
	}
	throw new Error('accessDefaultKey: could not exhaust nested default keys')
}

/**
 * Provides the translation context to child components
 */
export const useI18nProvide = ({
	currencyMap,
	locale,
	messages,
	numberFormat,
}: {
	currencyMap: Ref<KottiI18n.Props['currencyMap']>
	locale: Ref<KottiI18n.Props['locale']>
	messages: Ref<KottiI18n.Props['messages']>
	numberFormat: Ref<KottiI18n.Props['numberFormat']>
}): void => {
	const defaultMessages = computed(
		(): KottiI18n.Messages =>
			({
				'de-DE': deDE,
				'en-US': enUS,
				'es-ES': esES,
				'fr-FR': frFR,
				'ja-JP': jaJP,
				'uk-UA': ukUA,
			})[locale.value],
	)

	/**
	 * Necessary for the date pickers
	 */
	watch(
		locale,
		async (newValue) => {
			try {
				const elementUiTranslations = await {
					/* eslint-disable @typescript-eslint/naming-convention */
					'de-DE': () => import('element-ui/lib/locale/lang/de.js'),
					'en-US': () => import('element-ui/lib/locale/lang/en.js'),
					'es-ES': () => import('element-ui/lib/locale/lang/es.js'),
					'fr-FR': () => import('element-ui/lib/locale/lang/fr.js'),
					'ja-JP': () => import('element-ui/lib/locale/lang/ja.js'),
					'uk-UA': () => import('element-ui/lib/locale/lang/ua.js'),
					/* eslint-enable @typescript-eslint/naming-convention */
				}[newValue]()

				const resolvedEsModuleInterop = accessDefaultKey(elementUiTranslations)

				elementLocale.use(resolvedEsModuleInterop)
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error(error)
				throw error
			}
		},
		{ flush: 'post', immediate: true },
	)

	provide<KottiI18n.Context>(KT_I18N_CONTEXT, {
		currencyMap,
		locale,
		messages: computed(() =>
			fixDeepMerge<KottiI18n.Messages>(defaultMessages.value, messages.value),
		),
		numberFormat: computed(() =>
			fixDeepMerge<KottiI18n.NumberFormat>(
				{
					decimalSeparator: DecimalSeparator.DOT,
				},
				numberFormat.value,
			),
		),
	})
}
