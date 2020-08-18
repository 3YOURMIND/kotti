import { Ref } from '@vue/composition-api'

export namespace KottiRow {
	export type Context = {
		gap: Readonly<Ref<number>>
		gutter: Readonly<Ref<number>>
	}
}
