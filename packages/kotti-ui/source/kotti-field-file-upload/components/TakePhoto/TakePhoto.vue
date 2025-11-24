<template>
	<div>
		<KtButton
			:data-test="localDataTest"
			:disabled="isDisabled"
			:label="translations.button.takePhoto"
			:tabindex="tabIndex"
			@click.stop="state = 'capture'"
		/>
		<CapturePhoto
			v-if="state === 'capture'"
			:dataTest="localDataTest"
			@capture="onCapturePhoto"
			@close="onClose"
			@error="onError"
		/>
		<ReviewPhoto
			v-else-if="state === 'review'"
			:dataTest="localDataTest"
			:photoUrl="photoUrl"
			@accept="onAcceptPhoto"
			@close="onClose"
			@reject="onRejectPhoto"
		/>
		<Error
			v-else-if="state === 'error'"
			:dataTest="localDataTest"
			:error="error"
			@close="onClose"
			@retry="onErrorRetry"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import { KtButton } from '../../../kotti-button'
import { useTranslationNamespace } from '../../../kotti-i18n/hooks'
import { makeProps } from '../../../make-props'
import { Shared } from '../../types'

import CapturePhoto from './Capture.vue'
import Error from './Error.vue'
import ReviewPhoto from './Review.vue'

type State = 'capture' | 'closed' | 'error' | 'review'

export default defineComponent({
	name: 'TakePhoto',
	components: {
		CapturePhoto,
		Error,
		KtButton,
		ReviewPhoto,
	},
	props: makeProps(Shared.TakePhoto.schema),
	emits: ['addFiles'],
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtFieldFileUpload')

		const error = ref<string | null>(null)
		const file = ref<File | null>(null)
		const photoUrl = ref<string | null>(null)
		const state = ref<State>('closed')

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
			onAcceptPhoto: () => {
				if (!file.value) return
				const payload: Shared.Events.AddFiles = [file.value]
				emit('addFiles', payload)
				reset()
				state.value = 'closed'
			},
			onCapturePhoto: (payload: Shared.TakePhoto.Events.Capture) => {
				reset()
				file.value = payload.file
				photoUrl.value = payload.photoUrl
				state.value = 'review'
			},
			onClose: () => {
				reset()
				state.value = 'closed'
			},
			onError: (err: Shared.TakePhoto.Events.Error) => {
				reset()
				error.value = err
				state.value = 'error'
			},
			onErrorRetry: () => {
				reset()
				state.value = 'capture'
			},
			onRejectPhoto: () => {
				reset()
				state.value = 'capture'
			},
			photoUrl,
			state,
			translations,
		}
	},
})
</script>
