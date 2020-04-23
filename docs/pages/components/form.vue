<template lang="md">
# Form

<ClientOnly>
	<h1>KtForm Settings</h1>
	<div :style="{
		border: '1px solid #aaa',
		borderRadius: '4px',
		display: 'flex',
		padding: '16px',
		margin: '16px 0'
	}">
		<div><input type="checkbox" v-model="hideValidation" /> Hide Validation</div>
		<div :style="{ marginLeft: '16px' }"><input type="checkbox" v-model="isLoading" /> Is Loading</div>
	</div>
	<h1>KtForm</h1>
	<KtForm v-model="formData" v-bind="{ hideValidation, isLoading, validators }">
		<KtFieldText formKey="firstName" :helpText="`Help for ${formData.firstName}`" label="First Name"/>
		<KtFieldText formKey="lastName" helpText="help for lastName" label="Last Name" />
		<br />
		<h2>Validation Example</h2>
		<KtFieldText formKey="lastName" validatorKey="alwaysNeutral" />
		<KtFieldText formKey="lastName" label="Field That Always Errors" validatorKey="alwaysError" />
		<KtFieldText formKey="lastName" label="Field That Always Succeeds" validatorKey="alwaysSuccess" />
		<KtFieldText formKey="lastName" label="Field That Always Warns" validatorKey="alwaysWarning" />
		<KtFieldText formKey="username" helpText="help for username" label="Username" isOptional />
		<br />
		<h2>KtFormControllerList</h2>
		<ul>
			<KtFormControllerList formKey="users">
				<li>
					<KtFieldText formKey="firstName" label="I’m An Item In users" validatorKey="username"/>
				</li>
			</KtFormControllerList>
		</ul>
		<br />
		<h2>KtFormControllerObject</h2>
		<KtFormControllerObject formKey="user">
			<KtFieldText formKey="lastName" label="I’m a Field In user" validatorKey="username"/>
		</KtFormControllerObject>
	</KtForm>
	<br />
	<h2>formData</h2>
	<pre v-text="JSON.stringify(formData, null, '\t')" />
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
				users: [{ firstName: null }, { firstName: 'asdfhjkl' }],
				user: { lastName: 'pepe' },
				username: null,
			},
			hideValidation: false,
			isLoading: false,
			validators,
		}
	},
}
</script>
