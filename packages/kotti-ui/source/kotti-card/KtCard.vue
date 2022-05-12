<template>
	<div class="kt-card">
		<div v-if="imgUrl" :class="imageContainerClass">
			<img class="kt-card__image-row__image" :src="imgUrl" />
		</div>
		<div class="kt-card__header">
			<slot name="card-header" />
		</div>
		<div class="kt-card__body">
			<slot name="card-body" />
		</div>
		<div v-if="$slots['card-footer']" :class="footerClass">
			<slot name="kt-card-footer" />
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
			imageContainerClass: computed(() => ({
				'kt-card__image-row': true,
				'kt-card__image-row--is-bottom':
					props.imgPosition === KottiCard.ImagePosition.BOTTOM,
				'kt-card__image-row--is-middle':
					props.imgPosition === KottiCard.ImagePosition.MIDDLE,
				'kt-card__image-row--is-top':
					props.imgPosition === KottiCard.ImagePosition.TOP,
			})),
			footerClass: computed(() => ({
				'kt-card__footer': true,
				'kt-card__footer--is-last':
					props.imgUrl && props.imgPosition !== KottiCard.ImagePosition.BOTTOM,
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
	word-break: break-all;
	background: var(--ui-background);
	border: var(--unit-q) solid var(--ui-02);
	border-radius: var(--border-radius);

	&__header {
		order: 2;

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

	&__body {
		order: 4;
	}

	&__footer {
		order: 5;
		text-align: right;
	}

	&__header,
	&__body,
	&__footer {
		padding: var(--unit-4);
		padding-bottom: 0;

		&--is-last {
			padding-bottom: var(--unit-4);
		}
	}

	&__image-row {
		padding-top: var(--unit-4);

		&__image {
			display: block;
			max-width: 100%;
			height: auto;
		}

		&--is-top {
			order: 1;
			padding-top: 0;

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

			.kt-card__image-row__image {
				border-bottom-right-radius: var(--border-radius);
				border-bottom-left-radius: var(--border-radius);
			}
		}
	}
}
</style>
