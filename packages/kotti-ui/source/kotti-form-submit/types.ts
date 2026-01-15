import type { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiFormSubmit {
	export type PropsInternal = {
		label: string
	}

	// eslint-disable-next-line @typescript-eslint/no-deprecated
	export type Props = SpecifyRequiredProps<PropsInternal, never>

	export type Translations = {
		errorsSectionTitle: string
		title: string
		warningsSectionTitle: string
	}
}
