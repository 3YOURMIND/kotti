<template>
	<KtModal isOpen size="lg">
		<div slot="header">
			<h2 v-text="translations.label.error" />
		</div>
		<div slot="body">
			<div v-if="error" v-text="errorText" />
		</div>
		<div slot="footer">
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
		</div>
	</KtModal>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { useTranslationNamespace } from '../../../kotti-i18n/hooks'
import { makeProps } from '../../../make-props'
import { ErrorCodes } from '../../constants'
import { Shared } from '../../types'

export default defineComponent({
	name: 'ErrorViewer',
	props: makeProps(Shared.TakePhoto.errorSchema),
	setup(props) {
		const translations = useTranslationNamespace('KtFieldFileUpload')

		const errors = computed<Record<string, string>>(() => ({
			[ErrorCodes.NOT_ALLOWED_ERROR]: translations.value.error.notAllowed,
			[ErrorCodes.NOT_FOUND_ERROR]: translations.value.error.notFound,
			[ErrorCodes.NOT_SUPPORTED_ERROR]: translations.value.error.notSupported,
			default: `${translations.value.label.unknown}: ${String(props.error)}`,
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
