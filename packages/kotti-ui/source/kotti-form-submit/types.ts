import { SpecifyRequiredProps } from '../types/utilities'

export module KottiFormSubmit {
	export type PropsInternal = {
		label: string
	}

	export type Props = SpecifyRequiredProps<PropsInternal, never>

	export type Translations = {
		errorsSectionTitle: string
		title: string
		warningsSectionTitle: string
	}
}
