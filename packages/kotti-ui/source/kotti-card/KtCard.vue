<template>
	<div :class="cardClass">
		<div v-if="imgUrl" :class="imageRowClass">
			<img class="kt-card__image-row__image" :src="imgUrl" />
		</div>
		<div v-if="$slots['card-header']" class="kt-card__header">
			<slot name="card-header" />
		</div>
		<div v-if="$slots['card-body']" class="kt-card__body">
			<slot name="card-body" />
		</div>
		<div v-if="$slots['card-footer']" class="kt-card__footer">
			<slot name="card-footer" />
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { makeProps } from '../make-props'

import { KottiCard } from './types'

export default defineComponent<KottiCard.PropsInternal>({
	name: 'KtCard',
	props: makeProps(KottiCard.propsSchema),
	setup(props) {
		return {
			cardClass: computed(() => ({
				'kt-card': true,
				[`kt-card--has-${props.imgPosition}-image`]: props.imgUrl,
			})),
			imageRowClass: computed(() => ({
				'kt-card__image-row': true,
				[`kt-card__image-row--is-${props.imgPosition}`]: props.imgUrl,
			})),
			KottiCard,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-card {
	display: flex;
	flex-direction: column;
	padding: var(--unit-4);
	word-break: break-word;
	background: var(--ui-background);
	border: 1px solid var(--ui-02);
	border-radius: var(--border-radius);

	&--has-top-image {
		padding-top: 0;
	}
	&--has-bottom-image {
		padding-bottom: 0;
	}

	&__header {
		order: 2;
	}

	&__body {
		order: 4;
	}

	&__footer {
		order: 5;
		text-align: right;
	}

	&__image-row {
		&__image {
			display: block;
			max-width: 100%;
		}

		margin: var(--unit-4) calc(-1 * var(--unit-4));

		&--is-top {
			order: 1;
			margin-top: 0;

			.kt-card__image-row__image {
				border-top-left-radius: var(--border-radius);
				border-top-right-radius: var(--border-radius);
			}
		}

		&--is-middle {
			order: 3;
		}

		&--is-bottom {
			order: 6;
			margin-bottom: 0;

			.kt-card__image-row__image {
				border-bottom-right-radius: var(--border-radius);
				border-bottom-left-radius: var(--border-radius);
			}
		}
	}
}
</style>
