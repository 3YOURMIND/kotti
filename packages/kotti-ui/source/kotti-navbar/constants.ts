import { InjectionKey, Ref } from '@vue/composition-api'

import { KottiNavbar } from './types'

export const KT_NAVBAR_CONTEXT: InjectionKey<
	Ref<{ isNarrow: boolean; theme: KottiNavbar.Theme | null }>
> = Symbol('KT_NAVBAR_CONTEXT')
