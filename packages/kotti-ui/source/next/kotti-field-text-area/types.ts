import { KottiField } from '../kotti-field/types'

export namespace KottiFieldTextArea {
	export type Props = KottiField.Props<Value> & {
		placeholder: string | null
		/**
		 * FIXME: Type definition for HTMLTextAreaElement was removed due to a bug
		 * when generating the types using rollup
		 */
		rows: number
	}

	export type Value = string | null
}
