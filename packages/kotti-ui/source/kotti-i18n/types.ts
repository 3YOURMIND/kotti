import { Ref } from '@vue/composition-api'

import { KottiBanner } from '../kotti-banner/types'
import { KottiComment } from '../kotti-comment/types'
import { KottiField } from '../kotti-field/types'
import { KottiFieldFileUpload } from '../kotti-field-file-upload/types'
import { Shared as KottiFieldSelectShared } from '../kotti-field-select/types'
import { KottiFilters } from '../kotti-filters/types'
import { KottiFormSubmit } from '../kotti-form-submit/types'
import { KottiNavbar } from '../kotti-navbar/types'
import { DecimalSeparator } from '../types/kotti'

export type DeepPartial<T> = T extends Record<string, unknown>
	? { [K in keyof T]?: DeepPartial<T[K]> }
	: T

export namespace KottiI18n {
	export type Context = {
		currencyMap: Ref<CurrencyMap>
		locale: Ref<SupportedLanguages>
		messages: Ref<Messages>
		numberFormat: Ref<NumberFormat>
	}

	export type CurrencyMap = Record<
		string,
		{ decimalPlaces: number; symbol: string }
	>

	export type NumberFormat = {
		decimalSeparator: DecimalSeparator
	}

	export type Messages = {
		KtBanner: KottiBanner.Translations
		KtComment: KottiComment.Translations
		KtFieldFileUpload: KottiFieldFileUpload.Translations
		KtFields: KottiField.Translations
		KtFieldSelects: KottiFieldSelectShared.Translations
		KtFilters: KottiFilters.Translations
		KtFormSubmit: KottiFormSubmit.Translations
		KtNavbar: KottiNavbar.Translations
	}

	export type Props = {
		currencyMap: CurrencyMap
		locale: SupportedLanguages
		messages: DeepPartial<Messages>
		numberFormat: DeepPartial<NumberFormat>
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
