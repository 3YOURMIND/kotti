import { computed, inject, provide, Ref, watch } from '@vue/composition-api'
import elementLocale from 'element-ui/lib/locale'
import elementDe from 'element-ui/lib/locale/lang/de'
import elementEn from 'element-ui/lib/locale/lang/en'
import elementEs from 'element-ui/lib/locale/lang/es'
import elementFr from 'element-ui/lib/locale/lang/fr'
import elementJa from 'element-ui/lib/locale/lang/ja'

import { KT_TRANSLATION_CONTEXT } from './constants'
import { deDE } from './locales/de-DE'
import { enUS } from './locales/en-US'
import { esES } from './locales/es-ES'
import { frFR } from './locales/fr-FR'
import { jaJP } from './locales/ja-JP'
import { KottiTranslation, DeepPartial } from './types'
import { fixDeepMerge } from './utilities'

export const useTranslationContext = (): KottiTranslation.Context => {
	const context = inject<KottiTranslation.Context | null>(
		KT_TRANSLATION_CONTEXT,
		null,
	)

	if (context === null)
		// eslint-disable-next-line no-console
		console.warn(
			'useTranslationContext: Missing Translation Context, falling back to English',
		)

	return {
		locale: computed(() => (context === null ? 'en-US' : context.locale.value)),
		messages: computed(() =>
			context === null ? enUS : context.messages.value,
		),
	}
}

export const useTranslationNamespace = <
	NS extends keyof KottiTranslation.Messages
>(
	namespace: NS,
): KottiTranslation.Messages[NS] => {
	const context = useTranslationContext()

	return context.messages.value[namespace]
}

/**
 * Provides the translation context to child components
 */
export const useTranslationProvide = (
	locale: Ref<KottiTranslation.SupportedLanguages>,
	messages: Ref<DeepPartial<KottiTranslation.Messages>>,
) => {
	const defaultMessages = computed(
		(): KottiTranslation.Messages =>
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
	watch(locale, () => {
		elementLocale.use(
			{
				'en-US': elementEn,
				'de-DE': elementDe,
				'es-ES': elementEs,
				'fr-FR': elementFr,
				'ja-JP': elementJa,
			}[locale.value],
		)
	})

	provide<KottiTranslation.Context>(KT_TRANSLATION_CONTEXT, {
		locale,
		messages: computed(() =>
			fixDeepMerge<KottiTranslation.Messages>(
				defaultMessages.value,
				messages.value,
			),
		),
	})
}
