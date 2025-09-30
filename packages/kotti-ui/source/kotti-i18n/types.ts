import type { Ref } from 'vue'
import { z } from 'zod'

import type { KottiComment } from '../kotti-comment/types'
import type { Shared as KottiFieldFileUploadShared } from '../kotti-field-file-upload/types'
import type { KottiFieldInlineEdit } from '../kotti-field-inline-edit/types'
import type { Shared as KottiFieldSelectShared } from '../kotti-field-select/types'
import type { KottiField } from '../kotti-field/types'
import type { KottiFilters } from '../kotti-filters/types'
import type { KottiFormSubmit } from '../kotti-form-submit/types'
import type { KottiNavbar } from '../kotti-navbar/types'
import type { KottiStandardTable } from '../kotti-table/standard-table/types'
import type { KottiTable } from '../kotti-table/table/types'
import type { KottiValueLabel } from '../kotti-value-label/types'
import { DecimalSeparator } from '../types/decimal-separator'

export type DeepPartial<T> =
	T extends Record<string, unknown> ? { [K in keyof T]?: DeepPartial<T[K]> } : T

export namespace KottiI18n {
	export type Context = {
		currencyMap: Ref<CurrencyMap>
		locale: Ref<SupportedLanguages>
		messages: Ref<Messages>
		numberFormat: Ref<NumberFormat>
	}

	export type ContextInternal = {
		currencyMap: CurrencyMap
		locale: SupportedLanguages
		messages: Messages
		numberFormat: NumberFormat
	}

	export type CurrencyMap = Record<
		string,
		{ decimalPlaces: number; symbol: string }
	>

	export const numberFormatSchema = z
		.object({
			decimalSeparator: z.nativeEnum(DecimalSeparator),
		})
		.strict()
	export type NumberFormat = z.output<typeof numberFormatSchema>

	export type Messages = {
		KtComment: KottiComment.Translations
		KtFieldFileUpload: KottiFieldFileUploadShared.Translations
		KtFieldInlineEdit: KottiFieldInlineEdit.Translations
		KtFields: KottiField.Translations
		KtFieldSelects: KottiFieldSelectShared.Translations
		KtFilters: KottiFilters.Translations
		KtFormSubmit: KottiFormSubmit.Translations
		KtNavbar: KottiNavbar.Translations
		KtStandardTable: KottiStandardTable.Translations
		KtTable: KottiTable.Translations
		KtValueLabel: KottiValueLabel.Translations
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
		| 'de-DE'
		| 'en-US'
		| 'es-ES'
		| 'fr-FR'
		| 'ja-JP'
		| 'uk-UA'
}
