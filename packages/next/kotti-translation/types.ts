import { Shared as KottiFieldDateShared } from '../kotti-field-date/types'
import { Shared as KottiFieldSelectShared } from '../kotti-field-select/types'
// import { KtFormSubmit } from '../kotti-form'
// also for the ktfield (for the internally-supported required error msg)

export namespace KtTranslation {
	export type Context = {
		locale: 'en-US'
		TODO: {
			KtFieldDates: KottiFieldDateShared.Translations
			KtFieldSelects: KottiFieldSelectShared.Translations
			// KtFormSubmit: KtFormSubmit.Translations
		}
	}
}
