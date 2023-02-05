import { yocoIconSchema } from '@3yourmind/yoco'
import { Yoco } from '@3yourmind/yoco'
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

export namespace KottiFieldFileUpload {
	export namespace Status {
		export enum Common {
			INVALID = 'INVALID',
			NOT_STARTED = 'NOT_STARTED',
			UPLOADED = 'UPLOADED',
			UPLOADED_WITH_ERROR = 'UPLOADED_WITH_ERROR',
		}
		export const commonSchema = z.nativeEnum(Common)

		export enum NonRemote {
			READY_TO_UPLOAD = 'READY_TO_UPLOAD',
		}
		export const nonRemoteSchema = z.nativeEnum(NonRemote)

		export enum Remote {
			CANCELED = 'CANCELED',
			ERROR = 'ERROR',
			UPLOADING = 'UPLOADING',
		}
		export const remoteSchema = z.nativeEnum(Remote)

		export const schema = commonSchema.or(nonRemoteSchema).or(remoteSchema)
		export type All = z.output<typeof schema>
	}

	export enum Validation {
		INVALID_EXTENSION = 'INVALID_EXTENSION',
		MAX_SIZE_EXCEEDED = 'MAX_SIZE_EXCEEDED',
		SUCCESS = 'SUCCESS',
	}
	export const validationSchema = z.nativeEnum(Validation)

	export const valueSchema = z
		.object({
			file: z.custom<File>(),
			id: z.string().uuid(),
			status: Status.schema,
		})
		.or(
			z.object({
				downloadUrl: z.string().optional(),
				id: z
					.string()
					.uuid()
					.optional()
					.default(() => uuidv4()),
				name: z.string(),
				size: z.number().int().min(0),
				status: Status.schema.optional().default(Status.Common.UPLOADED),
				viewUrl: z.string().optional(),
			}),
		)
	export const valuesSchema = valueSchema.array()
	export type Value = z.input<typeof valuesSchema>
	export type ValueInternal = z.output<typeof valuesSchema>

	export const fileInfoSchema = z.object({
		downloadUrl: z.string().optional(),
		id: z.string().uuid(),
		name: z.string(),
		progress: z.number().min(0).max(1).optional(),
		size: z.number().int().min(0),
		status: Status.schema,
		validation: validationSchema,
		viewUrl: z.string().optional(),
	})
	export type FileInfo = z.output<typeof fileInfoSchema>

	export namespace Remote {
		export const actionsSchema = z.object({
			onCancel: z.function().args(z.string().uuid()).returns(z.void()),
			onDelete: z.function().args(z.string().uuid()).returns(z.void()),
			onRetry: z.function().args(z.string().uuid()).returns(z.void()),
			onUpload: z.function().args(z.string().uuid()).returns(z.void()),
		})
		export type Actions = z.output<typeof actionsSchema>

		export const payloadEntrySchema = z.object({
			progress: z.number().min(0).max(1).default(0),
			status: z
				.enum([
					Status.Common.UPLOADED,
					Status.Remote.CANCELED,
					Status.Remote.ERROR,
					Status.Remote.UPLOADING,
				])
				.default(Status.Remote.UPLOADING),
		})
		export const payloadSchema = z.record(payloadEntrySchema)
		export type Payload = z.output<typeof payloadSchema>

		export const uploadSchema = z.object({
			actions: actionsSchema,
			payload: payloadSchema,
		})
		export type Upload = z.output<typeof uploadSchema>
	}

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
			extensions: z
				.string()
				.nonempty()
				.array()
				.default(() => []),
			externalUrl: z.string().nullable().default(null),
			icon: yocoIconSchema.default(Yoco.Icon.CLOUD_UPLOAD),
			maxFileSize: z.number().int().min(0).default(Number.MAX_SAFE_INTEGER),
			remoteUpload: Remote.uploadSchema.nullable().default(null),
			value: valuesSchema.default(() => []),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export namespace Events {
		export type AddFiles = KottiFieldFileUpload.ValueInternal

		export type RemoveFile = string

		export type SetStatus = {
			id: string
			status: Status.All
		}
	}

	export namespace ActionButton {
		export const schema = propsSchema
			.pick({
				isDisabled: true,
			})
			.extend({
				icon: yocoIconSchema,
			})
		export type Props = z.output<typeof schema>
	}

	export namespace DropArea {
		export const schema = propsSchema.pick({
			allowMultiple: true,
			collapseExtensionsAfter: true,
			dataTest: true,
			extensions: true,
			externalUrl: true,
			icon: true,
			isDisabled: true,
			maxFileSize: true,
			tabIndex: true,
		})
		export type Props = z.output<typeof schema>
	}

	export namespace FileItem {
		export const schema = propsSchema
			.pick({
				dataTest: true,
				extensions: true,
				isDisabled: true,
				maxFileSize: true,
			})
			.extend({
				fileInfo: fileInfoSchema,
				remoteActions: Remote.actionsSchema.nullable().default(null),
			})
		export type Props = z.output<typeof schema>
	}

	export namespace ProgressBar {
		export const schema = Remote.payloadEntrySchema
			.pick({
				progress: true,
			})
			.extend({
				isError: z.boolean().default(false),
			})
		export type Props = z.output<typeof schema>
	}

	export namespace TakePhoto {
		export const schema = propsSchema.pick({
			dataTest: true,
			isDisabled: true,
		})
		export type Props = z.output<typeof schema>

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
			review: string
			unknown: string
		}
		statusMsg: Record<Status.All, string>
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
