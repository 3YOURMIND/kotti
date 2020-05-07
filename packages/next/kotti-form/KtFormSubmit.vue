<template>
	<div class="submit">
		<!-- TODO: implement popover -->
		<div v-if="showPopup" class="submit__validation-popup">
			<h4
				class="submit__validation-popup__title"
				v-text="'Form Submission Not Allowed:'"
			/>

			<div v-if="errors.length">
				<h5 class="submit__validation-popup__title" v-text="'Errors'" />
				<ul class="submit__validation-popup__errors">
					<li
						v-for="(error, index) in errors"
						:key="index"
						class="submit__validation-popup__errors__item"
					>
						<i :class="validationIconClasses">circle_cross</i>
						{{ error.text }}
					</li>
				</ul>
			</div>

			<div v-if="warnings.length">
				<h5 class="submit__validation-popup__title" v-text="'Warnings'" />
				<ul class="submit__validation-popup__warnings">
					<li
						v-for="(warning, index) in warnings"
						:key="index"
						class="submit__validation-popup__warnings__item"
					>
						<i :class="validationIconClasses">circle_attention</i>
						{{ warning.text }}
					</li>
				</ul>
			</div>
		</div>

		<button
			class="kt-button primary submit__button"
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
		//styles
		const validationIconClasses = [
			'yoco',
			'submit__validation-popup__errors__item__icon',
		]

		return {
			errors,
			isDisabled: computed(() => !isValid.value || isLoading.value),
			isLoading,
			showPopup: computed(
				() => errors.value.length > 0 || warnings.value.length > 0,
			),
			warnings,
			validationIconClasses,
		}
	},
})
</script>

<style lang="scss" scoped>
.submit {
	&__validation-popup {
		background-color: var(--ui-01);
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		padding: 1em;

		> div:not(:last-child) {
			margin-bottom: 1em;
		}

		&__title {
			color: var(--text-01);
			font-weight: bold;
		}

		&__errors,
		&__warnings {
			display: flex;
			flex-direction: column;
			list-style: none;
			margin: 0;

			&__item__icon {
				height: 1em;
				width: 1em;
				margin: 0;
				padding-right: 0.5em;
			}
		}

		&__warnings__item {
			display: flex;
			align-items: center;
			color: var(--support-warning);
			justify-content: flex-start;
		}

		&__errors__item {
			display: flex;
			align-items: center;
			color: var(--support-error);
			justify-content: flex-start;
		}

		&__button {
			display: flex;
		}
	}
}
</style>
