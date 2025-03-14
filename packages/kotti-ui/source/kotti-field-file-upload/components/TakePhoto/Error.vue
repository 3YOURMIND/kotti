<template>
	<KtModal isOpen size="lg">
		<template #header>
			<h2 v-text="translations.label.error" />
		</template>
		<template #body>
			<div v-if="error" v-text="errorText" />
		</template>
		<template #footer>
			<KtButton
				class="mr-4"
				:data-test="dataTest ? `${dataTest}.retakePhoto` : undefined"
				:label="translations.button.retry"
				type="primary"
				@click.stop="$emit('retry')"
			/>
			<KtButton
				:data-test="dataTest ? `${dataTest}.closeError` : undefined"
				:label="translations.button.cancel"
				@click.stop="$emit('close')"
			/>
		</template>
	</KtModal>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { KtButton } from '../../../kotti-button'
import { useTranslationNamespace } from '../../../kotti-i18n/hooks'
import { KtModal } from '../../../kotti-modal'
import { makeProps } from '../../../make-props'
import { ErrorCodes } from '../../constants'
import { Shared } from '../../types'

export default defineComponent({
	name: 'ErrorViewer',
	components: {
		KtButton,
		KtModal,
	},
	props: makeProps(Shared.TakePhoto.errorSchema),
	emits: ['close', 'retry'],
	setup(props) {
		const translations = useTranslationNamespace('KtFieldFileUpload')

		const errors = computed<Record<string, string>>(() => ({
			default: `${translations.value.label.unknown}: ${String(props.error)}`,
			[ErrorCodes.NOT_ALLOWED_ERROR]: translations.value.error.notAllowed,
			[ErrorCodes.NOT_FOUND_ERROR]: translations.value.error.notFound,
			[ErrorCodes.NOT_SUPPORTED_ERROR]: translations.value.error.notSupported,
		}))

		return {
			errorText: computed(() =>
				props.error && props.error in errors.value
					? errors.value[props.error]
					: errors.value.default,
			),
			translations,
		}
	},
})
</script>
