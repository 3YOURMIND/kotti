<template>
	<KtModal isOpen size="lg">
		<div slot="header">
			<h2 v-text="translations.label.review" />
		</div>
		<div slot="body">
			<img v-if="photoUrl" :src="photoUrl" />
		</div>
		<div slot="footer">
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
		</div>
	</KtModal>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { defineComponent } from '@vue/composition-api'

import { useTranslationNamespace } from '../../../kotti-i18n/hooks'
import { makeProps } from '../../../make-props'
import { Shared } from '../../types'

export default defineComponent({
	name: 'ReviewPhoto',
	props: makeProps(Shared.TakePhoto.reviewSchema),
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
