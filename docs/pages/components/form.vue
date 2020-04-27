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
		<div :style="{ marginLeft: '16px' }">
			preventSubmissionOn:
			<br />
			<button @click="preventSubmissionOn = 'error'">error {{preventSubmissionOn === 'error' ? '(selected)': ''}}</button>
			<button @click="preventSubmissionOn = 'warning'">warning {{preventSubmissionOn === 'warning' ? '(selected)': ''}} (default)</button>
			<button @click="preventSubmissionOn = 'NEVER'">NEVER {{preventSubmissionOn === 'NEVER' ? '(selected)': ''}}</button>
		</div>
	</div>
	<h1>KtForm</h1>
	<KtForm v-model="formData" v-bind="{ hideValidation, isLoading, preventSubmissionOn, validators }" @submit="onSubmit">
		<KtFieldText formKey="firstName" placeholder="Klaus" :helpText="`Help for ${formData.firstName}`" label="First Name"/>
		<KtFieldText formKey="lastName" placeholder="Dieter" helpText="help for lastName" label="Last Name" />
		<br />
		<h2>Validation Example</h2>
		<KtFieldText formKey="lastName" validatorKey="alwaysNeutral" prefix="Prefix" hideClear :tabIndex="5" />
		<KtFieldText formKey="lastName" validatorKey="alwaysError" suffix="Suffix" hideClear label="Field That Always Errors" :tabIndex="4" />
		<KtFieldText formKey="lastName" validatorKey="alwaysSuccess" leftIcon="cloud" hideClear label="Field That Always Succeeds" :tabIndex="3" />
		<KtFieldText formKey="lastName" validatorKey="alwaysWarning" rightIcon="location" hideClear label="Field That Always Warns" :tabIndex="2" />
		<KtFieldText formKey="username" prefix="Prefix" suffix="Suffix" leftIcon="comment" rightIcon="calendar" hideClear helpText="help for username" label="Username" isOptional :tabIndex="1" />
		<br />
		<h2>KtFormControllerList</h2>
		<ul>
			<KtFormControllerList formKey="users">
				<template v-slot:default="{ addAfter, addBefore, deleteSelf, index, setValues, values }">
					<li>
						<h3 v-text="`Item ${index}`" />
						<KtFieldText formKey="username" label="Username" validatorKey="username"/>
						<button type="button" @click="deleteSelf">Delete {{ values.username }}</button>
						<button type="button" @click="addBefore({ username: `before ${values.username}` })">Add Before</button>
						<button type="button" @click="addAfter({ username: `after ${values.username}` })">Add After</button>
						<button type="button" @click="setValues({ ...values, username: `replaced ${values.username}` })">Set Values</button>
					</li>
				</template>
			</KtFormControllerList>
			<br/>
			Custom Button: <button type="button" @click="addUser">Add User</button>
		</ul>
		<br />
		<h2>KtFormControllerObject</h2>
		<KtFormControllerObject formKey="user">
			<KtFieldText :classes="{ wrapper: 'custom-wrapper' }" formKey="lastName" label="I’m a Field In user" validatorKey="username"/>
		</KtFormControllerObject>
	</KtForm>
	<br />
	<h2>formData</h2>
	<pre v-text="JSON.stringify(formData, null, '\t')" />
</ClientOnly>
</template>

<script lang="ts">
import { KottiField } from '../../../packages/next/kotti-field/types'
import { KottiForm } from '../../../packages/next/kotti-form/types'

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
				users: [{ username: null }, { username: 'anything' }],
				user: { lastName: 'pepe' },
				username: null,
			},
			hideValidation: false,
			isLoading: false,
			preventSubmissionOn: 'NEVER',
			validators,
		}
	},
	methods: {
		addUser() {
			this.formData = {
				...this.formData,
				users: [...this.formData.users, { username: null }],
			}
		},
		onSubmit(event: KottiForm.Events.Submit) {
			// eslint-disable-next-line no-console
			console.debug('onSubmit', event)
			alert('onSubmit: See Console for Event Details')
		},
	},
}
</script>

<style lang="scss">
.custom-wrapper {
	background-color: rgba(255, 0, 255, 0.2);
}
</style>
