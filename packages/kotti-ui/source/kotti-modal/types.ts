export namespace KottiModal {
	export enum Size {
		EXTRA_LARGE = 'xl',
		LARGE = 'lg',
		MEDIUM = 'md',
		SMALL = 'sm',
	}

	export type PropsInternal = {
		preventCloseOutside: boolean
		size: Size
	}

	export type Props = Partial<PropsInternal>
}
