import elementLocale from 'element-ui/lib/locale'
import elementDe from 'element-ui/lib/locale/lang/de'
import elementEn from 'element-ui/lib/locale/lang/en'
import elementEs from 'element-ui/lib/locale/lang/es'
import elementFr from 'element-ui/lib/locale/lang/fr'
import elementJa from 'element-ui/lib/locale/lang/ja'
import { computed, inject, provide, reactive, Ref, UnwrapRef, watch } from 'vue'

import { DecimalSeparator } from '../types/kotti'

import { KT_I18N_CONTEXT } from './constants'
import { deDE } from './locales/de-DE'
import { enUS } from './locales/en-US'
import { esES } from './locales/es-ES'
import { frFR } from './locales/fr-FR'
import { jaJP } from './locales/ja-JP'
import { KottiI18n } from './types'
import { fixDeepMerge } from './utilities'

export const useI18nContext = () => {
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
}) => {
	const defaultMessages = computed(
		(): KottiI18n.Messages =>
			({
				'en-US': enUS,
				'de-DE': deDE,
				'es-ES': esES,
				'fr-FR': frFR,
				'ja-JP': jaJP,
			}[locale.value]),
	)

	/**
	 * Necessary for the date pickers
	 */
	watch(
		locale,
		(newValue) => {
			const elementUiTranslations = {
				'en-US': elementEn,
				'de-DE': elementDe,
				'es-ES': elementEs,
				'fr-FR': elementFr,
				'ja-JP': elementJa,
			}[newValue]

			if ('default' in elementUiTranslations)
				throw new Error('Detected Broken Build')

			elementLocale.use(elementUiTranslations)
		},
		{ immediate: true },
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
