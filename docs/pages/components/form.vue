<template lang="md">
# Form

<ClientOnly>
	<h2>KtFields Without Form</h2>
	<KtFieldDateRange
		v-model="dateRange"
		label="KtFieldDateRange"
		:maximumDate="null"
		minimumDate="2020-06-05"
		:shortcuts="dateRangeShortcuts"
	/>
	<!-- placeholder="Select Date" -->
	<div>
		<KtFieldText
			v-model="textValue"
			label="KtFieldText"
			placeholder="type something"
		/>
	</div>
	<h2>KtForm Settings</h2>
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
			:validator="(value) => ({
				text: null,
				type: value === 'NEVER' ? 'success' : value
			})"
		/>
		<KtFieldRadioGroup
			v-model="fieldSize"
			isOptional
			label="Field Size"
			:options="[
				{ label: 'Small', value: 'small' },
				{ label: 'Medium', value: 'medium' },
				{ label: 'Large', value: 'large' }
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
	<h2>KtForm</h2>
	<KtForm
		v-model="formData"
		:hideValidation="formSettings.hideValidation"
		:isLoading="formSettings.isLoading"
		v-bind="{ preventSubmissionOn, validators}"
		@submit="onSubmit"
	>
		<KtFieldDate
			formKey="date"
			label="KtFieldDate"
			:isDisabled="formSettings.disabledFormFields"
			:maximumDate="null"
			minimumDate="2020-06-05"
			placeholder="Select Date"
			:shortcuts="dateShortcuts"
			:size="fieldSize"
		/>
		<KtFieldMultiSelect
			:collapseTagsAfter="3"
			formKey="multiSelect"
			:isDisabled="formSettings.disableFormFields"
			isOptional
			label="Multi Select"
			leftIcon="shipping"
			:options="radioGroupAndSelectOptions"
			placeholder="select something"
			prefix="Prefix"
			rightIcon="calendar"
			:size="fieldSize"
			suffix="Suffix"
		/>
		<KtFieldSingleSelect
			formKey="radioGroupAndSingleSelect"
			:isDisabled="formSettings.disableFormFields"
			label="Single Select"
			leftIcon="shipping"
			:options="radioGroupAndSelectOptions"
			placeholder='select something'
			prefix="Prefix"
			rightIcon="calendar"
			:size="fieldSize"
			suffix="Suffix"
		/>
		<KtFieldRadioGroup
			formKey="radioGroupAndSingleSelect"
			:isDisabled="formSettings.disableFormFields"
			isOptional
			label="Some RadioGroup"
			:options="radioGroupAndSelectOptions"
			:size="fieldSize"
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
			:size="fieldSize"
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
			:size="fieldSize"
			suffix="Suffix"
		/>
		<KtFieldText
			formKey="lastName"
			helpText="help for lastName"
			:isDisabled="formSettings.disableFormFields"
			label="Last Name"
			placeholder="Dieter"
			:size="fieldSize"
		/>
		<br />
		<h2>Validation Example</h2>
		<KtFieldText
			formKey="lastName"
			:isDisabled="formSettings.disableFormFields"
			prefix="Prefix"
			:size="fieldSize"
			:tabIndex="5"
			validatorKey="alwaysNeutral"
		/>
		<KtFieldText
			formKey="lastName"
			:isDisabled="formSettings.disableFormFields"
			label="Field That Always Errors"
			:size="fieldSize"
			suffix="Suffix"
			:tabIndex="4"
			validatorKey="alwaysError"
		/>
		<KtFieldText
			formKey="lastName"
			:isDisabled="formSettings.disableFormFields"
			label="Field That Always Succeeds"
			leftIcon="cloud"
			:size="fieldSize"
			:tabIndex="3"
			validatorKey="alwaysSuccess"
		/>
		<KtFieldText
			formKey="lastName"
			hideClear
			:isDisabled="formSettings.disableFormFields"
			label="Field That Always Warns"
			rightIcon="location"
			:size="fieldSize"
			:tabIndex="2"
			validatorKey="alwaysWarning"
		/>
		<KtFieldText
			formKey="username"
			helpText="help for username"
			:isDisabled="formSettings.disableFormFields"
			isOptional
			label="Username"
			leftIcon="comment"
			prefix="Prefix"
			rightIcon="calendar"
			:size="fieldSize"
			suffix="Suffix"
			:tabIndex="1"
		/>
		<KtFieldTextArea
			formKey="description"
			:isDisabled="formSettings.disableFormFields"
			label="description"
			placeholder="type something"
			:size="fieldSize"
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
							:size="fieldSize"
							validatorKey="username"
						/>
						<div :style="{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }">
							<button class="kt-button danger" type="button" @click="deleteSelf">
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
				:isDisabled="formSettings.disableFormFields"
				label="I’m a Field In user"
				rightIcon="user"
				:size="fieldSize"
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
import dayjs from 'dayjs'

import { KottiField } from '../../../packages/next/kotti-field/types'
import { KottiForm } from '../../../packages/next/kotti-form/types'

const DATE_ISO_FORMAT = 'YYYY-MM-DD'

export default {
	name: 'KtFormDoc',
	data() {
		const alwaysError = () => ({
			type: 'error',
			text: 'Always Error!',
		})

		const alwaysSuccess = () => ({
			type: 'success',
			text: 'Always Success!',
		})

		const alwaysWarning = () => ({
			type: 'warning',
			text: 'Always Warning!',
		})

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
			// dateRange: [null, '2020-06-16'],
			dateRange: [],
			disableFormFields: false,
			formData: {
				checkboxGroup: {
					initiallyFalse: false,
					initiallyNull: null,
					initiallyTrue: true,
				},
				date: null,
				description: null,
				firstName: 'John',
				lastName: 'Smith',
				radioGroupAndSingleSelect: null,
				users: [{ username: null }, { username: 'anything' }],
				user: { lastName: 'pepe' },
				username: null,
				multiSelect: [1, 2],
			},
			fieldSize: 'medium',
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
			alwaysError,
			alwaysWarning,
			alwaysSuccess,
			testCheckbox: true,
			testLabel: 'hi',
		}
	},
	computed: {
		today() {
			return dayjs().format(DATE_ISO_FORMAT)
		},
		yesterday() {
			return dayjs()
				.subtract(1, 'day')
				.format(DATE_ISO_FORMAT)
		},
		jumpOneWeek() {
			return dayjs(
				((this as unknown) as { formData: { date: string | null } }).formData
					?.date ?? undefined,
			)
				.add(1, 'week')
				.format(DATE_ISO_FORMAT)
		},
		dateShortcuts() {
			return [
				{
					label: 'Today',
					value: ((this as unknown) as { today: string | undefined }).today,
				},
				{
					label: 'Yesterday',
					value: ((this as unknown) as { yesterday: string | undefined })
						.yesterday,
				},
				{
					label: 'Jump One Week',
					value: ((this as unknown) as { jumpOneWeek: string | undefined })
						.jumpOneWeek,
					keeOpen: true,
				},
			]
		},
		dateRangeShortcuts() {
			const { today, yesterday, jumpOneWeek, formData } = (this as unknown) as {
				today: string | undefined
				yesterday: string | undefined
				jumpOneWeek: string | undefined
				formData: { date: string | null }
			}

			return [
				{
					label: 'Today',
					value: [today, today],
				},
				{
					label: 'Yesterday',
					value: [yesterday, today],
				},
				{
					label: 'Jump One Week',
					value: [formData.date, jumpOneWeek],
					keepOpen: true,
				},
			]
		},
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
