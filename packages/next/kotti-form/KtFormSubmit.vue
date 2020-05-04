<template>
	<div>
		<!-- TODO: implement popover -->
		<div
			:style="{
				border: '1px solid #aaa',
				borderRadius: '8px',
				padding: '8px',
			}"
			<div v-if="errors.length">
			Cannot submit form as there are some errors:
				<ul class="submit__validation-popup__errors">
					<li
						v-for="(error, index) in errors"
						:key="index"
						class="submit__validation-popup__errors__item"
					>
				</ul>
			</div>
			<ul>
			<div v-if="warnings.length">
				<ul class="submit__validation-popup__warnings">
					<li
						v-for="(warning, index) in warnings"
						:key="index"
						class="submit__validation-popup__warnings__item"
					>
				</ul>
			</div>
		</div>

		<button
			class="kt-button primary submit__button"
			type="submit"
			:disabled="isDisabled"
		>
			<i v-if="isLoading" class="kt-circle-loading" />
			{{ label }}
		</button>
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
