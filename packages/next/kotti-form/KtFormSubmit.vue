<template>
	<div>
		<!-- TODO: implement popover -->
		<div
			:style="{
				border: '1px solid #aaa',
				borderRadius: '8px',
				padding: '8px',
			}"
		>
			Cannot submit form as there are some errors:
			<ul>
				<li
					v-for="(error, index) in validationSummary.errors"
					:key="index"
					v-text="error.text"
				/>
			</ul>
			Cannot submit form as there are some warnings:
			<ul>
				<li
					v-for="(warning, index) in validationSummary.warnings"
					:key="index"
					v-text="warning.text"
				/>
			</ul>
		</div>
		<button type="submit" :disabled="!isValid" v-text="label" />
	</div>
</template>

<script lang="ts">
import { defineComponent, inject } from '@vue/composition-api'

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

		return {
			isValid: context.isValid,
			validationSummary: context.validationSummary,
		}
	},
})
</script>
