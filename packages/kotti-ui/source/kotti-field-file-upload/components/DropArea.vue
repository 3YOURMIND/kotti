<template>
	<div
		:class="classes"
		:data-test="dataTest ? `${dataTest}.dropArea` : undefined"
		:tabIndex="_tabIndex"
		@dragleave.stop.prevent="onDragLeave"
		@dragover.stop.prevent="onDragOver"
		@drop.stop.prevent="onDrop"
		@keydown.enter.stop.prevent="uploadInputRef.click()"
		@keydown.space.stop.prevent="uploadInputRef.click()"
		@mouseenter.stop.prevent="isHovering = true"
		@mouseleave.stop.prevent="isHovering = false"
	>
		<div class="kt-field-file-upload-drop-area__description">
			<i v-if="icon" class="yoco" v-text="icon" />
			<a v-text="translations.text.clickToUpload" />
			{{ translations.text.dragAndDrop }}
		</div>
		<div
			v-if="showInformation"
			class="kt-field-file-upload-drop-area__information"
		>
			{{ informationText }}
			<a
				v-if="externalUrl"
				:href="externalUrl"
				rel="noopener noreferrer"
				target="_blank"
				@click.stop
				v-text="translations.text.learnMore"
			/>
		</div>
		<input
			v-show="false"
			ref="uploadInputRef"
			:accept="accept"
			:data-test="dataTest ? `${dataTest}.input` : undefined"
			:disabled="isDisabled"
			:multiple="allowMultiple"
			type="file"
			@change="onSelect"
		/>
		<div
			v-if="$slots.footer"
			class="kt-field-file-upload-drop-area__footer-slot"
			@keydown.enter.stop
			@keydown.space.stop
			@mouseenter.prevent.stop="isHovering = false"
			@mouseleave.prevent.stop="isHovering = true"
		>
			<slot name="footer" />
		</div>
		<span
			v-if="!allowMultiple"
			v-show="isError"
			class="kt-field-file-upload-drop-area__error"
			v-text="translations.error.multipleNotAllowed"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { makeProps } from '../../make-props'
import { formatExtensions, formatFileSize } from '../formatters'
import { Shared } from '../types'
import { buildAcceptString } from '../utils'
import { isSelectingMultipleFilesWhenNotAllowed } from '../validators'

export default defineComponent({
	name: 'DropArea',
	props: makeProps(Shared.DropArea.schema),
	setup(props: Shared.DropArea.Props, { emit }) {
		const translations = useTranslationNamespace('KtFieldFileUpload')

		const isDragging = ref<boolean>(false)
		const isError = ref<boolean>(false)
		const isHovering = ref<boolean>(false)
		const uploadInputRef = ref<HTMLInputElement | null>(null)

		const informationText = computed(() =>
			[
				formatExtensions(props.extensions, props.collapseExtensionsAfter),
				props.maxFileSize !== Number.MAX_SAFE_INTEGER
					? `(${translations.value.text.max} ${formatFileSize(
							props.maxFileSize,
					  )})`
					: null,
			]
				.filter((str) => str)
				.join(' '),
		)

		const emitFiles = (files: FileList | null) => {
			if (props.isDisabled || !files?.length) return

			if (
				isSelectingMultipleFilesWhenNotAllowed(
					props.allowMultiple,
					files.length,
				)
			)
				return

			const payload: Shared.Events.AddFiles = Array.from(files)
			emit('addFiles', payload)
		}

		return {
			_tabIndex: computed(() => (props.isDisabled ? -1 : props.tabIndex ?? 0)),
			accept: computed(() => buildAcceptString(props.extensions)),
			classes: computed(() => ({
				'kt-field-file-upload-drop-area': true,
				'kt-field-file-upload-drop-area--is-disabled': props.isDisabled,
				'kt-field-file-upload-drop-area--is-error':
					!props.isDisabled && isError.value,
				'kt-field-file-upload-drop-area--is-hover':
					!props.isDisabled &&
					!isError.value &&
					(isDragging.value || isHovering.value),
			})),
			informationText,
			isError,
			isHovering,
			onDragLeave: () => {
				isDragging.value = false
				isError.value = false
			},
			onDragOver: (event: DragEvent) => {
				const items = Array.from(event.dataTransfer?.items ?? [])
				isDragging.value = true
				isError.value = isSelectingMultipleFilesWhenNotAllowed(
					props.allowMultiple,
					items.length,
				)
			},
			onDrop: (event: DragEvent) => {
				isDragging.value = false
				isError.value = false
				emitFiles(event.dataTransfer?.files ?? null)
			},
			onSelect: (event: Event) => {
				const target = event.target as HTMLInputElement
				emitFiles(target.files)
			},
			showInformation: computed(
				() => informationText.value || props.externalUrl,
			),
			translations,
			uploadInputRef,
		}
	},
})
</script>

<style lang="scss" scoped>
$support-error-light: #f0a8a8;

.kt-field-file-upload-drop-area {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding: var(--unit-9) var(--unit-6);
	cursor: pointer;
	background-color: var(--ui-01);
	border: 1px dashed var(--ui-02);
	border-radius: var(--unit-1);

	&:focus:not(&--disabled) {
		border-color: var(--interactive-01-hover);
	}

	&--is-disabled {
		pointer-events: none;
		background-color: var(--ui-background);

		.kt-field-file-upload-drop-area__description a {
			color: var(--text-05);
		}
	}

	&--is-error {
		background-color: rgba($support-error-light, 0.25);
		border-color: var(--support-error-dark);
	}

	&--is-hover {
		background-color: var(--interactive-02-hover);
		border-color: var(--interactive-01-hover);
	}

	&__description {
		font-size: 16px;
		line-height: 20px;
		color: var(--text-02);
		text-align: center;

		i {
			margin-right: var(--unit-1);
			font-size: var(--unit-6);
			color: var(--icon-02);
			vertical-align: bottom;
		}

		a {
			color: var(--interactive-01);
		}
	}

	&__error {
		position: absolute;
		right: var(--unit-2);
		bottom: var(--unit-1);
		left: var(--unit-2);
		font-size: 12px;
		line-height: 20px;
		color: var(--support-error);
		text-align: center;
	}

	&__footer-slot {
		margin-top: var(--unit-4);
	}

	&__information {
		margin-top: calc(var(--unit-1) + var(--unit-h));
		font-size: 14px;
		line-height: 20px;
		color: var(--text-03);
		text-align: center;

		a {
			color: var(--interactive-01);
			cursor: pointer;
		}
	}
}
</style>
