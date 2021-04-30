import { Yoco } from '@3yourmind/yoco'

import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiBreadcrumb {
	export enum SeparatorType {
		ICON = 'icon',
		TEXT = 'text',
	}

	export type Breadcrumb = {
		isCompleted: boolean
		onClick: () => void
		title: string
	}

	export type Style =
		| {
				style: SeparatorType.ICON
				value: Yoco.Icon
		  }
		| {
				style: SeparatorType.TEXT
				value: string
		  }

	export type PropsInternal = {
		breadcrumbs: Array<Breadcrumb>
		separator: Style
	}

	export type Props = SpecifyRequiredProps<PropsInternal, 'breadcrumbs'>
}
