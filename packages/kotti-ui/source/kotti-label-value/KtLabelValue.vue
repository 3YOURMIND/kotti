<template>
	<div :class="wrapperClasses">
		<label :class="labelClasses" v-text="label" />
		<div :class="valueClasses">
			<slot>
				{{ value }}
			</slot>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { KottiLabelValue } from './types'

export default defineComponent<KottiLabelValue.PropsInternal>({
	name: 'KtLabelValue',
	props: {
		emphasisSize: { default: KottiLabelValue.EmphasisSize.NONE, type: String },
		emphasisStyle: {
			default: KottiLabelValue.EmphasisStyle.VALUE,
			type: String,
		},
		isHorizontal: { default: false, type: Boolean },
		label: { required: true, type: String },
		value: { default: null, type: [String, Number] },
	},
	setup(props) {
		return {
			wrapperClasses: computed(() => ({
				'kt-label-value': true,
				'kt-label-value--is-horizontal': props.isHorizontal,
			})),
			labelClasses: computed(() => ({
				'kt-label-value__label': true,
				[`kt-label-value__label--is-emphasized-${props.emphasisSize}`]:
					props.emphasisSize !== KottiLabelValue.EmphasisSize.NONE &&
					props.emphasisStyle === KottiLabelValue.EmphasisStyle.FULL,
			})),
			valueClasses: computed(() => ({
				'kt-label-value__value': true,
				[`kt-label-value__value--is-emphasized-${props.emphasisSize}`]:
					props.emphasisSize !== KottiLabelValue.EmphasisSize.NONE,
			})),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-label-value {
	position: relative;
	color: var(--gray-01);

	&--is-horizontal {
		display: flex;
		justify-content: space-between;

		.kt-label-value__label {
			margin-right: 1rem;
		}

		.kt-label-value__value {
			text-align: right;
		}
	}

	&__label {
		font-size: var(--font-size-small);
		font-weight: 700;
		line-height: 1rem;
		color: var(--text-02);
		&--is-emphasized {
			&-md {
				font-size: var(--font-size-medium);
				line-height: 1.1rem;
			}

			&-lg {
				font-size: var(--font-size-large);
				line-height: 1.2rem;
			}
		}
	}

	&__value {
		font-size: var(--font-size-medium);
		font-weight: 400;
		hyphens: auto;
		line-height: 1rem;

		&--is-emphasized {
			&-md {
				font-size: 0.9rem;
				font-weight: 700;
				line-height: 1.2rem;
			}

			&-lg {
				font-size: 1.2rem;
				font-weight: 700;
				line-height: 1.6rem;
			}
		}
	}
}

@supports not (hyphens: auto) {
	.kt-label-value__value {
		word-break: break-all;
	}
}
</style>
