import { z } from 'zod'

import { Yoco, yocoIconSchema } from '@3yourmind/yoco'

import { KottiField } from '../kotti-field/types'
import { createLooseZodEnumSchema } from '../zod-utilities/enums'

export namespace KottiFileUpload {
	export enum Validation {
		INVALID_EXTENSION = 'INVALID_EXTENSION',
		MAX_SIZE_EXCEEDED = 'MAX_SIZE_EXCEEDED',
		SUCCESS = 'SUCCESS',
	}
	export const validationSchema = z.nativeEnum(Validation)

	export enum Status {
		CANCELED = 'CANCELED',
		ERROR = 'ERROR',
		INVALID = 'INVALID',
		NOT_STARTED = 'NOT_STARTED',
		UPLOADED = 'UPLOADED',
		UPLOADED_WITH_ERROR = 'UPLOADED_WITH_ERROR',
		UPLOADING = 'UPLOADING',
	}
	export const statusSchema = createLooseZodEnumSchema(Status)
		.transform((status) => status as Status)
		.or(
			z.object({
				label: z.string(),
				showProgress: z.boolean().optional(),
				type: z.enum(['error', 'loading']),
			}),
		)

	export const idSchema = z.union([z.number(), z.string()])

	export const fileInfoSchema = z.object({
		downloadUrl: z.string().optional(),
		id: idSchema,
		isInternal: z.boolean().optional(),
		name: z.string(),
		progress: z
			.number()
			.min(0)
			.transform((val) => Math.max(1, val))
			.optional(),
		size: z.number().int().min(0).optional(),
		status: statusSchema.default(Status.UPLOADED),
		validation: validationSchema.optional(),
		viewUrl: z.string().optional(),
	})
	export type FileInfo = z.output<typeof fileInfoSchema>

	// New selected files
	export const selectedFileSchema = z.object({
		file: z.custom<File>(),
		id: z.string(),
	})

	export const interceptedFileSchema = z.object({
		file: z.custom<File>(),
		id: idSchema,
		status: statusSchema,
		validation: validationSchema,
	})

	export type InterceptedFile = z.input<typeof interceptedFileSchema>

	// Pre-uploaded files
	export const preUploadedFileSchema = z.object({
		downloadUrl: z.string().optional(),
		id: idSchema,
		isInternal: z.boolean().optional(),
		name: z.string(),
		size: z.number().int().min(0),
		viewUrl: z.string().optional(),
	})

	export const uploadPropsSchema = z.object({
		allowMultiple: z.boolean().default(false),
		allowPhotos: z.boolean().default(false),
		collapseExtensionsAfter: z
			.number()
			.int()
			.min(0)
			.default(Number.MAX_SAFE_INTEGER),
		extensions: z
			.string()
			.min(1)
			.array()
			.default(() => []),
		externalUrl: z.string().nullable().default(null),
		hideDropArea: z.boolean().default(false),
		icon: yocoIconSchema.default(Yoco.Icon.CLOUD_UPLOAD),
		maxFileSize: z.number().int().min(0).default(Number.MAX_SAFE_INTEGER),
		state: z.array(fileInfoSchema),
	})

	export const propsSchema = KottiField.propsSchema
		.pick({
			dataTest: true,
			helpDescription: true,
			helpText: true,
			isDisabled: true,
			isLoading: true,
			label: true,
		})
		.merge(
			KottiField.potentiallySupportedPropsSchema.pick({
				tabIndex: true,
			}),
		)
		.merge(uploadPropsSchema)

	export namespace Events {
		export type AddFiles = Array<{
			file: File
			fileInfo: FileInfo
		}>

		export type CancelUpload = z.infer<typeof idSchema>

		export type RemoveFile = z.infer<typeof idSchema>

		export type RestartUpload = z.infer<typeof idSchema>
	}

	export namespace ActionButton {
		export const schema = propsSchema
			.pick({
				isDisabled: true,
			})
			.extend({
				icon: yocoIconSchema,
			})

		export type Props = z.input<typeof schema>
		export type PropsInternal = z.output<typeof schema>
	}

	export namespace DropArea {
		export const schema = propsSchema
			.pick({
				allowMultiple: true,
				collapseExtensionsAfter: true,
				dataTest: true,
				extensions: true,
				externalUrl: true,
				hideDropArea: true,
				icon: true,
				isDisabled: true,
				isLoading: true,
				maxFileSize: true,
				tabIndex: true,
			})
			.extend({
				inputId: z.string(),
			})

		export type Props = z.input<typeof schema>
		export type PropsInternal = z.output<typeof schema>
	}

	export namespace FileItem {
		export const schema = propsSchema.pick({
			dataTest: true,
			extensions: true,
			isDisabled: true,
			maxFileSize: true,
		})
	}

	export namespace TakePhoto {
		export const schema = propsSchema.pick({
			dataTest: true,
			isDisabled: true,
			tabIndex: true,
		})

		export type Props = z.input<typeof schema>
		export type PropsInternal = z.output<typeof schema>

		export const captureSchema = schema.pick({
			dataTest: true,
		})
		export type CaptureProps = z.output<typeof captureSchema>

		export const reviewSchema = captureSchema.extend({
			photoUrl: z.string().nullable().default(null),
		})
		export type ReviewProps = z.output<typeof reviewSchema>

		export const errorSchema = captureSchema.extend({
			error: z.string().nullable().default(null),
		})
		export type ErrorProps = z.output<typeof errorSchema>

		export namespace Events {
			export type Capture = {
				file: File
				photoUrl: string
			}

			export type Error = string
		}
	}

	export type Translations = {
		button: {
			acceptPhoto: string
			cancel: string
			nextCamera: string
			rejectPhoto: string
			retry: string
			takePhoto: string
		}
		error: {
			multipleNotAllowed: string
			notAllowed: string
			notFound: string
			notSupported: string
		}
		label: {
			capture: string
			error: string
			internal: string
			review: string
			unknown: string
		}
		statusMsg: {
			CANCELED: string
			ERROR: string
			HIDDEN: string
			INVALID: string
			NOT_STARTED: string
			READY_TO_UPLOAD: string
			UPLOADED: string
			UPLOADED_WITH_ERROR: string
			UPLOADING: string
		}
		text: {
			clickToUpload: string
			dragAndDrop: string
			learnMore: string
			max: string
		}
		validationMsg: {
			INVALID_EXTENSION: string
			MAX_SIZE_EXCEEDED: string
		}
	}

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
