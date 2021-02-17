import { Ref } from '@vue/composition-api'

import { Shared as KottiFieldSelectShared } from '../kotti-field-select/types'
import { Kotti } from '../types'

export type DeepPartial<T> = T extends object
	? { [K in keyof T]?: DeepPartial<T[K]> }
	: T

export namespace KottiTranslation {
	export type Context = {
		locale: Ref<SupportedLanguages>
		messages: Ref<Messages>
	}

	export type Messages = {
		KtFields: Kotti.Field.Translations
		KtFieldSelects: KottiFieldSelectShared.Translations
		KtFormSubmit: Kotti.FormSubmit.Translations
		KtTable2: Kotti.Table2.Translations
	}

	export type Props = {
		locale: SupportedLanguages
		messages: DeepPartial<Messages>
	}

	/**
	 * Language-Region as defined in RFC4646
	 * Consisting of ISO 639-1 two-letter language code and ISO 3166 two-letter region specifier
	 * @see {@link https://tools.ietf.org/html/rfc4646}
	 */
	export type SupportedLanguages =
		| 'en-US'
		| 'de-DE'
		| 'es-ES'
		| 'fr-FR'
		| 'ja-JP'
}
