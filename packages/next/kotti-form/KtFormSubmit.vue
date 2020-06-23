<template>
	<div>
		<!-- TODO: implement popover -->
		<div v-if="showPopup" class="kt-form-submit__popup">
			<h4
				class="kt-form-submit__popup__title"
				v-text="'Form Submission Not Allowed:'"
			/>

			<div
				v-if="errors.length"
				class="kt-form-submit__popup__section kt-form-submit__popup__section--error"
			>
				<h5 v-text="'Errors'" />
				<ul>
					<li v-for="(error, index) in errors" :key="index">
						<i class="yoco" v-text="'circle_cross'" />
						<span v-text="error.text" />
					</li>
				</ul>
			</div>

			<div
				v-if="warnings.length"
				class="kt-form-submit__popup__section kt-form-submit__popup__section--warning"
			>
				<h5 v-text="'Warnings'" />
				<ul>
					<li v-for="(warning, index) in warnings" :key="index">
						<i class="yoco" v-text="'circle_attention'" />
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
import { defineComponent, inject, computed } from '@vue/composition-api'

import { KT_FORM_SUBMIT_CONTEXT } from './constants'
import { KtFormErrors } from './errors'
import { KottiForm } from './types'

export default defineComponent({
	name: 'KtFormSubmit',
	props: {
		label: { default: 'Submit', type: String },
	},
	setup() {
		const context = inject<KottiForm.SubmitContext | null>(
			KT_FORM_SUBMIT_CONTEXT,
			null,
		)

		if (context === null) throw new KtFormErrors.InvalidSubmitOutsideContext()

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
			warnings,
		}
	},
})
</script>

<style lang="scss">
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
