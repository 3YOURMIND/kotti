import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiLine {
	export type InternalProps = {
		text: string
	}

	export type Props = SpecifyRequiredProps<InternalProps, never>
}
