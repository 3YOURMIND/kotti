<template lang="md">
# Form

<ClientOnly>
	<KtForm v-model="formData" :hideValidation="hideValidation" :validators="validators">
		<KtFieldText formKey="firstName" :helpText='`Help for ${formData.firstName}`' label="First Name"/>
		<KtFieldText formKey="lastName" helpText="help for lastName" label="Last Name" />
		<KtFieldText formKey="username" helpText="help for username" label="Username" isOptional />
		<br/>
		<br/>
		<KtFieldText formKey="lastName" validatorKey="alwaysNeutral" />
		<br/>
		<KtFieldText formKey="lastName" label="Field That Always Errors" validatorKey="alwaysError" />
		<br/>
		<KtFieldText formKey="lastName" label="Field That Always Succeeds" validatorKey="alwaysSuccess" />
		<br/>
		<KtFieldText formKey="lastName" label="Field That Always Warns" validatorKey="alwaysWarning" />
	</KtForm>
	<br/>
	<!-- FIXME: Use new Checkbox once it’s implemented -->
	<input type="checkbox" v-model="hideValidation" /> Hide Validation
</ClientOnly>
</template>

<script lang="ts">
import { KottiField } from '../../../packages/next/kotti-field/types'

export default {
	name: 'KtFormDoc',
	data() {
		const validators: Record<string, KottiField.Validation.Function> = {
			alwaysError: () => ({ type: 'error', text: 'Always Error!' }),
			alwaysNeutral: () => ({ type: null }),
			alwaysSuccess: () => ({ type: 'success', text: 'Always Success!' }),
			alwaysWarning: () => ({ type: 'warning', text: 'Always Warning!' }),
			username: (value: string | null) => {
				if (value === null) return { type: null }

				// eslint-disable-next-line no-magic-numbers
				if (value.length < 3)
					return {
						type: 'error',
						text: 'Your Username is too short',
					}

				// eslint-disable-next-line no-magic-numbers
				if (value.length < 5)
					return { type: 'warning', text: 'Your username is already taken' }

				return { type: 'success', text: 'Your username is available' }
			},
		}

		return {
			formData: {
				firstName: 'John',
				lastName: 'Smith',
				username: null,
			},
			hideValidation: false,
			validators,
		}
	},
}
</script>
