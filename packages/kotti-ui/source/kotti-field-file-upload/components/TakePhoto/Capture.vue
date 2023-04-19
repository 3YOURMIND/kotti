<template>
	<KtModal :isOpen="shouldOpenModal" size="lg">
		<div slot="header">
			<h2 v-text="translations.label.capture" />
		</div>
		<div slot="body">
			<video v-show="isReady" ref="videoRef" autoplay muted playsinline />
			<div v-if="isLoading" class="loading lg" />
		</div>
		<div slot="footer">
			<KtButton
				v-if="hasMultipleCameras"
				class="mr-4"
				:data-test="dataTest ? `${dataTest}.nextCamera` : undefined"
				:disabled="!isReady"
				:isLoading="isLoading"
				:label="translations.button.nextCamera"
				@click="onClickNextCamera"
			/>
			<KtButton
				class="mr-4"
				:data-test="dataTest ? `${dataTest}.capture` : undefined"
				:disabled="!isReady"
				:icon="Yoco.Icon.CAMERA"
				:isLoading="isLoading"
				:label="translations.button.takePhoto"
				type="primary"
				@click.stop="onClickCapture"
			/>
			<KtButton
				:data-test="dataTest ? `${dataTest}.cancel` : undefined"
				:label="translations.button.cancel"
				@click.stop="$emit('close')"
			/>
		</div>
	</KtModal>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import {
	computed,
	defineComponent,
	onBeforeMount,
	onBeforeUnmount,
	ref,
} from '@vue/composition-api'
import { isError } from 'lodash'

import { useTranslationNamespace } from '../../../kotti-i18n/hooks'
import { makeProps } from '../../../make-props'
import { ErrorCodes } from '../../constants'
import { Shared } from '../../types'

import {
	generateImageFileAndUrl,
	getConnectedCameras,
	isWebRTCSupported,
	requestCamera,
	stopCameraStream,
} from './utils'

enum State {
	CAPTURING = 'capturing',
	LOADING = 'loading',
	READY = 'ready',
	STOPPED = 'stopped',
}

export default defineComponent({
	name: 'CapturePhoto',
	props: makeProps(Shared.TakePhoto.captureSchema),
	setup(_: Shared.TakePhoto.CaptureProps, { emit }) {
		const translations = useTranslationNamespace('KtFieldFileUpload')

		const cameraIndex = ref<number>(0)
		const cameraList = ref<MediaDeviceInfo[]>([])
		const shouldOpenModal = ref<boolean>(false)
		const state = ref<State>(State.STOPPED)
		const stream = ref<MediaStream | null>(null)
		const videoRef = ref<HTMLVideoElement | null>(null)

		const findCameras = async () => {
			state.value = State.LOADING
			try {
				cameraList.value = await getConnectedCameras()
			} catch (error: unknown) {
				// eslint-disable-next-line no-console
				console.error(error)
				emit('error', isError(error) ? error.name : String(error))
			}
		}
		const startCamera = async () => {
			state.value = State.LOADING
			try {
				if (!videoRef.value) {
					throw new Error('KtFieldFileUpload: unbound HTML video element')
				}
				stream.value = await requestCamera(
					cameraList.value[cameraIndex.value].deviceId,
				)
				videoRef.value.srcObject = stream.value
				state.value = State.READY
			} catch (error: unknown) {
				// eslint-disable-next-line no-console
				console.error(error)
				emit('error', isError(error) ? error.name : String(error))
			}
		}
		const stopCamera = () => {
			state.value = State.STOPPED
			stopCameraStream(stream.value)
			stream.value = null
		}

		onBeforeMount(async () => {
			if (isWebRTCSupported()) {
				await findCameras()
				await startCamera()
				shouldOpenModal.value = true
			} else emit('error', ErrorCodes.NotSupportedError)
		})

		onBeforeUnmount(() => stopCamera())

		return {
			hasMultipleCameras: computed(() => cameraList.value.length > 1),
			isLoading: computed(() => state.value === State.LOADING),
			isReady: computed(() => state.value === State.READY),
			onClickCapture: async () => {
				state.value = State.CAPTURING
				try {
					const canvas = document.createElement('canvas')
					const context = canvas.getContext('2d')

					if (!context)
						throw new Error('KtFieldFileUpload: 2d canvas context unavailable')

					if (!videoRef.value)
						throw new Error('KtFieldFileUpload: unbound HTML video element')

					const payload: Shared.TakePhoto.Events.Capture =
						await generateImageFileAndUrl(canvas, context, videoRef.value)

					emit('capture', payload)
				} catch (error: unknown) {
					// eslint-disable-next-line no-console
					console.error(error)
					emit('error', isError(error) ? error.name : String(error))
				}
			},
			onClickNextCamera: async () => {
				cameraIndex.value = (cameraIndex.value + 1) % cameraList.value.length
				stopCamera()
				await startCamera()
			},
			shouldOpenModal,
			translations,
			videoRef,
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
video {
	width: 100%;
}

.loading {
	margin-bottom: var(--unit-3);
}
</style>
