<template>
	<div :class="cardClass" tabindex="0" @click.prevent="handleClick">
		<div v-if="imgUrl" :class="imageRowClass">
			<div v-if="isImgLoading" class="skeleton square md" />
			<img v-else class="kt-card__image" :src="imgUrl" />
		</div>
		<div v-if="$slots['card-header']" class="kt-card__header">
			<div v-if="isTextLoading" class="skeleton rectangle md" />
			<slot v-else name="card-header" />
		</div>
		<div v-if="$slots['card-body']" class="kt-card__body">
			<div v-if="isTextLoading" class="skeleton rectangle sm" />
			<slot v-else name="card-body" />
		</div>
		<div v-if="hasActions" class="kt-card__footer">
			<div v-if="hasActions && !isTextLoading">
				<KtButton
					:data-test="secondaryActionDataTest"
					:label="secondaryActionLabel"
					type="text"
					@click.prevent="$emit('clickOnSecondaryButton')"
				/>
				<KtButton
					:data-test="primaryActionDataTest"
					:label="primaryActionLabel"
					type="primary"
					@click.prevent="$emit('clickOnPrimaryButton')"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

import { KtButton } from '../kotti-button'
import { makeProps } from '../make-props'

import { KottiCard } from './types'

export default defineComponent({
	name: 'KtCard',
	components: { KtButton },
	props: makeProps(KottiCard.propsSchema),
	emits: ['click', 'clickOnPrimaryButton', 'clickOnSecondaryButton'],
	setup(props, { emit }) {
		const hasActions = computed(
			() =>
				props.primaryActionLabel != null && props.secondaryActionLabel != null,
		)

		return {
			cardClass: computed(() => ({
				[`kt-card--has-${props.imgPosition}-image`]: props.imgUrl,
				'kt-card': true,
				'kt-card--is-clickable': !hasActions.value,
			})),
			handleClick: () => {
				if (!hasActions.value) emit('click')
			},
			hasActions,
			imageRowClass: computed(() => ({
				[`kt-card__image-row--is-${props.imgPosition}`]: props.imgUrl,
				'kt-card__image-row': true,
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
	border-radius: var(--border-radius);

	&--has-top-image {
		padding-top: 0;
	}

	&--has-bottom-image {
		padding-bottom: 0;
	}

	&--is-clickable {
		border: 1px solid var(--ui-01);

		&:hover {
			cursor: pointer;
			border: 1px solid var(--interactive-01-hover);
		}

		&:active {
			border-color: var(--primary-90);
		}
	}

	.skeleton {
		margin: 0;
	}

	&__header {
		order: 2;

		.skeleton {
			margin: 0 0 var(--unit-2) 0;
		}
	}

	&__body {
		order: 4;
	}

	&__footer {
		order: 5;
		text-align: right;
	}

	&__image-row {
		margin: var(--unit-4) calc(-1 * var(--unit-4));

		&--is-top {
			order: 1;
			margin-top: 0;

			.kt-card__image {
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

			.kt-card__image {
				border-bottom-right-radius: var(--border-radius);
				border-bottom-left-radius: var(--border-radius);
			}
		}
	}

	&__image {
		display: block;
		width: 100%;
	}
}
</style>
