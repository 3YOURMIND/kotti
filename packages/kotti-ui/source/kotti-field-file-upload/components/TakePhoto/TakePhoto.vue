<template>
	<div>
		<KtButton
			:data-test="localDataTest"
			:disabled="isDisabled"
			:label="translations.button.takePhoto"
			:tabindex="tabIndex"
			@click.stop="state = State.CAPTURE"
		/>
		<CapturePhoto
			v-if="state === State.CAPTURE"
			:dataTest="localDataTest"
			@capture="onCapturePhoto"
			@close="onClose"
			@error="onError"
		/>
		<ReviewPhoto
			v-else-if="state === State.REVIEW"
			:dataTest="localDataTest"
			:photoUrl="photoUrl"
			@accept="onAcceptPhoto"
			@close="onClose"
			@reject="onRejectPhoto"
		/>
		<Error
			v-else-if="state === State.ERROR"
			:dataTest="localDataTest"
			:error="error"
			@close="onClose"
			@retry="onErrorRetry"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

import { useTranslationNamespace } from '../../../kotti-i18n/hooks'
import { makeProps } from '../../../make-props'
import { Shared } from '../../types'

import CapturePhoto from './Capture.vue'
import Error from './Error.vue'
import ReviewPhoto from './Review.vue'

enum State {
	CAPTURE = 'capture',
	CLOSED = 'closed',
	ERROR = 'error',
	REVIEW = 'review',
}

export default defineComponent({
	name: 'TakePhoto',
	components: {
		CapturePhoto,
		Error,
		ReviewPhoto,
	},
	props: makeProps(Shared.TakePhoto.schema),
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtFieldFileUpload')

		const error = ref<string | null>(null)
		const file = ref<File | null>(null)
		const photoUrl = ref<string | null>(null)
		const state = ref<State>(State.CLOSED)

		const reset = () => {
			error.value = null
			file.value = null
			photoUrl.value = null
		}

		return {
			error,
			localDataTest: computed(() =>
				props.dataTest ? `${props.dataTest}.takePhoto` : null,
			),
			onAcceptPhoto: async () => {
				if (!file.value) return
				const payload: Shared.Events.AddFiles = [file.value]
				emit('addFiles', payload)
				reset()
				state.value = State.CLOSED
			},
			onCapturePhoto: (payload: Shared.TakePhoto.Events.Capture) => {
				reset()
				file.value = payload.file
				photoUrl.value = payload.photoUrl
				state.value = State.REVIEW
			},
			onClose: () => {
				reset()
				state.value = State.CLOSED
			},
			onError: (err: Shared.TakePhoto.Events.Error) => {
				reset()
				error.value = err
				state.value = State.ERROR
			},
			onErrorRetry: () => {
				reset()
				state.value = State.CAPTURE
			},
			onRejectPhoto: () => {
				reset()
				state.value = State.CAPTURE
			},
			photoUrl,
			state,
			State,
			translations,
		}
	},
})
</script>
