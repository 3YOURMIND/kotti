export namespace KottiModal {
	export enum Size {
		EXTRA_LARGE = 'xl',
		LARGE = 'lg',
		MEDIUM = 'md',
		SMALL = 'sm',
	}

	export type PropsInternal = {
		closeOutside: boolean
		size: Size
	}

	export type Props = Partial<PropsInternal>
}
