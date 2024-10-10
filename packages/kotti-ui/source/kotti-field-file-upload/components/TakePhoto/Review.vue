<template>
	<KtModal isOpen size="lg">
		<template #header>
			<h2 v-text="translations.label.review" />
		</template>
		<template #body>
			<img v-if="photoUrl" :src="photoUrl" />
		</template>
		<template #footer>
			<KtButton
				class="mr-4"
				:data-test="dataTest ? `${dataTest}.rejectPhoto` : undefined"
				:icon="Yoco.Icon.CAMERA"
				:label="translations.button.rejectPhoto"
				@click.stop="$emit('reject')"
			/>
			<KtButton
				class="mr-4"
				:data-test="dataTest ? `${dataTest}.acceptPhoto` : undefined"
				:icon="Yoco.Icon.PICTURE"
				:label="translations.button.acceptPhoto"
				type="primary"
				@click.stop="$emit('accept')"
			/>
			<KtButton
				:data-test="dataTest ? `${dataTest}.closeReview` : undefined"
				:label="translations.button.cancel"
				@click.stop="$emit('close')"
			/>
		</template>
	</KtModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { KtButton } from '../../../kotti-button'
import { useTranslationNamespace } from '../../../kotti-i18n/hooks'
import { KtModal } from '../../../kotti-modal'
import { makeProps } from '../../../make-props'
import { Shared } from '../../types'

export default defineComponent({
	name: 'ReviewPhoto',
	components: {
		KtButton,
		KtModal,
	},
	props: makeProps(Shared.TakePhoto.reviewSchema),
	emits: ['accept', 'close', 'reject'],
	setup() {
		const translations = useTranslationNamespace('KtFieldFileUpload')

		return {
			translations,
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
img {
	width: 100%;
}
</style>
