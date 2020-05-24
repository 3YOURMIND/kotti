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
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: space-between;
		padding: 1em;
		background-color: var(--ui-01);

		> div:not(:last-child) {
			margin-bottom: 1em;
		}

		&__title {
			font-weight: bold;
			color: var(--text-01);
		}

		&__errors,
		&__warnings {
			display: flex;
			flex-direction: column;
			margin: 0;
			list-style: none;

			&__item__icon {
				width: 1em;
				height: 1em;
				padding-right: 0.5em;
				margin: 0;
			}
		}

		&__warnings__item {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			color: var(--support-warning);
		}

		&__errors__item {
			display: flex;
			align-items: center;
			justify-content: flex-start;
			color: var(--support-error);
		}

		&__button {
			display: flex;
		}
	}
}
</style>
