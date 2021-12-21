<template>
	<div class="card">
		<div
			v-if="displayImagePostion(KottiCard.ImagePosition.TOP)"
			class="card-image"
		>
			<img class="img-responsive" :src="imgUrl" />
		</div>
		<div class="card-header">
			<slot name="card-header" />
		</div>
		<div
			v-if="displayImagePostion(KottiCard.ImagePosition.MIDDLE)"
			class="card-image"
		>
			<img class="img-responsive" :src="imgUrl" />
		</div>
		<div class="card-body">
			<slot name="card-body" />
		</div>
		<div v-if="$slots['card-footer']" class="card-footer">
			<slot name="card-footer" />
		</div>
		<div
			v-if="displayImagePostion(KottiCard.ImagePosition.BOTTOM)"
			class="card-image"
		>
			<img class="img-responsive" :src="imgUrl" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { makeProps } from '../make-props'

import { KottiCard } from './types'

export default defineComponent<KottiCard.PropsInternal>({
	name: 'KtCard',
	props: makeProps(KottiCard.propsSchema),
	setup(props) {
		return {
			displayImagePostion: (position: KottiCard.ImagePosition) =>
				props.imgUrl && props.imgPosition === position,
			KottiCard,
		}
	},
})
</script>
