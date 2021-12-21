<template>
	<div class="card">
		<div
			v-if="displayImagePostion(KottiCard.ImagePosition.TOP)"
			class="card__image"
		>
			<img class="img-responsive" :src="imgUrl" />
		</div>
		<div class="card__header">
			<slot name="card-header" />
		</div>
		<div
			v-if="displayImagePostion(KottiCard.ImagePosition.MIDDLE)"
			class="card-image"
		>
			<img class="img-responsive" :src="imgUrl" />
		</div>
		<div class="card__body">
			<slot name="card-body" />
		</div>
		<div v-if="$slots['card-footer']" class="card__footer">
			<slot name="card-footer" />
		</div>
		<div
			v-if="displayImagePostion(KottiCard.ImagePosition.BOTTOM)"
			class="card__image"
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

<style lang="scss" scoped>
// Cards
.card {
	display: flex;
	flex-direction: column;
	background: var(--white);
	border: var(--unit-q) solid var(--gray-20);
	border-radius: var(--border-radius);

	&__header {
		h1,
		h2,
		h3,
		h4,
		h5,
		h6 {
			margin-top: 0;
			margin-bottom: 0;
		}
	}

	&__footer {
		text-align: right;
	}

	&__header,
	&__body,
	&__footer {
		padding: var(--unit-4);
		padding-bottom: 0;

		&:last-child {
			padding-bottom: var(--unit-4);
		}
	}

	&__image {
		padding-top: var(--unit-4);

		&:first-child {
			padding-top: 0;

			img {
				border-top-left-radius: var(--border-radius);
				border-top-right-radius: var(--border-radius);
			}
		}

		&:last-child img {
			border-bottom-right-radius: var(--border-radius);
			border-bottom-left-radius: var(--border-radius);
		}
	}
}
</style>
