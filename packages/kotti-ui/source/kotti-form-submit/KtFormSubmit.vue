<template>
	<div>
		<!-- TODO: implement popover -->
		<div v-if="showPopup" class="kt-form-submit__popup">
			<h4 class="kt-form-submit__popup__title" v-text="translations.title" />

			<div
				v-if="errors.length"
				class="
					kt-form-submit__popup__section kt-form-submit__popup__section--error
				"
			>
				<h5 v-text="translations.errorsSectionTitle" />
				<ul>
					<li v-for="(error, index) in errors" :key="index">
						<i class="yoco" v-text="Yoco.Icon.CIRCLE_CROSS" />
						<span v-text="error.text" />
					</li>
				</ul>
			</div>

			<div
				v-if="warnings.length"
				class="
					kt-form-submit__popup__section kt-form-submit__popup__section--warning
				"
			>
				<h5 v-text="translations.warningsSectionTitle" />
				<ul>
					<li v-for="(warning, index) in warnings" :key="index">
						<i class="yoco" v-text="Yoco.Icon.CIRCLE_ATTENTION" />
						<span v-text="warning.text" />
					</li>
				</ul>
			</div>
		</div>

		<button
			class="kt-button primary kt-form-submit__button"
			:disabled="isDisabled"
			type="submit"
		>
			<i v-if="isLoading" class="kt-circle-loading" />
			{{ label }}
		</button>
	</div>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { defineComponent, inject, computed } from '@vue/composition-api'

import { KT_FORM_SUBMIT_CONTEXT } from '../kotti-form/constants'
import { KottiForm } from '../kotti-form/types'
import { useTranslationNamespace } from '../kotti-translation/hooks'

import { KtFormSubmitErrors } from './errors'
import { KottiFormSubmit } from './types'

export default defineComponent<KottiFormSubmit.PropsInternal>({
	name: 'KtFormSubmit',
	props: {
		label: { default: 'Submit', type: String },
	},
	setup() {
		const context = inject<KottiForm.SubmitContext | null>(
			KT_FORM_SUBMIT_CONTEXT,
			null,
		)

		if (context === null)
			throw new KtFormSubmitErrors.InvalidSubmitOutsideContext()

		const { isLoading, isValid, validationSummary } = context
		const errors = computed(() => validationSummary.value.errors)
		const warnings = computed(() => validationSummary.value.warnings)

		return {
			errors,
			isDisabled: computed(() => !isValid.value || isLoading.value),
			isLoading,
			showPopup: computed(
				() => errors.value.length > 0 || warnings.value.length > 0,
			),
			translations: useTranslationNamespace('KtFormSubmit'),
			warnings,
			Yoco,
		}
	},
})
</script>

<style lang="scss">
/* FIXME: why isn’t this scoped? */

.kt-form-submit {
	&__button {
		display: flex;
	}

	&__popup {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		padding: 1em;
		background-color: var(--ui-01);

		> *:not(:last-child) {
			margin-bottom: 1em;
		}

		&__section {
			ul {
				display: flex;
				flex-direction: column;
				margin: 0;
				list-style: none;

				li {
					display: flex;
					align-items: center;
					margin: 0.2rem 0;
					line-height: 1;

					i.yoco {
						display: flex;
						align-items: center;
						margin: 0 0.5em 0 0;
					}
				}
			}

			@each $type in 'warning', 'error' {
				&--#{$type} ul {
					color: var(--support-#{$type}); /* stylelint-disable-line */
				}
			}
		}

		&__title,
		h5 {
			font-weight: bold;
			color: var(--text-01);
		}
	}
}
</style>
