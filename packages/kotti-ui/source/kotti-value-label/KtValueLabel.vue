<template>
	<div :class="rootClasses" :data-test="dataTest">
		<KtLabel
			v-show="showHeader"
			:helpDescription="helpDescription"
			:helpText="helpText"
			:helpTextSlot="$slots.helpText"
			:label="label"
		/>
		<div v-if="isLoading" class="kt-value-label__loading skeleton rectangle" />
		<div v-else class="kt-value-label__value">
			<i v-if="isUnset" v-text="notSetLabel" />
			<slot v-else-if="$slots.default" />
			<span v-else v-text="valueToRender" />
		</div>
		<div
			v-if="!isLoading && validationText !== null"
			class="kt-value-label__validation-text"
		>
			<i class="yoco" v-text="validationTextIcon" />
			{{ validationText }}
		</div>
	</div>
</template>

<script lang="ts">
import { Dashes } from '@metatypes/typography'
import { computed, defineComponent } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { KtLabel } from '../kotti-label'
import { makeProps } from '../make-props'

import { KottiValueLabel } from './types'

export default defineComponent({
	name: 'KtValueLabel',
	components: { KtLabel },
	props: makeProps(KottiValueLabel.propsSchema),
	setup(props) {
		const translations = useTranslationNamespace('KtValueLabel')

		const hasHelpText = computed(() => props.helpText !== null)
		const hasLabel = computed(() => props.label !== null)
		const validationType = computed(() => props.validation?.type ?? null)

		return {
			notSetLabel: computed(() => translations.value.notSet),
			rootClasses: computed(() => {
				const classes = ['kt-value-label']
				if (validationType.value !== null)
					classes.push(`kt-value-label--is-validation-${validationType.value}`)

				return classes
			}),
			showHeader: computed(
				() =>
					hasLabel.value || hasHelpText.value || props.helpDescription !== null,
			),
			validationText: computed(() =>
				props.validation !== null ? props.validation.text : null,
			),
			validationTextIcon: computed(() =>
				validationType.value === null
					? null
					: {
							error: Yoco.Icon.CIRCLE_CROSS,
							success: Yoco.Icon.CIRCLE_CHECK,
							warning: Yoco.Icon.CIRCLE_ATTENTION,
						}[validationType.value],
			),
			valueToRender: computed(() => props.value ?? Dashes.EmDash),
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../kotti-field/mixins';

.kt-value-label {
	hyphens: auto;

	@include validations using ($type) {
		/* stylelint-disable */
		.kt-value-label__validation-text {
			color: var(--support-#{$type});
		}
		/* stylelint-enable */
	}

	> *:not(:last-child) {
		margin-bottom: var(--unit-1);
	}

	&__loading {
		height: 1.1rem;
	}

	&__validation-text {
		display: flex;
		align-items: center;
		color: var(--text-03);

		> i {
			margin-right: var(--unit-h);
		}
	}

	&__value {
		font-size: var(--font-size-medium);
		font-weight: 400;
		line-height: 1.6;
		color: var(--text-01);

		i,
		span {
			display: inline-block;
		}
	}
}

@supports not (hyphens: auto) {
	.kt-value-label {
		word-break: break-all;
	}
}
</style>
