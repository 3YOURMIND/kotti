<template lang="md">
# Form

<ClientOnly>
	<h1>KtFields Without Form</h1>
	<div>
		<h5>KtFieldCheckbox</h5>
		<KtFieldCheckbox v-model="disableSingleSelect">Disable Single Select</KtFieldCheckbox>
		<h5>KtFieldSelects</h5>
		<KtFieldSingleSelect
			prefix="Prefix"
			suffix="Suffix"
			:options="singleSelectOptions"
			placeholder='select something'
			leftIcon="shipping"
			:isDisabled="disableSingleSelect"
			v-model="selectedOption"
		/>
		<h5>KtFieldText</h5>
		<KtFieldText
			label="Some Label"
			v-model="textValue"
			:validator="(val)=> val === null? {type: 'error', text: 'required field can not be left empty'}:{type: null}"
		/>
	</div>
	<h1>KtForm Settings</h1>
	<div class="wrapper">
		<KtFieldCheckbox v-model="hideValidation">Hide Validation</KtFieldCheckbox>
		<KtFieldCheckbox v-model="isLoading">IsLoading</KtFieldCheckbox>
		<KtFieldRadioGroup
			v-model="preventSubmissionOn"
			label="Prevent Submission On"
			:options="[
				{ label: 'Error', value: 'error' },
				{ label: 'Warning', value: 'warning' },
				{ label: 'Never', value: 'NEVER' }
			]"
		/>
	</div>
	<h1>KtForm</h1>
	<KtForm v-model="formData" v-bind="{ hideValidation, isLoading, preventSubmissionOn, validators}" @submit="onSubmit">
		<KtFieldRadioGroup
			formKey="radioGroup"
			label="Some RadioGroup"
			:options="[
				{ label: 'a', value: 'a' },
				{ label: 'b', value: 'b' }
			]"
		/>
		<KtFieldCheckboxGroup
			formKey="checkboxGroup"
			label="Some CheckboxGroup"
			:options="[
				{ key: 'initiallyFalse', label: 'A (initiallyFalse)' },
				{ key: 'initiallyNull', label: 'B (initiallyNull)' },
				{ key: 'initiallyTrue', label: 'C (initiallyTrue)' },
			]"
		/>
		<KtFieldText :isDisabled="formData['disableTextField']" formKey="firstName" placeholder="Klaus" prefix="Prefix" suffix="Suffix" leftIcon="comment" rightIcon="location" :helpText="`Help for firstName`" label="First Name"/>
		<KtFieldCheckbox formKey="disableTextField">Disable FirstName</KtFieldCheckbox>
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

				return { type: 'success' }
			},
		}

		return {
			disableSingleSelect: false,
			formData: {
				disableTextField: false,
				checkboxGroup: {
					initiallyFalse: false,
					initiallyNull: null,
					initiallyTrue: true,
				},
				firstName: 'John',
				lastName: 'Smith',
				radioGroup: null,
				users: [{ username: null }, { username: 'anything' }],
				user: { lastName: 'pepe' },
				username: null,
			},
			hideValidation: false,
			isLoading: false,
			preventSubmissionOn: 'NEVER',
			textValue: null,
			selectedOption: 1,
			singleSelectOptions: [
				{ label: 'label 1', value: 1 },
				{ label: 'label 2', value: 2 },
				{ label: 'label 3', value: 3 },
				{ label: 'label 4', value: 4 },
				{ label: 'label 5', value: 5 },
				{ label: 'label 6', value: 6 },
			],
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
	flex-direction: column;
	padding: 1.5em;
	margin: 0;
	background-color: var(--ui-01);
	border: 1px solid var(--ui-03);
	border-radius: $border-radius;
}
</style>
