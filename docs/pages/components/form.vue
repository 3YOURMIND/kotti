<template lang="md">
# Form

<ClientOnly>
	<h1>KtForm Settings</h1>
	<div class="wrapper">
		<div><input type="checkbox" v-model="hideValidation" /> Hide Validation</div>
		<div><input type="checkbox" v-model="isLoading" /> Is Loading</div>
		<div class="row">
			Prevent Submission On:
			<button @click="preventSubmissionOn = 'error'" :class="`kt-button ${preventSubmissionOn === 'error'?'primary':'secondary'}`">Error </button>
			<button @click="preventSubmissionOn = 'warning'" :class="`kt-button ${preventSubmissionOn === 'warning'?'primary':'secondary'}`">Warning (default)</button>
			<button @click="preventSubmissionOn = 'NEVER'" :class="`kt-button ${preventSubmissionOn === 'NEVER'?'primary':'secondary'}`">Never</button>
		</div>
	</div>
	<h1>KtForm</h1>
	<KtForm v-model="formData" v-bind="{ hideValidation, isLoading, preventSubmissionOn, validators }" @submit="onSubmit">
		<KtFieldText formKey="firstName" placeholder="Klaus" :helpText="`Help for ${formData.firstName}`" label="First Name"/>
		<KtFieldText formKey="lastName" placeholder="Dieter" helpText="help for lastName" label="Last Name" />
		<br />
		<h2>Validation Example</h2>
		<KtFieldText formKey="lastName" validatorKey="alwaysNeutral" prefix="Prefix" :tabIndex="5" />
		<KtFieldText formKey="lastName" validatorKey="alwaysError" suffix="Suffix" label="Field That Always Errors" :tabIndex="4" />
		<KtFieldText formKey="lastName" validatorKey="alwaysSuccess" leftIcon="cloud" label="Field That Always Succeeds" :tabIndex="3" />
		<KtFieldText formKey="lastName" validatorKey="alwaysWarning" rightIcon="location" hideClear label="Field That Always Warns" :tabIndex="2" />
		<KtFieldText formKey="username" prefix="Prefix" suffix="Suffix" leftIcon="comment" rightIcon="calendar" helpText="help for username" label="Username" isOptional :tabIndex="1" />
		<br />
		<h2>KtFormControllerList</h2>
		<ul>
			<KtFormControllerList formKey="users">
				<template v-slot:default="{ addAfter, addBefore, deleteSelf, index, setValues, values }">
					<li>
						<h3 v-text="`Item ${index}`" />
						<KtFieldText formKey="username" label="Username" validatorKey="username" leftIcon="user"/>
						<div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }"> 
							<button @click="deleteSelf" type="button" class="kt-button danger">Delete "{{ values.username }}"</button>
							<button @click="addBefore({ username: `before Item${index}` })" type="button" class="kt-button secondary">Add Before</button>
							<button @click="addAfter({ username: `after Item${index}` })" type="button" class="kt-button secondary">Add After</button>
							<button @click="setValues({ ...values, username: `replaced Item${index}` })" type="button" class="kt-button seondary">Set Values</button>
						</div>
					</li>
				</template>
			</KtFormControllerList>
			<br/>
			Custom Button: <button @click="addUser" type="button" class="kt-button primary">Add User</button>
		</ul>
		<br />
		<h2>KtFormControllerObject</h2>
		<KtFormControllerObject formKey="user">
			<KtFieldText formKey="lastName" label="I’m a Field In user" validatorKey="username" rightIcon="user"/>
		</KtFormControllerObject>
		<KtFormSubmit />
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
@import '../../../packages/kotti-style/_variables.scss';

li {
	list-style: none;
}
.ktfield-wrapper {
	margin-bottom: 15px;
}

h3 {
	border-bottom: 0;
}

.wrapper {
	display: flex;
	background-color: var(--ui-01);
	border: 1px solid var(--ui-03);
	border-radius: $border-radius;
	flex-direction: column;
	margin: 0;
	padding: 1.5em;

	:not(:last-child) {
		margin-bottom: 1.25em;
	}
}

.row {
	display: 'flex';
	align-items: 'center';
}

// .custom-wrapper {
// 	display: flex;
// 	flex-direction: row;
// 	background-color: var(--ui-01);
// 	border: 4px double var(--interactive-04);
// 	border-radius: $border-radius;
// 	padding: 1.25em;
// 	~ .custom-group {
// 		border: $border-width solid magenta;
// 		border-radius: $border-radius;

// 		&:active {
// 			box-shadow: 0 0 0 1px violet, 0 0 0 2px indigo, 0 0 0 3px blue,
// 				0 0 0 4px green, 0 0 0 5px yellow, 0 0 0 6px orange, 0 0 0 7px red;
// 		}

// 		&:focus-within {
// 			box-shadow: 0 0 0 1px violet, 0 0 0 2px indigo, 0 0 0 3px blue,
// 				0 0 0 4px green, 0 0 0 5px yellow, 0 0 0 6px orange, 0 0 0 7px red;
// 		}
// 	}
// }

// .custom-right-icon {
// 	border: 1px solid black;
// }
</style>
