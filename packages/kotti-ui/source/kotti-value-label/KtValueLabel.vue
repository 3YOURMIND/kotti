<template>
	<div :class="rootClasses" :data-test="dataTest">
		<template v-if="isLoading">
			<div
				v-if="showHeader || $slots.helpText"
				class="kt-value-label-loading__header skeleton rectangle md"
			/>
			<div class="kt-value-label-loading__value skeleton rectangle lg" />
		</template>
		<template v-else>
			<div v-if="showHeader || $slots.helpText" class="kt-value-label__header">
				<label v-if="hasLabel" class="kt-value-label__label" v-text="label" />
				<div
					v-if="hasHelpText || $slots.helpText"
					class="kt-value-label__help-text"
				>
					<FieldHelpText :helpText="helpText" :helpTextSlot="$slots.helpText" />
				</div>
			</div>
			<div
				v-if="helpDescription"
				class="kt-value-label__help-description"
				v-text="helpDescription"
			/>
			<div class="kt-value-label__value">
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
		</template>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { Dashes } from '@metatypes/typography'
import { computed, defineComponent } from 'vue'

import FieldHelpText from '../kotti-field/components/FieldHelpText.vue'
import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'

import { KottiValueLabel } from './types'

export default defineComponent({
	name: 'KtValueLabel',
	components: { FieldHelpText },
	props: makeProps(KottiValueLabel.propsSchema),
	setup(props) {
		const translations = useTranslationNamespace('KtValueLabel')

		const hasHelpText = computed(() => props.helpText !== null)
		const hasLabel = computed(() => props.label !== null)
		const validationType = computed(() => props.validation?.type ?? null)

		return {
			hasHelpText,
			hasLabel,
			notSetLabel: computed(() => translations.value.notSet),
			rootClasses: computed(() => {
				const classes = ['kt-value-label']
				if (validationType.value !== null)
					classes.push(`kt-value-label--is-validation-${validationType.value}`)

				return classes
			}),
			showHeader: computed(() => hasLabel.value || hasHelpText.value),
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

	&__header {
		display: flex;
		font-size: 0.9em;

		> :not(:first-child) {
			margin-left: 0.2rem;
		}
	}

	&__help-text {
		display: flex;
		align-items: center;
		font-size: 1.4em;
		color: var(--icon-02);
		cursor: pointer;
	}

	&__label {
		font-weight: 500;
		color: var(--text-02);
	}

	&__help-description {
		color: var(--text-03);
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

.kt-value-label-loading {
	&__header {
		max-width: 200px;
		height: var(--unit-5);
	}

	&__value {
		height: var(--unit-10);
	}
}

@supports not (hyphens: auto) {
	.kt-value-label {
		word-break: break-all;
	}
}
</style>
