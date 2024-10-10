import { z } from 'zod'

import { Yoco, yocoIconSchema } from '@3yourmind/yoco'

import { KottiField } from '../kotti-field/types'
import type { EnumToPrimitiveUnion } from '../zod-utilities/enums'
import { createLooseZodEnumSchema } from '../zod-utilities/enums'

export module Shared {
	export enum Validation {
		INVALID_EXTENSION = 'INVALID_EXTENSION',
		MAX_SIZE_EXCEEDED = 'MAX_SIZE_EXCEEDED',
		SUCCESS = 'SUCCESS',
	}
	export const validationSchema = z.nativeEnum(Validation)

	export const idSchema = z.union([z.number(), z.string()])

	export const fileInfoSchema = z.object({
		downloadUrl: z.string().optional(),
		isInternal: z.boolean().optional(),
		name: z.string(),
		size: z.number().int().min(0),
		validation: createLooseZodEnumSchema(Validation),
		viewUrl: z.string().optional(),
	})
	export type FileInfo = z.output<typeof fileInfoSchema>

	// New selected files
	export const selectedFileSchema = z.object({
		file: z.custom<File>(),
		id: z.string(),
	})

	// Pre-uploaded files
	export const preUploadedFileSchema = z.object({
		downloadUrl: z.string().optional(),
		id: idSchema,
		isInternal: z.boolean().optional(),
		name: z.string(),
		size: z.number().int().min(0),
		viewUrl: z.string().optional(),
	})

	export const propsSchema = KottiField.propsSchema
		.merge(
			KottiField.potentiallySupportedPropsSchema.pick({
				tabIndex: true,
			}),
		)
		.extend({
			allowMultiple: z.boolean().default(false),
			allowPhotos: z.boolean().default(false),
			collapseExtensionsAfter: z
				.number()
				.int()
				.min(0)
				.default(Number.MAX_SAFE_INTEGER),
			extensions: z.array(z.string().min(1)).default(() => []),
			externalUrl: z.string().nullable().default(null),
			hideDropArea: z.boolean().default(false),
			icon: yocoIconSchema.default(Yoco.Icon.CLOUD_UPLOAD),
			maxFileSize: z.number().int().min(0).default(Number.MAX_SAFE_INTEGER),
		})

	export module Events {
		export type AddFiles = Array<File>

		export type RemoveFile = z.infer<typeof idSchema>
	}

	export module ActionButton {
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

	export module DropArea {
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

	export module FileItem {
		export const schema = propsSchema.pick({
			dataTest: true,
			extensions: true,
			isDisabled: true,
			maxFileSize: true,
		})
	}

	export module TakePhoto {
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

		export module Events {
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
}

export module KottiFieldFileUpload {
	export enum Status {
		INVALID = 'INVALID',
		NOT_STARTED = 'NOT_STARTED',
		READY_TO_UPLOAD = 'READY_TO_UPLOAD',
		UPLOADED = 'UPLOADED',
		UPLOADED_WITH_ERROR = 'UPLOADED_WITH_ERROR',
	}
	export const statusSchema = createLooseZodEnumSchema(Status)

	export const selectedFileSchema = Shared.selectedFileSchema.extend({
		status: statusSchema,
	})
	export type SelectedFile = z.input<typeof selectedFileSchema>

	export const preUploadedFileSchema = Shared.preUploadedFileSchema.extend({
		status: statusSchema.optional(),
	})
	export type PreUploadedFile = z.input<typeof preUploadedFileSchema>

	export const valueSchema = selectedFileSchema.or(preUploadedFileSchema)
	export const valuesSchema = valueSchema.array()
	export type Value = z.input<typeof valuesSchema>
	export type ValueInternal = z.output<typeof valuesSchema>

	export const fileInfoSchema = Shared.fileInfoSchema.extend({
		id: Shared.idSchema,
		status: statusSchema,
	})
	export type FileInfo = z.output<typeof fileInfoSchema>

	export const propsSchema = Shared.propsSchema.extend({
		value: valuesSchema.default(() => []),
	})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export module Events {
		export type SetStatus = {
			id: z.infer<typeof Shared.idSchema>
			status: EnumToPrimitiveUnion<typeof Status> | Status
		}
	}

	export module FileItem {
		export const schema = z.object({
			dataTest: Shared.propsSchema.shape.dataTest,
			fileInfo: fileInfoSchema,
			isDisabled: Shared.propsSchema.shape.isDisabled,
		})
		export type Props = z.input<typeof schema>
		export type PropsInternal = z.output<typeof schema>
	}
}

export module KottiFieldFileUploadRemote {
	export enum Status {
		CANCELED = 'CANCELED',
		ERROR = 'ERROR',
		HIDDEN = 'HIDDEN',
		INVALID = 'INVALID',
		NOT_STARTED = 'NOT_STARTED',
		UPLOADED = 'UPLOADED',
		UPLOADED_WITH_ERROR = 'UPLOADED_WITH_ERROR',
		UPLOADING = 'UPLOADING',
	}
	export const statusSchema = createLooseZodEnumSchema(Status)

	export const selectedFileSchema = Shared.selectedFileSchema.extend({
		status: statusSchema,
	})
	export type SelectedFile = z.input<typeof selectedFileSchema>

	export const preUploadedFileSchema = Shared.preUploadedFileSchema.extend({
		status: statusSchema.optional(),
	})
	export type PreUploadedFile = z.input<typeof preUploadedFileSchema>

	export const valueSchema = selectedFileSchema.or(preUploadedFileSchema)
	export const valuesSchema = valueSchema.array()

	export type Value = z.input<typeof valuesSchema>
	export type ValueInternal = z.output<typeof valuesSchema>

	export const fileInfoSchema = Shared.fileInfoSchema.extend({
		id: Shared.idSchema,
		progress: z.number().min(0).max(1).optional(),
		status: statusSchema,
	})
	export type FileInfo = z.output<typeof fileInfoSchema>

	export const actionsSchema = z.object({
		onCancel: z.function().args(Shared.idSchema).returns(z.void()),
		onDelete: z.function().args(Shared.idSchema).returns(z.void()),
		onRetry: z.function().args(Shared.idSchema).returns(z.void()),
		onUpload: z.function().args(Shared.idSchema).returns(z.void()),
	})
	export type Actions = z.output<typeof actionsSchema>

	export const payloadEntrySchema = z.object({
		progress: z.number().min(0).max(1).default(0),
		status: z
			.enum([
				Status.CANCELED,
				Status.ERROR,
				Status.HIDDEN,
				Status.UPLOADED,
				Status.UPLOADING,
			])
			.default(Status.UPLOADING),
	})
	// Record Key is the File Item ID
	export const payloadSchema = z.record(payloadEntrySchema)
	export type Payload = z.output<typeof payloadSchema>

	export const propsSchema = Shared.propsSchema.extend({
		actions: actionsSchema,
		payload: payloadSchema,
		value: valuesSchema.default(() => []),
	})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export module Events {
		export type SetStatus = {
			id: z.infer<typeof Shared.idSchema>
			status: EnumToPrimitiveUnion<typeof Status> | Status
		}
	}

	export module FileItem {
		export const schema = Shared.propsSchema.extend({
			actions: actionsSchema,
			fileInfo: fileInfoSchema,
		})

		export type Props = z.input<typeof schema>
		export type PropsInternal = z.output<typeof schema>
	}

	export module ProgressBar {
		export const schema = payloadEntrySchema
			.pick({
				progress: true,
			})
			.extend({
				isError: z.boolean().default(false),
			})

		export type Props = z.input<typeof schema>
		export type PropsInternal = z.output<typeof schema>
	}
}
