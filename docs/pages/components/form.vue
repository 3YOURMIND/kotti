<template lang="md">
# Form

<ClientOnly>
	<KtFieldMultiSelect
		isOptional
		leftIcon="shipping"
		:options="radioGroupAndSelectOptions"
		placeholder="select something"
		prefix="Prefix"
		rightIcon="calendar"
		suffix="Suffix"
		v-model="selectedMultiSelects"
	/>
	<h1>KtFields Without Form</h1>
	<div>
		<h5>KtFieldText</h5>
		<KtFieldText
			v-model="textValue"
			label="Some Label"
			placeholder="type something"
		/>
	</div>
	<h1>KtForm Settings</h1>
	<div class="wrapper">
		<KtFieldRadioGroup
			v-model="preventSubmissionOn"
			isOptional
			label="Prevent Submission On"
			:options="[
				{ label: 'Error', value: 'error' },
				{ label: 'Warning', value: 'warning' },
				{ label: 'Never', value: 'NEVER' }
			]"
		/>
		<KtFieldCheckboxGroup
			v-model="formSettings"
			isOptional
			:options="[
				{ key: 'hideValidation', label: 'Hide validation' },
				{ key: 'isLoading', label: 'Is Loading' },
				{ key: 'disableFormFields', label: 'Disable Form Fields' },
			]"
		/>
	</div>
	<h1>KtForm</h1>
	<KtForm
		v-model="formData"
		:hideValidation="formSettings.hideValidation"
		:isLoading="formSettings.isLoading"
		v-bind="{ preventSubmissionOn, validators}"
		@submit="onSubmit"
	>
		<KtFieldSingleSelect
			formKey="radioGroupAndSingleSelect"
			:isDisabled="formSettings.disableFormFields"
			leftIcon="shipping"
			:options="radioGroupAndSelectOptions"
			placeholder='select something'
			prefix="Prefix"
			rightIcon="calendar"
			suffix="Suffix"
		/>
		<KtFieldRadioGroup
			formKey="radioGroupAndSingleSelect"
			:isDisabled="formSettings.disableFormFields"
			isOptional
			label="Some RadioGroup"
			:options="radioGroupAndSelectOptions"
		/>
		<KtFieldCheckboxGroup
			formKey="checkboxGroup"
			:isDisabled="formSettings.disableFormFields"
			label="Some CheckboxGroup"
			:options="[
				{ key: 'initiallyFalse', label: 'A (initiallyFalse)' },
				{ key: 'initiallyNull', label: 'B (initiallyNull)' },
				{ key: 'initiallyTrue', label: 'C (initiallyTrue)' },
			]"
		/>
		<KtFieldText
			formKey="firstName"
			helpText="Help for firstName"
			:isDisabled="formSettings.disableFormFields"
			label="First Name"
			leftIcon="comment"
			placeholder="Klaus"
			prefix="Prefix"
			rightIcon="location"
			suffix="Suffix"
		/>
		<KtFieldText
			formKey="lastName"
			helpText="help for lastName"
			label="Last Name"
			placeholder="Dieter"
		/>
		<br />
		<h2>Validation Example</h2>
		<KtFieldText
			formKey="lastName"
			prefix="Prefix"
			:tabIndex="5"
			validatorKey="alwaysNeutral"
		/>
		<KtFieldText
			formKey="lastName"
			label="Field That Always Errors"
			suffix="Suffix"
			:tabIndex="4"
			validatorKey="alwaysError"
		/>
		<KtFieldText
			formKey="lastName"
			label="Field That Always Succeeds"
			leftIcon="cloud"
			:tabIndex="3"
			validatorKey="alwaysSuccess"
		/>
		<KtFieldText
			formKey="lastName"
			hideClear
			label="Field That Always Warns"
			rightIcon="location"
			:tabIndex="2"
			validatorKey="alwaysWarning"
		/>
		<KtFieldText
			formKey="username"
			helpText="help for username"
			isOptional
			label="Username"
			leftIcon="comment"
			prefix="Prefix"
			rightIcon="calendar"
			suffix="Suffix"
			:tabIndex="1"
		/>
		<br />
		<h2>KtFormControllerList</h2>
		<ul>
			<KtFormControllerList formKey="users">
				<template v-slot:default="{ addAfter, addBefore, deleteSelf, index, setValues, values }">
					<li>
						<h3 v-text="`Item ${index}`" />
						<KtFieldText
							formKey="username" label="Username"
							:isDisabled="formSettings.disableFormFields"
							leftIcon="user"
							validatorKey="username"
						/>
						<div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
							<button class="kt-button danger" type="button"  @click="deleteSelf">
								Delete "{{ values.username }}"
							</button>
							<button class="kt-button secondary" type="button" @click="addBefore({ username: `before Item${index}` })">
								Add Before
							</button>
							<button class="kt-button secondary" type="button" @click="addAfter({ username: `after Item${index}` })">
								Add After
							</button>
							<button class="kt-button seondary" type="button" @click="setValues({ ...values, username: `replaced Item${index}` })">
								Set Values
							</button>
						</div>
					</li>
				</template>
			</KtFormControllerList>
			<br/>
			Custom Button: <button class="kt-button primary" type="button" @click="addUser">Add User</button>
		</ul>
		<br />
		<h2>KtFormControllerObject</h2>
		<KtFormControllerObject formKey="user">
			<KtFieldText
				formKey="lastName"
				label="I’m a Field In user"
				rightIcon="user"
				validatorKey="username"
			/>
		</KtFormControllerObject>
		<KtFormSubmit />
	</KtForm>
	<br />
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
						text: 'Your Username is too short',
						type: 'error',
					}

				// eslint-disable-next-line no-magic-numbers
				if (value.length < 5)
					return { text: 'Your username is already taken', type: 'warning' }

				return { text: null, type: 'success' }
			},
		}

		return {
			selectedMultiSelects: [1, 2, 3, 4, 5, 6],
			disableFormFields: false,
			formData: {
				checkboxGroup: {
					initiallyFalse: false,
					initiallyNull: null,
					initiallyTrue: true,
				},
				firstName: 'John',
				lastName: 'Smith',
				radioGroupAndSingleSelect: null,
				users: [{ username: null }, { username: 'anything' }],
				user: { lastName: 'pepe' },
				username: null,
			},
			formSettings: {
				hideValidation: false,
				isLoading: false,
				disableFormFields: false,
			},
			preventSubmissionOn: 'NEVER',
			textValue: null,
			radioGroupAndSelectOptions: [
				{ label: 'label 1', value: 1 },
				{ label: 'label 2', value: 2 },
				{ label: 'label 3', value: 3 },
				{ label: 'label 4', value: 4, disabled: true },
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
